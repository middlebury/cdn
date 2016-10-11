var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var cmq = require('gulp-combine-mq');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var args = require('yargs').argv;
var chalk = require('chalk');
var rename = require('gulp-rename');
var config = require('./config.gulp'); // Import asset paths defined by project

var projectName = args.project || args.p;
var project = config[projectName];

// if no value is passed after --project, it returns true, so check for it here.
if(!projectName || projectName === true) {
  throw new Error(chalk.red('You must pass a --project argument when calling gulp e.g. gulp --project responsive'));
}

if(typeof project !== 'object') {
  throw new Error(chalk.red('No project found in config.gulp.js with the key "' + args.project + '"'));
}

console.info(chalk.blue('Gulp running for project "' + projectName + '"'));

if(typeof project.styles !== 'object') {
  throw new Error(chalk.red('Project must have a `styles` key containing an object with `src` and `dest` keys being file paths.'));
}

gulp.task('styles', function() {
  return gulp.src(project.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'ie 9']
    }))
    .pipe(gulp.dest(project.styles.dest))
    .pipe(cmq())
    .pipe(cssnano({
      zindex: false // disable optimizing z-index
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(project.styles.dest))
});

gulp.task('watch', function() {
  gulp.watch(project.styles.src, ['styles']);
});

gulp.task('build', ['styles']);

gulp.task('default', ['build', 'watch']);
