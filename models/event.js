/*jshint vars: true,indent: 4 */
/*global require, module, console*/
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('event', {
		name: {
			name: 'name'
			,type: DataTypes.STRING
			,allowNull: false
		}
		,univers: {
			name: 'univers'
			,type: DataTypes.STRING
			,allowNull: false
		}
		,color: {
			name: 'color'
			,type: DataTypes.STRING
			,allowNull: false
		}
		,state: {
			name: 'state'
			,type: DataTypes.STRING
			,allowNull: false
		}
		,date_event: {
			name: 'dateEvent'
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