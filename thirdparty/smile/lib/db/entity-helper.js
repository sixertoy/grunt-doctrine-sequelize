/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50*/
/*global require, module */
(function() {
    'use strict';
    /* imports */
    var Class = require('smile/lib/core/class');
    /* constructor */
    var EntityHelper = Class.extend({
        _model: null,
        _sequelizer: null,
        constructor: function(sequelizer, model) {
            this._super();
            this._model = model;
            this._sequelizer = sequelizer;
        }
    });
    EntityHelper.prototype.getModel = function(){
        return this._model;
    };
    /* export */
    module.exports = EntityHelper;
}());
