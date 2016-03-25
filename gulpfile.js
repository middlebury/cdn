var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var cmq = require('gulp-combine-mq');
var cssnano = require('gulp-cssnano');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var args = require('yargs').argv;
var chalk = require('chalk');
var config = require('./config.gulp'); // Import asset paths defined by project

var projectName = args.project || args.p;
var project = config[projectName];

var production = args.production || false;

// Custom error handler from
// https://github.com/mikaelbr/gulp-notify/issues/81#issuecomment-100422179
var reportError = function (error) {
  var lineNumber = (error.lineNumber) ? 'LINE ' + error.lineNumber + ' -- ' : '';

  notify({
    title: 'Task Failed [' + error.plugin + ']',
    message: lineNumber + 'See console.',
    sound: 'Sosumi' // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
  }).write(error);

  gutil.beep();

  var report = '';

  report += chalk.red('TASK:') + ' [' + error.plugin + ']\n';
  report += chalk.red('PROB:') + ' ' + error.message + '\n';
  if (error.lineNumber) { report += chalk.red('LINE:') + ' ' + error.lineNumber + '\n'; }
  if (error.fileName)   { report += chalk.red('FILE:') + ' ' + error.fileName + '\n'; }
  console.error(report);

  this.emit('end');
}

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
    .pipe(plumber({
      errorHandler: reportError
    }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(production ? cmq() : gutil.noop())
    .pipe(production ? cssnano() : gutil.noop())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(project.styles.dest))
});

gulp.task('watch', function() {
  gulp.watch(project.styles.src, ['styles']);
  gulp.watch(project.scripts.src, ['scripts']);
});

// Define default tasks to run
var tasks = [
  'styles'
]

if(args.watch) {
  tasks.push('watch');
}

gulp.task('default', tasks);
