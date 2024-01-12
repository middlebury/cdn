import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cmq from 'gulp-combine-mq';
import cssnano from 'gulp-cssnano';
import sourcemaps from 'gulp-sourcemaps';
import args from 'yargs';
import chalk from 'chalk';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import config from './config.gulp';

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
      browsers: ['> 1%', 'last 2 versions', 'ie 9', 'ie 10']
    }))
    .pipe(gulp.dest(project.styles.dest))
    .pipe(cmq())
    .pipe(cssnano({
      zindex: false // disable optimizing z-index
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(project.styles.dest))
});

gulp.task('scripts', function() {
  return gulp.src(project.scripts.src)
    .pipe(gulp.dest(project.scripts.dest))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(project.scripts.dest));
});

gulp.task('watch', function() {
  gulp.watch(project.styles.src, ['styles']);
  gulp.watch(project.scripts.src, ['scripts']);
});

var buildTasks = [];

if(project.styles && project.styles.src && project.styles.dest) {
  buildTasks.push('styles');
}

if(project.scripts && project.scripts.src && project.scripts.dest) {
  buildTasks.push('scripts');
}

gulp.task('build', buildTasks);

gulp.task('default', ['build', 'watch']);
