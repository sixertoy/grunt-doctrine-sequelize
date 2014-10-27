/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, browser: true, regexp: true */
/*global require, describe, beforeEach, afterEach, it, xit, expect, jasmine, grunt */
(function () {

    'use strict';

    var grunt = require('grunt'),
        Builder = require('./../lib/entity-builder');

    describe('entity-builder', function () {

        var builder, res, mock, expected;

        beforeEach(function () {
            builder = new Builder(grunt);
        });

        // <field name="name" type="string" column="name" length="255" nullable="false"/>
        describe('_type()', function () {
            xit('Should throw', function () {
                expect(function () {
                    builder._type();
                }).toThrow();
                expect(function () {
                    builder._type('unknow_type');
                }).toThrow();
            });
            // TEXT
            it('Should return DataTypes.TEXT', function () {
                expect(builder._type('text')).toEqual('DataTypes.TEXT');
                expect(builder._type('array')).toEqual('DataTypes.TEXT');
                expect(builder._type('object')).toEqual('DataTypes.TEXT');
                expect(builder._type('json_array')).toEqual('DataTypes.TEXT');
            });
            // DATE
            it('Should return DataTypes.DATE', function () {
                expect(builder._type('date')).toEqual('DataTypes.DATE');
                expect(builder._type('time')).toEqual('DataTypes.DATE');
                expect(builder._type('datetime')).toEqual('DataTypes.DATE');
                expect(builder._type('datetimetz')).toEqual('DataTypes.DATE');
            });
            // STRING
            it('Should return DataTypes.STRING', function () {
                expect(builder._type('guid')).toEqual('DataTypes.STRING');
                expect(builder._type('string')).toEqual('DataTypes.STRING');
            });
            // INTEGER
            it('Should return DataTypes.INTEGER', function () {
                expect(builder._type('integer')).toEqual('DataTypes.INTEGER');
            });
            // BIGINT
            it('Should return DataTypes.BIGINT', function () {
                expect(builder._type('bigint')).toEqual('DataTypes.BIGINT');
            });
            // BOOLEAN
            it('Should return DataTypes.BOOLEAN', function () {
                expect(builder._type('boolean')).toEqual('DataTypes.BOOLEAN');
            });
            // OTHERS
            it('Should return DataTypes.FLOAT', function () {
                expect(builder._type('float')).toEqual('DataTypes.FLOAT');
            });

            it('Should return DataTypes.STRING.BINARY', function () {
                expect(builder._type('binary')).toEqual('DataTypes.STRING.BINARY');
            });
            it('Should return DataTypes.DECIMAL', function () {
                expect(builder._type('decimal')).toEqual('DataTypes.DECIMAL');
            });
            it('Should return DataTypes.BLOB', function () {
                expect(builder._type('blob')).toEqual('DataTypes.BLOB');
            });
            it('Should return DataTypes.INTEGER (smallint)', function () {
                expect(builder._type('smallint')).toEqual('DataTypes.INTEGER');
            });

        });

        describe('_columns()', function () {
            it('Should return a string nonull 45', function () {
                expected = require('./expected/type-string-nonull-45')();
                mock = require('./fixtures/type-string')(false, 45);
                res = builder._columns(mock, false, false, false);
                expect(res).toEqual(expected);
            });
            it('Should return a string nonull', function () {
                expected = require('./expected/type-string-nonull')();
                mock = require('./fixtures/type-string')(false);
                res = builder._columns(mock, false, false, false);
                expect(res).toEqual(expected);
            });
            it('Should return a string null', function () {
                expected = require('./expected/type-string-null')();
                mock = require('./fixtures/type-string')(true);
                res = builder._columns(mock, false, false, false);
                expect(res).toEqual(expected);
            });
            it('Should return a string nonull 255', function () {
                expected = require('./expected/type-string-nonull')();
                mock = require('./fixtures/type-string')();
                res = builder._columns(mock, false, false, false);
                expect(res).toEqual(expected);
            });
            it('Should return a string nonull 255 unique', function () {
                expected = require('./expected/type-string-nonull-unique')();
                mock = require('./fixtures/type-string')();
                res = builder._columns(mock, false, false, true);
                expect(res).toEqual(expected);
            });
            it('Should return a string nonull 255 autoIncremnt unique', function () {
                expected = require('./expected/type-string-nonull-auto-unique')();
                mock = require('./fixtures/type-string')();
                res = builder._columns(mock, false, true, true);
                expect(res).toEqual(expected);
            });
            it('Should return a string nonull 255 primary autoIncremnt unique', function () {
                expected = require('./expected/type-string-nonull-primary-auto-unique')();
                mock = require('./fixtures/type-string')();
                res = builder._columns(mock, true, true, true);
                expect(res).toEqual(expected);
            });
            it('Should return a string nonull 255 primary autoIncremnt unique', function () {
                expected = require('./expected/type-string')();
                mock = require('./fixtures/type-string')();
                res = builder._columns(mock);
                expect(res).toEqual(expected);
            });
            it('Should return a bigint', function () {
                expected = require('./expected/type-bigint')();
                mock = require('./fixtures/type-bigint')();
                res = builder._columns(mock);
                expect(res).toEqual(expected);
            });
            it('Should return a bigint', function () {
                expected = require('./expected/type-bigint-11')();
                mock = require('./fixtures/type-bigint')(false, 11);
                res = builder._columns(mock);
                expect(res).toEqual(expected);
            });
            it('Should return a bigint unsigned', function () {
                expected = require('./expected/type-bigint-unsigned')();
                mock = require('./fixtures/type-bigint')(false, false, true, false);
                res = builder._columns(mock);
                expect(res).toEqual(expected);
            });
            it('Should return a bigint unsigned zerofill', function () {
                expected = require('./expected/type-bigint-unsigned-zerofill')();
                mock = require('./fixtures/type-bigint')(false, false, true, true);
                res = builder._columns(mock);
                expect(res).toEqual(expected);
            });
            it('Should return a bigint zerofill', function () {
                expected = require('./expected/type-bigint-zerofill')();
                mock = require('./fixtures/type-bigint')(false, false, false, true);
                res = builder._columns(mock);
                expect(res).toEqual(expected);
            });
            it('Should return a bigint zerofill 11', function () {
                expected = require('./expected/type-bigint-zerofill-11')();
                mock = require('./fixtures/type-bigint')(false, 11, false, true);
                res = builder._columns(mock);
                expect(res).toEqual(expected);
            });
            it('Should return a bigint unsigned zerofill 11', function () {
                expected = require('./expected/type-bigint-unsigned-zerofill-11')();
                mock = require('./fixtures/type-bigint')(false, 11, true, true);
                res = builder._columns(mock);
                expect(res).toEqual(expected);
            });
        });

        describe('_entities()', function () {
            it('Should return a expected/event', function () {
                expected = require('./expected/event')();
                mock = require('./fixtures/event')();
                res = builder._entities(mock);
                expect(res).toEqual(expected);
            });
        });

        describe('_root()', function () {
            it('Should return a expected/root', function () {
                expected = require('./expected/root')();
                mock = require('./fixtures/root')();
                res = builder._root(mock.entity);
                expect(res).toEqual(expected);
            });
        });

        describe('_parse()', function () {
            it('Should return a expected/root', function () {
                expected = require('./expected/parse')();
                mock = require('./fixtures/root')();
                res = builder.parse(mock);
                // expect(res).toEqual(expected);
            });
        });

    });

}());
