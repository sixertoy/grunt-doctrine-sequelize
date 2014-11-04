# grunt-sequelize-doctrine

> The best Grunt plugin ever.

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sequelize-doctrine --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sequelize-doctrine');
```

## The "sequelize_doctrine" task

### Overview
In your project's Gruntfile, add a section named `build_models` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  build_models: {
    options: {
        extension: 'dcm',
        helpers: 'helpers',
        root: 'doctrine-mapping'
    },
    files: {
        dest: 'models/',
        src: ['models/doctrine/**/*']
    },
  },
});
```

### Command line
> Construction des modeles

```bash
$ grunt build_models
```

> Construction des modeles + des helpers

```bash
$ grunt build_models --helpers
```

> debug

```bash
$ grunt --debug build_models
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
### v0.4.0
- Ajout de l'option grunt --helpers-reset

### v0.3.0
- Ajout de l'option grunt --helpers

### v0.2.0
- Build helpers des entites
- Ajout des extensions doctrine

### v0.1.0
- Build des entites sur les modeles XML doctrine
