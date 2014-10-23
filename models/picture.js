/*jshint vars: true,indent: 4 */
/*global require, module, console*/
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('picture', {
		path: {
			name: 'path'
			,type: DataTypes.STRING
			,allowNull: false
		}
		,name: {
			name: 'name'
			,type: DataTypes.STRING
			,allowNull: false
		}
		,legend: {
			name: 'legend'
			,type: DataTypes.STRING
			,allowNull: false
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
	},{classMethods: {
	}});
};