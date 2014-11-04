/**
 *
 *
 *
 *
 * @see https://raw.githubusercontent.com/SBoudrias/class-extend/master/index.js
 *
 */
/*jslint sloppy: true, vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50*/
/*global module, require, process*/
(function () {

    // Imports
    var Path = require('path'),
        Base = require('smile/lib/core/base'),
        SysUtils = require('smile/lib/utils/sys-utils');

    /**
     *
     * extend NodeJS EventEmirter
     *
     */
    var Class = Base.extend({

        _module: null,

        constructor: function () {
            this._super();
        }
    });

    /**
     *
     *
     *
     */
    function __options(key, value) {
        if (arguments.length > 1 && this._.isString(key)) {
            this._options[key] = value;
            return this;
        } else if (arguments.length === 1 && this._.isString(key)) {
            if (this._options.hasOwnProperty(key)) {
                return this._options[key];
            } else {
                throw new Error('Unable to find option "' + key + '"');
            }
        }
        return this._options;
    }

    /**
     * Call parent constructor
     * without params
     */
    function __super() {
        if (this.__super__ && this.__super__.constructor) {
            var Parent = this.__super__.constructor;
            if (this.constructor !== Parent) {
                var parent = new Parent();
            }
        }
    }

    var __namespace = (function () {
        return SysUtils.getNamespace(module);
    }());

    /**
     *
     *
     *
     */
    function __toString() {
        var $this = this.constructor;
        return String($this.valueOf());
    }

    // Prototype
    Class.prototype._options = {};
    // _super() must be called
    // in class constructor before any
    // to chain options
    Class.prototype._super = __super;
    Class.prototype.options = __options;
    Class.prototype.toString = __toString;
    Class.prototype.namespace = __namespace;
    //
    module.exports = Class;

}());
