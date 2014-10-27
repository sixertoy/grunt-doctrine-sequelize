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

    var _ = require('lodash'),
        Util= require('util');

    var __privateMethods = {

        __mergeProperties: function (dest, src) {
            var p;
            for (p in src) {
                if (src.hasOwnProperty(p)) {
                    dest[p] = src[p][0];
                }
            }
            return dest;
        },

        /**
         *
         * http://sequelizejs.com/docs/1.7.8/models#data-types
         * http://doctrine-dbal.readthedocs.org/en/latest/reference/types.html#mapping-matrix
         *
         * Sequelize | Doctrine | /MySQL
         *
         * Sequelize.STRING | string/guid | varchar(255)
         * Sequelize.STRING(1234) | string | varchar(1234)
         *
         * Sequelize.STRING.BINARY | binary | varchar binary
         *
         * Sequelize.TEXT | text/object/json_array/array | text
         *
         * Sequelize.INTEGER | integer/smallint | integer
         * Sequelize.BIGINT | bigint | bigint
         * Sequelize.BIGINT(11) | bigint | bigint(11)
         * Sequelize.FLOAT | float | float
         * Sequelize.FLOAT(11) | float | float(11)
         * Sequelize.FLOAT(10, 12) | float | float(10, 12)
         *
         * Sequelize.DECIMAL | decimal | decimal
         * Sequelize.DECIMAL(11, 2) | decimal | decimal(11, 2)
         *
         * Sequelize.DATE | datetime/datetimetz/date/time | datetime
         *
         * Sequelize.BOOLEAN | boolean | tinyint(1)
         *
         * Sequelize.ENUM('value 1', 'value 2') | enum('value 1', 'value 2')
         *
         * Sequelize.BLOB | blob | blob
         * Sequelize.BLOB('tiny') | blob | tinyblob
         *
         * Sequelize.UUID | char(36) binary
         *
         */
        _type: function (str, length, unsigned, zerofill) {
            var type = false;
            if (this._.util.kindOf(str) === 'string') {
                switch (str) {
                case 'text':
                case 'array':
                case 'object':
                case 'json_array':
                    type = 'DataTypes.TEXT';
                    break;

                case 'date':
                case 'time':
                case 'datetime':
                case 'datetimetz':
                    type = 'DataTypes.DATE';
                    break;

                case 'guid':
                case 'string':
                    type = 'DataTypes.STRING';
                    break;

                case 'integer':
                case 'smallint':
                    type = 'DataTypes.INTEGER';
                    break;

                case 'bigint':
                    type = 'DataTypes.BIGINT';
                    break;

                case 'boolean':
                    type = 'DataTypes.BOOLEAN';
                    break;

                case 'float':
                    type = 'DataTypes.FLOAT';
                    break;

                case 'binary':
                    type = 'DataTypes.STRING.BINARY';
                    break;

                case 'decimal':
                    type = 'DataTypes.DECIMAL';
                    break;

                case 'blob':
                    type = 'DataTypes.BLOB';
                    break;
                }

                if (length && (type === 'DataTypes.BIGINT' || type === 'DataTypes.FLOAT' || type === 'DataTypes.STRING')) {
                    type += '(' + length + ')';
                }

                if (str === 'integer' || str === 'bigint' || str === 'float') {
                    if (unsigned) {
                        type += '.UNSIGNED';
                    }
                    if (zerofill) {
                        type += '.ZEROFILL';
                    }
                }
            }

            if (type) {
                return type;

            } else {

                if (str.indexOf('enum') !== -1) {
                    return '';

                } else {
                    console.log('Unknow type ' + str);
                    throw new Error('Unknow Datatype');
                }

            }

        },

        /**
         *
         *
         *
         */
        _columns: function (obj, primaryKey, autoIncrement, unique) {
            var t, p, i, o = {}, lines = [];
            o = this.__mergeProperties(o, obj);
            lines.push(o.column + ': {');
            t = this._type(o.type, o.length, o.unsigned, o.zerofill);
            lines.push('type: ' + t + ', ');
            lines.push('unique: ' + (unique || false) + ', ');
            lines.push('primaryKey: ' + (primaryKey || false) + ', ');
            lines.push('autoIncrement: ' + (autoIncrement || false) + ', ');
            lines.push('allowNull: ' + (o.nullable || false));
            lines.push('}');
            return lines.join('');
            // lines.push('defaultValue: ' + (obj.nullable || false));
            // lines.push('comment: ' + (obj.nullable || false));
        },


        _primary: function(obj) {
            var o = this.__mergeProperties({}, obj);
            this._.log.debug(Util.inspect(obj.generator[0].strategy));
            // this._.log.debug(Util.inspect(obj));
            return '';
        },

        /**
         * defaults: {timestamps: false, freezeTableName; true, tableName: 'my-table-name', unserscored: true, paranoid: true, engine: 'MYISAM'}
         * defaults = {
         * paranoid: true,
         * engine: 'MYISAM',
         * timestamps: false,
         * unserscored: true,
         * freezeTableName: true,
         * tableName: 'my-table-name'
         * };
         */
        _entities: function (entity) {
            var i, id, lines = [], prefix = '';

            if (entity.hasOwnProperty('name')) {
                lines.push('return sequelize.define(\'' + entity.name.join('') + '\', {');
                if (entity.hasOwnProperty('id')) {
                    var sublines = this._primary(entity.id[0]);
                    lines.push(prefix + sublines);
                    prefix = ', ';
                }
                if (entity.hasOwnProperty('field')) {
                    for (i = 0; i < entity.field.length; i++) {
                        // (obj, primaryKey, autoIncrement, unique)
                        var sublines = this._columns(entity.field[i]);
                        lines.push(prefix + sublines);
                        prefix = ', ';
                    }
                    lines.push('}, {');
                    lines.push('timestamps: false, ');
                    lines.push('underscored: true, ');
                    lines.push('freezeTableName: true, ');
                    lines.push('tableName: \'' + entity.table.join('') + '\', ');
                    lines.push('classMethods: {}});');
                    return lines.join('');

                } else {
                    throw new Error('Uncorrect file format');

                }

            } else {
                throw new Error('Uncorrect file format');

            }
        },

        /**
         *
         */
        _root: function (entities) {
            var e, i, lines = [],
                prefix = '';
            for (i = 0; i < entities.length; i++) {
                var sublines = this._entities(entities[i]);
                lines.push(prefix + sublines);
                prefix = ', ';
            }
            return lines.join('');
        }

    };

    var EntityBuilder = function (grunt) {
        this._ = grunt;
    };
    // @TODO remove lodash
    _.extend(EntityBuilder.prototype, __privateMethods);

    /**
     *
     */
    EntityBuilder.prototype.parse = function (obj) {
        if (obj.hasOwnProperty('entity')) {
            var lines = [];
            lines.push('/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50*/' + this._.util.linefeed);
            lines.push('/*global require, module */');
            lines.push('module.exports = function (sequelize, DataTypes) {');
            lines.push('\'use strict\';');
            var root = this._root(obj.entity);
            lines.push(root);
            lines.push('};');
            return lines.join('');

        } else {
            throw new Error('Uncorrect file format');

        }
    };

    module.exports = EntityBuilder;

}());
