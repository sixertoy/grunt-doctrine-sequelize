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

        _constructors: function (name) {
            var lines = [];
            lines.push('/* constructor */');
            lines.push('var ' + name + ' = EntityHelper.extend({');
            lines.push('constructor: function (sequelizer, model) {');
            lines.push('this._super();');
            lines.push('this._model = model;');
            lines.push('this._sequelizer = sequelizer;');
            lines.push('}');
            lines.push('});');
            lines.push('_.extend(' + name + '.prototype, __privateMethods);');
            return lines;
        },

        _privates: function (funcs) {
            var lines = [];
            lines.push('/* private methods */');
            lines.push('var __privateMethods = {');
            if (funcs.length) {
                lines.push(funcs.join(','));
            } else {
                lines.push('// place your customs functions here');
            }
            lines.push('};');
            return lines;
        },

        _footers: function (name) {
            var lines = [];
            lines.push('/* export */');
            lines.push('module.exports = ' + name + ';');
            lines.push('}());');
            return lines;
        },

        _imports: function () {
            var lines = [];
            lines.push('/* imports */');
            lines.push('var Q = require(\'q\'),');
            lines.push('_ = require(\'lodash\'),');
            lines.push('EntityHelper = require(\'smile/lib/db/entity-helper\');');
            return lines;
        },

        _headers: function () {
            var lines = [];
            lines.push('/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50*/');
            lines.push('/*global require, module */');
            lines.push('(function () {');
            lines.push('\'use strict\';');
            return lines;
        }

    };

    var HelperBuilder = function (grunt, name) {
        this._ = grunt;
        this._name = name;
    };
    // @TODO remove lodash
    _.extend(HelperBuilder.prototype, __privateMethods);

    /**
     *
     *
     *
     */
    HelperBuilder.prototype.create = function (funcs) {
        var lines = [];
        lines = lines.concat(this._headers());
        lines = lines.concat(this._imports());
        lines = lines.concat(this._privates(funcs));
        lines = lines.concat(this._constructors(this._name));
        lines = lines.concat(this._footers(this._name));
        return lines.join(this._.util.linefeed);
    };

    module.exports = HelperBuilder;

}());
