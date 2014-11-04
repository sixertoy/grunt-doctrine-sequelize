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
                    if ((grunt.option('helpers') || grunt.option('helpers-reset')) && !grunt.file.exists(options.helpers)) {
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
                            grunt.log.debug('Loading ' + filepath);
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
                                            var data = format(content, {
                                                indent_size: 4
                                            }); // Format
                                            grunt.log.debug('Creating ' + fname); // Write
                                            var w = grunt.file.write(fname, data);
                                            return (w) ? Path.basename(filepath, Path.extname(filepath)) : false;

                                        } else {
                                            grunt.fail.warn(new Error('Uncorrect file format ' + filepath));

                                        }
                                    }).then(function (name) {
                                        // Creation des helpers
                                        if (grunt.option('helpers') || grunt.option('helpers-reset')) {
                                            var n = name,
                                                funcs = [];
                                            if (n.indexOf('.' + options.extension) !== -1) {
                                                n = n.split('.' + options.extension)[0];
                                            }
                                            n = StringUtils.capitalize(n) + 'Helper';
                                            var hcontent = '',
                                                hbuilder = new HelperBuilder(grunt, n),
                                                hname = Path.join(Path.normalize(options.helpers), n);
                                            if (grunt.option('helpers-reset')) {
                                                if (grunt.file.exists(hname + '.js')) {
                                                    grunt.log.debug('Deleting helper ' + hname + '.js');
                                                    grunt.file.delete(hname + '.js');
                                                }
                                            } else {
                                                grunt.log.debug('Copy ' + hname);
                                                grunt.file.copy('./' + hname + '.js', hname + '.tmp.js');
                                                var m = require('../' + hname + '.tmp');
                                                (Object.keys(m.prototype)).map(function (funcName) {
                                                    if (funcName !== '__super__') {
                                                        var method = m.prototype[funcName].toString();
                                                        method = StringUtils.trimEndLines(method);
                                                        funcs.push(funcName + ': ' + method);
                                                    }
                                                });
                                                grunt.log.debug('delete ' + hname + '.tmp.js');
                                                grunt.file.delete(hname + '.tmp.js');
                                            }
                                            grunt.log.debug('Creating helper ' + hname);
                                            hcontent = hbuilder.create(funcs);
                                            return grunt.file.write(hname + '.js', format(hcontent, {
                                                indent_size: 4
                                            }));
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
