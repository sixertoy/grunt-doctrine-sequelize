/*jslint sloppy: true, vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50*/
/*global module, require, process */
(function () {

    var _ = require('lodash'),
        Path = require('path');

    function SysUtils() {}

    SysUtils.getNodePath = function () {
        return process.env.node_path;
    };

    /**
     *
     * NodeJs NODE_PATH must be setted
     * // Win32
     * Ex: SET NODE_PATH='./app;./thirdparty'
     *
     */
    SysUtils.getIncludePath = function () {
        var path = SysUtils.getNodePath();
        if (!_.isNull(path) && !_.isEmpty(path)) {
            return path.split(Path.delimiter);
        } else {
            return false;
        }
    };

    /**
     * Determine si le module
     * Est inclu danss l'autoload
     * Defini par la variable d'environnement NODE_PATH
     */
    SysUtils.getExportPath = function (file) {
        var i, r = false,
            paths = SysUtils.getIncludePath();
        for (i = 0; i < paths.length; i++) {
            if (!r) {
                var p = Path.normalize(paths[i]);
                if (file.indexOf(p) !== -1) {
                    r = p;
                }
            }
        }
        return r;
    };

    SysUtils.inExportPath = function (file) {
        return SysUtils.getExportPath() !== false;
    };

    SysUtils.getNamespace = function (module, dotify) {
        var n, b,
            f = module.filename,
            p = SysUtils.getExportPath(f);
        if (p) {
            b = Path.relative(process.cwd(), f);
            n = Path.basename(b, Path.extname(b));
            return Path.join(Path.dirname(b), n)
                        .substr(p.length + 1)
                        .split(Path.sep)
                        .join((dotify ? '.' : '_'))
                        .toLowerCase();
        }
        return f;
    };

    module.exports = SysUtils;

}());
