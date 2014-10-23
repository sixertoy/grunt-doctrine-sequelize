/*jshint vars: true,indent: 4 */
/*global require, module, console*/
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('watch', {
		id_object: {
			name: 'idObject'
			,type: DataTypes.STRING
			,allowNull: false
		}
	},{classMethods: {
	}});
};