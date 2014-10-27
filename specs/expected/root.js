/* jshint indent: 4 */
/*global module */
module.exports = function () {
    return "return sequelize.define('Event', {id: {type: DataTypes.INTEGER, unique: false, primaryKey: false, autoIncrement: false, allowNull: false}, picture_id: {type: DataTypes.INTEGER, unique: false, primaryKey: false, autoIncrement: false, allowNull: true}}, {timestamps: false, underscored: true, freezeTableName: true, tableName: 'event', classMethods: {}});";
};
