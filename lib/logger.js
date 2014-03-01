var colors = require('colors');

colors.setTheme({
    info: 'green',
    warn: 'yellow',
    error: 'red'
});

exports.info = function (msg) {
    console.log(msg.info);
};

exports.error = function (msg) {
    console.log(msg.error)
};

exports.warn = function (msg) {
    console.log(msg.warn)
};
