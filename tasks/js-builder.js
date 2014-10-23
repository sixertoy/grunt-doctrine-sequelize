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
/*global require, module, console*/
module.exports = function (grunt) {

    'use strict';

    var Q = require('q'),
        FS = require('fs'),
        _ = require('lodash'),
        Path = require('path'),
        jshint = require('jshint').JSHINT,
        parseString = require('xml2js').parseString;

    /**
     *
     *
     *
     */
    function _types(obj) {
    }

    /**
     *
     *
     *
     */
    function _fields(obj) {
        var i, lines = [];
        lines.push(obj.name + ': {');
        lines.push('}');
        return lines;
    }

    /**
     *
     *
     *
     */
    function _entities(obj) {
        var i, lines = [];
        if (obj.hasOwnProperty('name')) {
            lines.push('return sequelize.define(\'' + obj.name + '\', {');
            if (obj.hasOwnProperty('field')) {
                for (i = 0; i < obj.field; i++) {
                    var sublines = _fields(obj.field[i]);
                    lines = lines.concat(sublines);
                }
                lines.push('},{classMethods:{}});');
                return lines;
            } else {
                grunt.fail.warn(new Error('Uncorrect file format'));

            }

        } else {
            grunt.fail.warn(new Error('Uncorrect file format'));

        }
    }

    /**
     *
     *
     *
     */
    function _parse(obj) {
        if (obj.hasOwnProperty('doctrine-mapping')) {
            var e, i, lines = [],
                root = obj['doctrine-mapping'];
            lines.push('/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50*/');
            lines.push('/*global require, module, console*/');
            lines.push('module.exports = function(sequelize, DataTypes) {');
            lines.push('\'use strict\';');
            if (root.hasOwnProperty('entity')) {
                e = root.entity;
                for (i = 0; i < e.length; i++) {
                    var sublines = _entities(e[i]);
                    lines = lines.concat(sublines);
                }
            } else {
                grunt.fail.warn(new Error('Uncorrect file format'));
            }
            lines.push('};');
            return lines.join('\n');

        } else {
            grunt.fail.warn(new Error('Uncorrect file format'));

        }
    }

    /**
     *
     * Build models from Doctrine XML schemas
     *
     */
    grunt.registerMultiTask('build_models', 'Build models from Doctrine XML schemas', function () {

        var requires = this.requiresConfig('build_models', 'build_models.files', 'build_models.options.dest', 'build_models.options.extension');
        // Verification de la configuration
        // de la tache Grunt
        if (requires) {

            console.log();

            var str, file, xml, builder,
                index = 0,
                entries = [],
                done = this.async(),
                options = this.options();

            this.files.forEach(function (f) {

                grunt.log.subhead('Start parsing doctrine files');
                var sources = f.src.filter(function (filepath) {
                    if (grunt.file.exists(filepath)) {
                        if (filepath.indexOf(options.extension) !== -1) {
                            entries.push(filepath);
                            return filepath;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                }).map(function (filepath) {
                    if (filepath) {

                        grunt.log.ok('Loading ' + filepath);
                        xml = grunt.file.read(filepath);
                        parseString(xml, {mergeAttrs: true}, function (err, result) {
                            if (err === null) {
                                grunt.log.debug('Parsing ' + filepath);
                                Q.fcall(function () {
                                    return _parse(result);

                                }).then(function (content) {
                                    if (content) {
                                    //if (content && jshint(content)) {
                                        file = Path.join(Path.normalize(options.dest), Path.basename(filepath, options.extension)) + '.js';
                                        grunt.log.ok('Creating ' + file);
                                        return grunt.file.write(file, content);

                                    } else {
                                        grunt.fail.warn(new Error('Uncorrect file format ' + filepath));
                                    }

                                }).fin(function () {
                                    index++;
                                    if (index >= entries.length) {
                                        done();
                                    }
                                });

                            } else {
                                grunt.fail.warn('Unable to parse file ' + filepath);
                            }
                        });
                    }
                });
            });
        }
    });
};
