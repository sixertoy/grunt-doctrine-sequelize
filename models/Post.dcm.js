/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50*/
/*global require, module */
module.exports = function(sequelize, DataTypes) {
    'use strict';
    return sequelize.define('Post', {, source: {
            type: DataTypes.STRING(45),
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
        }, content: {
            type: DataTypes.TEXT,
            unique: false,
            primaryKey: false,
            autoIncrement: false,
            allowNull: true
        }, author: {
            type: DataTypes.STRING(45),
            unique: false,
            primaryKey: false,
            autoIncrement: false,
            allowNull: false
        }, date_publish: {
            type: DataTypes.DATE,
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
        }
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: 'post',
        classMethods: {}
    });
};