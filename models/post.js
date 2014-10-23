/*jshint vars: true,indent: 4 */
/*global require, module, console*/
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('post', {
		content: {
			name: 'content'
			,type: DataTypes.STRING
			,allowNull: false
		}
		,picture: {
			name: 'picture'
			,type: DataTypes.STRING
			,allowNull: false
		}
		,author: {
			name: 'author'
			,type: DataTypes.STRING
			,allowNull: false
		}
		,date_publish: {
			name: 'datePublish'
			,type: DataTypes.STRING
			,allowNull: false
		}
		,date_create: {
			name: 'dateCreate'
			,type: DataTypes.STRING
			,allowNull: false
		}
	},{classMethods: {
	}});
};