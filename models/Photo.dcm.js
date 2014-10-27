/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50*/
/*global require, module */
module.exports = function(sequelize, DataTypes) {
    'use strict';
    return sequelize.define('Photo', {, position: {
            type: DataTypes.INTEGER,
            unique: false,
            primaryKey: false,
            autoIncrement: false,
            allowNull: false
        }, id_source: {
            type: DataTypes.STRING(45),
            unique: false,
            primaryKey: false,
            autoIncrement: false,
            allowNull: false
        }, date_create: {
            type: DataTypes.DATE,
            unique: false,
            primaryKey: false,
            autoIncrement: false,
            allowNull: false
        }, date_update: {
            type: DataTypes.DATE,
            unique: false,
            primaryKey: false,
            autoIncrement: false,
            allowNull: false
        }, state: {
            type: ,
            unique: false,
            primaryKey: false,
            autoIncrement: false,
            allowNull: false
        }
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: 'photo',
        classMethods: {}
    });
};