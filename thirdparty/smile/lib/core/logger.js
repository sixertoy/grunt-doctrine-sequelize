/**
 *
 *
 *
 *
 * @see https://raw.githubusercontent.com/SBoudrias/class-extend/master/index.js
 *
 */
/*jslint sloppy: true, vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50*/
/*global output, module, require, process */
(function () {

    var Winston = require('winston');
    // Dummy
    var LoggerEnforcer = function () {};

    /**
     *
     *
     *
     */
    var __date__ = function () {
        var now = new Date();
        var date = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2);
        var time = ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2) + ':' + ('0' + now.getSeconds()).slice(-2);
        return date + ' ' + time;
    };

    /**
     *
     * Encapsulate Winston logger
     * @see https://github.com/flatiron/winston
     *
     */
    var Logger = function singleton(enforcer, options) {

        options = (options || {});
        options.files = (options.files || {});

        var isInstance = (enforcer instanceof LoggerEnforcer);
        if (!isInstance) {
            throw new Error('Logger can\'t be instanciated');
        }

        // maxFiles, maxsize
        var LogFile = Winston.transports.File,
            LogConsole = Winston.transports.Console;

        this.__logger = new(Winston.Logger)({
            transports: [
                new LogFile({
                    json: false,
                    timestamp: __date__,
                    handleExceptions: true,
                    filename: ('logs/' + (options.files.debug || 'debug.log'))
                }),
                new LogConsole({
                    json: false,
                    colorize: true,
                    handleExceptions: true,
                    level: (options.level || 'debug'),
                    timestamp: (options.timestamp || false)
                })
            ],
            exceptionHandlers: [
                new LogFile({
                    json: false,
                    colorize: false,
                    timestamp: __date__,
                    filename: ('logs/' + (options.files.exceptions || 'exceptions.log'))
                })

            ],
            exitOnError: true

        });

    };

    Logger.getInstance = function (options) {
        if (Logger.__instance === null) {
            var dummy = new LoggerEnforcer();
            Logger.__instance = new Logger(dummy, options);
        }
        return Logger.__instance;
    };

    Logger.__instance = null;

    /**
     *
     * options = {}
     * options.level = 'debug'
     * options.timestamp = false
     * options.files.debug ='debug.log'
     * options.files.exceptions ='exceptions.log'
     *
     */
    module.exports = function (options) {
        var instance = Logger.getInstance(options);
        return instance.__logger;
    };

}());
