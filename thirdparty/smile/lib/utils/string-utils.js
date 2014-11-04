/**
 *
 *
 */
/*jslint sloppy: true, vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50*/
/*global module, require, process */
(function () {

    var _ = require('lodash');

    /**
     *
     * Encapsulate Winston logger
     * @see https://github.com/flatiron/winston
     *
     */
    function StringUtils() {}

    StringUtils.padZero = function(val){
        return ( val < 10 ? '0' + val : val);
    };

    StringUtils.isDot = function(str){
        return (str === '.' || str === '..');
    };

    StringUtils.capitalize = function(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    StringUtils.trimEndLines = function(str){
        var regex = new RegExp(/\r?\n|\r/);
        var r = str.trim();
        r = r.replace(regex, '');
        return r;
    };

    /**
     *
     *
     *
     */
    StringUtils.isFilename = function (str) {

        if (!_.isString(str)) {
            return false;
        }

        if (_.isNull(str)) {
            return false;
        }

        if (_.isEmpty(str)) {
            return false;
        }

        if (str.indexOf('.') < 0) {
            return false;
        }

        if (str === '.') {
            return false;
        }

        if (str === '..') {
            return false;
        }

        return true;

    };

    module.exports = StringUtils;

}());
