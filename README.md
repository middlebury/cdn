# cdn
> Storage of CSS, JS, HTML, and images shared across Middlebury's websites.

**Important:** Some CSS/JS is processed with [Gulp](https://github.com/gulpjs/gulp) so they can use [Sass](https://sass-lang.com/) and other [npm modules](https://www.npmjs.com/). These assets must be built and commited to git.

See [config.gulp.js](./config.gulp.js) for projects using Gulp.

## Requirements
- Node.js v6.4+

## Quick start

```bash
# install Node dependencies
npm install

# build + watch assets
npm run watch -- --project myProjectName

# or just build
npm run build -- --project myProjectName
```

### Multi-project configuration

Typically you have a single `gulpfile.js` which has all the configuration for your single project, but because this repo contains assets for multiple websites/projects, it's been configured so one gulpfile can be used across varying folder structures and files.

The file sources and output destinations are defined in [`config.gulp.js`](./config.gulp.js).

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

## Todo
- [ ] Get sourcemaps to cooperate with `gulp-combine-mq`
