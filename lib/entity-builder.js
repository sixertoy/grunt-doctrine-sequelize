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
        Util = require('util'),
        StringUtils = require('../thirdparty/smile/lib/utils/string-utils');

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
                    return 'DataTypes.STRING';

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
        _columns: function (o, primaryKey, autoIncrement, unique) {
            var t, p, i, lines = [];
            lines.push(o.column + ': {');
            t = this._type(o.type, o.length, o.unsigned, o.zerofill);
            lines.push('type: ' + t + ', ');
            lines.push('unique: ' + (unique || false) + ', ');
            lines.push('primaryKey: ' + (primaryKey || false) + ', ');
            lines.push('autoIncrement: ' + (autoIncrement || false) + ', ');
            lines.push('allowNull: ' + (o.nullable || false));
            lines.push('}');
            // lines.push('defaultValue: ' + (obj.nullable || false));
            // lines.push('comment: ' + (obj.nullable || false));
            return lines.join('');
        },


        _primary: function (obj) {
            var o = {};
            this.__mergeProperties(o, obj);
            var primaryKey = true,
                autoIncrement = (o.type.toLowerCase() === 'integer');
            return this._columns(o, primaryKey, autoIncrement);
        },

        /**
         * defaults: {timestamps: false, freezeTableName; true, tableName: 'my-table-name', unserscored: true, paranoid: true, engine: 'MYISAM'}
         * defaults = {
         *  paranoid: true,
         *  engine: 'MYISAM',
         *  timestamps: false,
         *  unserscored: true,
         *  freezeTableName: true,
         *  tableName: 'my-table-name'
         * };
         */

        _entities: function (entity) {
            var r, n, i, id, sublines, o = {}, lines = [], prefix = '';
            if (entity.hasOwnProperty('name')) {
                n = entity.name[0];
                lines.push('var ' + StringUtils.capitalize(n) + ' =  sequelize.define(\'' + n + '\', {');

                // Check du champ ID
                if (entity.hasOwnProperty('id')) {
                    sublines = this._primary(entity.id[0]);
                    lines.push(prefix + sublines);
                    prefix = ', ';
                }

                if (entity.hasOwnProperty('field')) {
                    for (i = 0; i < entity.field.length; i++) {
                        // (obj, primaryKey, autoIncrement, unique)
                        o = {};
                        this.__mergeProperties(o, entity.field[i]);
                        sublines = this._columns(o);
                        lines.push(prefix + sublines);
                        prefix = ', ';
                    }
                } else {
                    throw new Error('Uncorrect file format');
                }

                lines.push('}, {');
                lines.push('timestamps: false, ');
                lines.push('underscored: true, ');
                lines.push('freezeTableName: true, ');
                lines.push('tableName: \'' + entity.table[0] + '\'');

                // Relations
                if (entity.hasOwnProperty('one-to-many')) {
                    console.log('Unsupported relations one-to-many');
                }

                if (entity.hasOwnProperty('one-to-one') || entity.hasOwnProperty('many-to-one') || entity.hasOwnProperty('many-to-many')) {
                    lines.push(', ');
                    lines.push('classMethods: { associate: function (models){');

                    var as, target, refKey, fKey, jTable;

                    if (entity.hasOwnProperty('one-to-one')) {
                    }

                    if (entity.hasOwnProperty('many-to-one')) {
                        r = entity['many-to-one'];
                        for (i = 0; i < r.length; i++) {
                            as = r[i]['field'][0];
                            target = r[i]['target-entity'][0];
                            fKey = r[i]['join-columns'][0]['join-column'][0]['name'][0];
                            refKey = r[i]['join-columns'][0]['join-column'][0]['referenced-column-name'][0];
                            if (refKey !== 'id') {
                                throw new Error('Unsupported referenced column name: ' + refKey + ' :: Only refenced column key \'id\' is supported');
                            } else {
                                lines.push('\n/* ' + StringUtils.capitalize(n) + ' belongsTo/hasMany ' + StringUtils.capitalize(target) + ' */');
                                lines.push('models.' + StringUtils.capitalize(target) + '.hasMany(' + StringUtils.capitalize(n) + ');');
                                lines.push(StringUtils.capitalize(n) + '.belongsTo(models.' + StringUtils.capitalize(target) + ', {');
                                lines.push('as: \'' + as + '\', foreignKey:\'' + fKey + '\'');
                                lines.push('});');
                            }
                        }
                    }

                    if (entity.hasOwnProperty('many-to-many')) {
                        r = entity['many-to-many'];
                        for (i = 0; i < r.length; i++) {
                            as = r[i]['field'][0];
                            target = r[i]['target-entity'][0];
                            if (r[i].hasOwnProperty('mapped-by')){
                                lines.push('\n/* ' + StringUtils.capitalize(n) + ' hasMany/hasMany ' + StringUtils.capitalize(target) + ' */');
                            } else {
                                if (r[i].hasOwnProperty('join-table')) {
                                    jTable = r[i]['join-table'][0]['name'][0];
                                    lines.push('\n/* ' + StringUtils.capitalize(n) + ' hasMany/hasMany ' + StringUtils.capitalize(target) + ' */');
                                    lines.push(StringUtils.capitalize(n) + '.hasMany(models.' + StringUtils.capitalize(target) + ', {through: \'' + jTable + '\'});');
                                    lines.push('models.' + StringUtils.capitalize(target) + '.hasMany(models.' + StringUtils.capitalize(n) + ', {through: \'' + jTable + '\'});');
                                } else {
                                    console.log('Self referenced hasMany/hasMany entity need to through to null');
                                }

                            }
                        }
                    }
                    lines.push('}}');
                }


                lines.push('});');

                lines.push('return ' + StringUtils.capitalize(n) + ';');
                return lines.join('');

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
