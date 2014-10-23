/*jshint vars: true,indent: 4 */
/*global require, module, console*/
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('module', {
		name: {
			name: 'name'
			,type: DataTypes.STRING
			,allowNull: false
		}
		,system_name: {
			name: 'systemName'
			,type: DataTypes.STRING
			,allowNull: false
		}
	},{classMethods: {
	}});
};