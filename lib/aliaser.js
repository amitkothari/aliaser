var fs = require('fs'),
    path = require("path"),
    child_process = require('child_process'),
    logger = require('./logger'),
    _ = require("underscore");

var user_home = process.env['HOME'];
var config_file_path = path.join(user_home, '.oh-my-zsh/lib/aliaser.zsh');

exports.add = function (alias, command) {
    var aliases = {};
    if (aliaserAliasFileExists()) {
        aliases = getAliasesFromFile();
        if (_.has(aliases, alias)) {
            logger.error('Alias ' + alias + ' already exists.');
            process.exit();
        } else {
            aliases[alias] = command;
        }
    } else {
        logger.info("Aliaser file not found.\nInitalising aliaser...\n" + config_file_path + " created.");
        aliases[alias] = command;
    }
    updateAliaserFile(aliases);
    logger.info('Alias ' + alias + " added to run '" + command + "'");
    process.exit();
};

exports.remove = function (alias) {
    if (aliaserAliasFileExists()) {
        var aliases = getAliasesFromFile();
        if (_.has(aliases, alias)) {
            delete aliases[alias];
            updateAliaserFile(aliases);
            logger.info('Alias ' + alias + ' removed.');
        } else {
            logger.error('Alias ' + alias + ' not found.');
        }
    } else {
        logger.info("Aliaser file not found.\nAdd a new alias to initalise aliaser.");
    }
    process.exit();
};

exports.list = function () {
    if (aliaserAliasFileExists()) {
        var aliasList = getAliaserAliases();
        if (aliasList.length > 0) {
            for (var i = 0; i < aliasList.length; i++) {
                logger.info(aliasList[i]);
            }
        } else {
            logger.warn("No alias added using aliaser found.");
        }
    } else {
        logger.info("Aliaser file not found.\nAdd a new alias to initalise aliaser.");
    }
    process.exit();
};

function updateAliaserFile(aliases) {
    var content = '';
    var keys = _.keys(aliases);
    if (keys.length !== 0) {
        _.each(_.keys(aliases), function (alias) {
            content = content + "alias " + alias + "='" + aliases[alias] + "'\n";
        });
    }
    fs.writeFileSync(config_file_path, content);
}

function aliaserAliasFileExists() {
    return fs.existsSync(config_file_path);
}

function getAliasesFromFile() {
    var aliases = {};
    var aliasList = getAliaserAliases();
    for (var i = 0; i < aliasList.length; i++) {
        var aliasRegex = /^[ ]*alias[ ]*(.*?)[ ]*=[ ]*'(.*?)'/g;
        var match = aliasRegex.exec(aliasList[i]);
        if (match) {
            aliases[match[1]] = match[2];
        }
    }
    return aliases;
}

function getAliaserAliases() {
    return fs.readFileSync(config_file_path).toString().split("\n");
}
