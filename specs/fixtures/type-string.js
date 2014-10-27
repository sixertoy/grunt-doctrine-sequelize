/*gloabl module */
(function () {

    'use strict';

    // <field name="name" type="string" column="name" length="255" nullable="false"/>
    module.exports = function (n, l) {
        return {name: ['idSource'], type: ['string'], length: [(l || 255)], nullable: [(n || false)], column: ['id_source']};
    };

}());
