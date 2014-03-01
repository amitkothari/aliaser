#!/usr/bin/env node
var aliaser = require('../lib/aliaser'),
    program = require('commander'),
    package = require('../package.json');

program.version(package.version)
    .description(package.description);

program.command("add <alias> <command>")
    .description('Add a new alias')
    .action(function (alias, command) {
        aliaser.add(alias, command);
    });

program.command("remove <alias>")
    .description('Remove an existing alias')
    .action(function (alias) {
        aliaser.remove(alias);
    });

program.command("list")
    .description('List all aliases added using alias')
    .action(function () {
        aliaser.list();
    });

program.parse(process.argv);

if (program.args.length === 0 || typeof program.args[program.args.length - 1] === 'string') {
    program.help();
}
