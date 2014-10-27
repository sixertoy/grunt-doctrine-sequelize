/*gloabl module */
(function () {

    'use strict';

    // <field name="name" type="bigint" column="name" length="11" nullable="false"/>
    module.exports = function (n, l, u, z) {
        var obj = {name: ['idSource'], type: ['bigint'], length: [(l || false)], nullable: [(n || false)], column: ['id_source']};
        if (u) obj.unsigned = [true];
        if (z) obj.zerofill = [true];
        return obj
    };

}());
