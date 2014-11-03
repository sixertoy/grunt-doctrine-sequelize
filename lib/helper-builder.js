/*
 * grunt-deploy-dump
 *
 * Copyright (c) 2014 Matthieu Lassalvy
 * Licensed under the MIT license.
 *
 * https://raw.githubusercontent.com/sequelize/sequelize-auto/master/lib/index.js
 * https://github.com/sequelize/sequelize/wiki/API-Reference-DataTypes
 * https://github.com/sequelize/sequelize/wiki/API-Reference
 * http://sequelizejs.com/docs/1.7.8/installation
 *
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50*/
/*global require, module, console, grunt*/
(function () {

    'use strict';

    var _ = require('lodash');

    var __privateMethods = {

        _headers: function(name) {

            var lines = [];
            lines.push('/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50*/');
            lines.push('/*global require, module */');
            lines.push('(function () {');
            lines.push('\'use strict\';');
            lines.push('/* imports */');
            lines.push('var _ = require(\'lodash\');');
            lines.push('/* private methods */');
            lines.push('var __privateMethods = {};');
            lines.push('/* constructor */');
            lines.push('var ' + name + ' = function () {};');
            lines.push('_.extend(' + name + '.prototype, __privateMethods);');
            lines.push('/* constructor */');
            lines.push('/* export */');
            lines.push('module.exports = ' + name + ';');
            lines.push('}());');
            return lines.join(this._.util.linefeed);

        }


    };

    var HelperBuilder = function (grunt) {
        this._ = grunt;
    };
    // @TODO remove lodash
    _.extend(HelperBuilder.prototype, __privateMethods);

    /**
     *
     */
    HelperBuilder.prototype.create = function (name) {
        return this._headers(name);
    };

    module.exports = HelperBuilder;

}());