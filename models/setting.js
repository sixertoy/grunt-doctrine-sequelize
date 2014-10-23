/*jshint vars: true,indent: 4 */
/*global require, module, console*/
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('setting', {
		value: {
			name: 'value'
			,type: DataTypes.STRING
			,allowNull: false
		}
	},{classMethods: {
	}});
};