/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50*/
/*global require, module */
module.exports = function(sequelize, DataTypes) {
    'use strict';
    return sequelize.define('Module', {, name: {
            type: DataTypes.STRING(45),
            unique: false,
            primaryKey: false,
            autoIncrement: false,
            allowNull: false
        }, system_name: {
            type: DataTypes.STRING(45),
            unique: false,
            primaryKey: false,
            autoIncrement: false,
            allowNull: false
        }
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: 'module',
        classMethods: {}
    });
};