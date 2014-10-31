/*
 * grunt-sequelize-doctrine
 * https://github.com/Matthieu/grunt-sequelize-doctrine
 *
 * Copyright (c) 2014 malas34
 * Licensed under the MIT license.
 */
/*global module, require*/
module.exports = function (grunt) {

    'use strict';

    // Project configuration.
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'tasks/*.js'
            ]
        },
        // Configuration to be run (and then tested).
        prompt: {
            build_models: {
                options: {
                    config: 'build_models.helpers',
                    type: 'confirm',
                    message: 'Would you like to generate Helpers ?',
                    default: false
                }
            }
        },
        build_models: {
            options: {
                root: 'doctrine-mapping'
            },
            files: {
                dest: 'models/',
                src: ['models/doctrine/**/*']
            }
        },
        jasmine_node: {
            options: {
                forceExit: true,
                showColors: true,
                includeStackTrace: false,
                match: '.',
                matchall: false,
                extensions: 'js',
                specNameMatcher: 'spec',
                jUnit: {
                    report: true,
                    savePath: "./build/reports/jasmine/",
                    useDotNotation: true,
                    consolidate: true
                }
            },
            all: ['specs/']
        },
        watch: {
            tests: {
                files: './lib/**/*',
                tasks: ['jshint'],
                options: {
                    spawn: true
                }
            }
        }
    });

    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-prompt');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // By default, lint and run all tests.
    grunt.registerTask('jasmine', ['jshint', 'jasmine_node']);
    grunt.registerTask('default', ['watch']);

};
