/*jshint vars: true,indent: 4 */
/*global require, module, console*/
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		username: {
			name: 'username'
			,type: DataTypes.STRING
			,allowNull: false
		}
		,lastname: {
			name: 'lastname'
			,type: DataTypes.STRING
			,allowNull: false
		}
		,firstname: {
			name: 'firstname'
			,type: DataTypes.STRING
			,allowNull: false
		}
		,id_picture: {
			name: 'idPicture'
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
		,salt: {
			name: 'salt'
			,type: DataTypes.STRING
			,allowNull: false
		}
		,password: {
			name: 'password'
			,type: DataTypes.STRING
			,allowNull: false
		}
		,is_active: {
			name: 'isActive'
			,type: DataTypes.STRING
			,allowNull: false
		}
	},{classMethods: {
	}});
};