/*jshint vars: true,indent: 4 */
/*global require, module, console*/
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('video', {
		url: {
			name: 'url'
			,type: DataTypes.STRING
			,allowNull: true
		}
		,date_create: {
			name: 'dateCreate'
			,type: DataTypes.STRING
			,allowNull: false
		}
		,date_update: {
			name: 'dateUpdate'
			,type: DataTypes.STRING
			,allowNull: false
		}
		,state: {
			name: 'state'
			,type: DataTypes.STRING
			,allowNull: false
		}
	},{classMethods: {
	}});
};