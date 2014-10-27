/**
 * http://DataTypesjs.com/docs/1.7.8/models#block-1-line-0
 * allowNull
 * defaultValue
 * unique
 * type
 * primaryKey
 * comment
 * autoIncrement
 */
/*global module, require */
(function () {

    'use strict';

    // <field name="idSource" type="string" column="id_source" length="45" nullable="false"/>
    module.exports = function () {
        return 'id_source: {type: DataTypes.BIGINT(11).UNSIGNED.ZEROFILL, unique: false, primaryKey: false, autoIncrement: false, allowNull: false}';
    };

}());
