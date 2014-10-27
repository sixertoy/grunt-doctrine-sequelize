/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50*/
/*global require, module */
module.exports = function(sequelize, DataTypes) {
    'use strict';
    return sequelize.define('User', {, username: {
            type: DataTypes.STRING(25),
            unique: false,
            primaryKey: false,
            autoIncrement: false,
            allowNull: false
        }, lastname: {
            type: DataTypes.STRING(255),
            unique: false,
            primaryKey: false,
            autoIncrement: false,
            allowNull: false
        }, firstname: {
            type: DataTypes.STRING(255),
            unique: false,
            primaryKey: false,
            autoIncrement: false,
            allowNull: false
        }, id_picture: {
            type: DataTypes.INTEGER,
            unique: false,
            primaryKey: false,
            autoIncrement: false,
            allowNull: true
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
        }, salt: {
            type: DataTypes.STRING(32),
            unique: false,
            primaryKey: false,
            autoIncrement: false,
            allowNull: false
        }, password: {
            type: DataTypes.STRING(255),
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
        tableName: 'user',
        classMethods: {}
    });
};