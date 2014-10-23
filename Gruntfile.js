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
        build_models: {
            options: {
                dest: 'models/',
                extension: '.orm.xml'
            },
            files: ['models/**/*', 'models/**/*.xml', 'models/**/*.orm.xml']
        },
        jasmine : {
            options : {
                specs : 'specs/**/*.spec.js'
            },
            src: ['tasks/**/*.js', 'src/**/*.js']
        }
    });

    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // By default, lint and run all tests.
    grunt.registerTask('tests', ['jshint', 'jasmine']);
    grunt.registerTask('default', ['tests']);

};
