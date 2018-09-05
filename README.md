# cdn

## Using [Gulp](http://gulpjs.com/) to compile assets for projects

**IMPORTANT:** Because we are not running Gulp in production to build assets on deploy, compiled assets must also stay in version control. Due to this, you must **NOT** make changes directly to the output file(s) i.e. a CSS file that has been preprocessed by Sass. Always edit the source files then commit the output at the same time as the source.

The following projects are using Gulp and Sass:

- BLSE
  - Sass files `./middlebury.edu/2010/sass/blse/`
  - Output CSS file `./middlebury.edu/2010/css/blse.css`
  - Gulp command `gulp --project blse`
- Midd Responsive
  - Sass files `./middlebury.edu/2015/sass/responsive/`
  - Output CSS file `./middlebury.edu/2015/css/responsive.css`
  - Gulp command `gulp --project responsive`
- Language Schools
  - Sass files `./middlebury.edu/2010/sass/ls/`
  - Output CSS files `./middlebury.edu/2010/css/ls.css`, `./middlebury.edu/2010/css/ls.min.css`
  - Gulp command `gulp --project ls`
- Sustainability
  - Sass files `./middlebury.edu/2015/sass/sustainability/`
  - Output CSS files `./middlebury.edu/2015/css/sustainability.css`, `./middlebury.edu/2015/css/sustainability.min.css`
  - Output JS files `./middlebury.edu/2015/js/sustainability.js`, `./middlebury.edu/2015/js/sustainability.min.js`
  - Gulp command `gulp --project sustainability`

By default, gulp will run `watch` to continuously watch assets and recompile. If you don't want to do this, run `gulp --project <projectname> build` instead to compile them once.

### Installation

To install required NodeJS dependencies to use Gulp, run the following in command line:

```bash
npm install
```

Read more about working with NPM: https://docs.npmjs.com/how-npm-works/packages

### Multi-project configuration

Typically you have a single `gulpfile.js` which has all the configuration for your single project, but because this repo contains assets for multiple websites/projects, it's been configured so one gulpfile can be used across varying folder structures and files.

The file sources and output destinations are defined in `config.gulp.js`.

```js
module.exports = {
  myProjectName: {
    styles: {
      src: './path/to/main.scss',
      dest: './path/to/output/directory/'
      // The destination does not define a filename. The filename will be the same as the imported file.
    }
  }
}
```

To add a new project configuration, create a new key within the exported object with the above structure. Example:

```js
module.exports = {
  myProjectName: {
    // ...
  },
  newProjectName: {
    styles: {
      src: './path/to/file.scss',
      dest: './path/to/dir/'
    }
  }
}
```

### Running Gulp

To run gulp for a specific project:

```bash
npm run build -- --project myProjectName
```

Use `--watch` flag to continuously build.


## Todo
- [ ] Get sourcemaps to cooperate with `gulp-combine-mq`
