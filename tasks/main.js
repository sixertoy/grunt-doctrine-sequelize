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
        Path = require('path'),
        jshint = require('jshint').JSHINT,
        parseString = require('xml2js').parseString,
        format = require('js-beautify').js_beautify;

    var HelperBuilder = require('./../lib/helper-builder'),
        EntityBuilder = require('./../lib/entity-builder'),
        StringUtils = require('./../thirdparty/smile/lib/utils/string-utils');

    /**
     *
     * Build models from Doctrine XML schemas
     *
     */
    grunt.registerMultiTask('build_models', 'Build models from Doctrine XML schemas', function () {

        var requires = this.requiresConfig('build_models', 'build_models.files', 'build_models.files.dest', 'build_models.files.src');
        // Verification de la configuration
        // de la tache Grunt
        if (requires) {

            var str, xml, builder,
                index = 0,
                entries = [],
                done = this.async(),
                options = this.options({
                    rootName: false,
                    extension: 'dcm',
                    helpers: 'helpers/'
                });
            this.files.forEach(function (f) {
                if (f.src.length) {
                    // creation du dossier des helpers
                    if (grunt.option('helpers') && !grunt.file.exists(options.helpers)) {
                        grunt.file.mkdir(options.helpers);
                    }
                    // creation du dossier des modeles
                    if (!grunt.file.exists(f.dest)) {
                        grunt.file.mkdir(f.dest);
                    }
                    grunt.log.subhead('Start parsing doctrine files');
                    var sources = f.src.filter(function (filepath) {
                        if (grunt.file.isFile(filepath)) {
                            return filepath;
                        } else {
                            return false;
                        }
                    }).map(function (filepath) {
                        if (filepath) {
                            grunt.log.ok('Loading ' + filepath);
                            xml = grunt.file.read(filepath);
                            parseString(xml, {
                                mergeAttrs: true,
                                explicitRoot: (grunt.util.kindOf(options.root) !== 'string')
                            }, function (err, result) {
                                if (err === null) {
                                    grunt.log.debug('Parsing ' + filepath);
// Pyramid of Doom
                                    Q.fcall(function () {
                                        try {
                                            var builder = new EntityBuilder(grunt);
                                            return builder.parse((options.root ? result : result[options.root]));

                                        } catch (e) {
                                            grunt.log.debug('Failed on ' + filepath);
                                            grunt.log.debug(e.stack);
                                            grunt.fail.warn(e);
                                        }
                                    }).then(function (content) {
                                        if (content) {

                                            //if (content && jshint(content)) {
                                            var bs = Path.basename(filepath, Path.extname(filepath));
                                            if (bs.indexOf('.' + options.extension) !== -1) {
                                                bs = Path.basename(bs, Path.extname(bs));
                                            }
                                            var fname = Path.join(Path.normalize(f.dest), bs) + '.js';
                                            var data = format(content, { indent_size: 4 }); // Format
                                            grunt.log.ok('Creating ' + fname); // Write
                                            var w = grunt.file.write(fname, data);
                                            return (w) ? Path.basename(filepath, Path.extname(filepath)) : false;

                                        } else {
                                            grunt.fail.warn(new Error('Uncorrect file format ' + filepath));
                                        }
                                    }).then(function (name) {
                                        // Creation des helpers
                                        if (grunt.option('helpers')) {
                                            var n = name;
                                            if (n.indexOf('.' + options.extension) !== -1) {
                                                n = n.split('.' + options.extension)[0];
                                            }
                                            n = StringUtils.capitalize(n) + 'Helper';
                                            var hbuilder = new HelperBuilder(grunt);
                                            var hcontent = hbuilder.create(n);
                                            var hdata = format(hcontent, { indent_size: 4 });
                                            var hname = Path.join(Path.normalize(options.helpers), n) + '.js';
                                            return grunt.file.write(hname, hdata);
                                        } else {
                                            return true;
                                        }
                                    }).fin(function () {
                                        index++;
                                        if (index >= entries.length) {
                                            done();
                                        }
                                    });
// endof Pyramid of Doom
                                } else {
                                    grunt.fail.warn('Unable to parse file ' + filepath);
                                }
                            });
                        }
                    });
                } else {
                    grunt.log.ok('No files to export');
                    done();
                }
            });
        }
    });
};
