/*gloabl module */
(function () {

    'use strict';

    // <field name="name" type="string" column="name" length="255" nullable="false"/>
    module.exports = function (n, l) {

        return {
            name: ['Event'],
            table: ['event'],
            field: [
                {
                    name: ['id'],
                    type: ['integer'],
                    length: [11],
                    nullable: [false],
                    column: ['id']
                },
                {
                    name: ['pictureId'],
                    type: ['integer'],
                    length: [11],
                    nullable: [true],
                    column: ['picture_id']
                }
            ]
        };
    };

}());
