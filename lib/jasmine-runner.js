/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50*/
/*global module, require, console*/
(function () {

    'use strict';

    var Util = require('util'),
        Jasmine = require('jasmine-node');

    var regExp = new RegExp('(\\.spec\\.js)$', 'i');

    function JasmineRunner() {
        this._runnerOptions = {
            specFolders: null,
            regExpSpec: regExp,
            growl: false,
            coffee: false,
            isVerbose: false,
            showColors: true,
            useRequireJs: false,
            includeStackTrace: true,
            junitreport: {
                report: false,
                consolidate: true,
                useDotNotation: true,
                savePath: './.build/'
            },
            onComplete: function (runner) {
                var exitCode;
                Util.print('\n');
                if (runner.results().failedCount === 0) {
                    exitCode = 0;
                } else {
                    exitCode = 1;
                }
                Jasmine.getGlobal().jasmine.currentEnv_ = undefined;
            }
        };
    }

    JasmineRunner.prototype.run = function (folders) {
        this._runnerOptions.specFolders = folders;
        try {
            Jasmine.executeSpecsInFolder(this._runnerOptions);
        } catch (e) {
            console.error(e);
            console.error(e.stack);
        }
    };

    module.exports = JasmineRunner;

}());
