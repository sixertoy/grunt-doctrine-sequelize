/* jshint indent: 4 */
/*global module */
module.exports = function () {
    return "/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 *//*global require, module */module.exports = function (sequelize, DataTypes) {'use strict';return sequelize.define('Event', {id: {type: DataTypes.INTEGER, unique: false, primaryKey: false, autoIncrement: false, allowNull: false}, picture_id: {type: DataTypes.INTEGER, unique: false, primaryKey: false, autoIncrement: false, allowNull: true}}, {timestamps: false, underscored: true, freezeTableName: true, tableName: 'event', classMethods: {}});};";
};
