const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const del = require('del');
const zip = require('gulp-zip');
const sassLint = require('gulp-sass-lint');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

function liveReload() {
  browserSync.init({
    server: './src'
  })

  gulp.watch('src/scss/**/*.scss', compileStyles); 
  gulp.watch('src/script/**/*.js', transpileScript)
  gulp.watch('src/*.html').on('change', browserSync.reload)
}

function sassLinter (){
  return src('sass/**/*.scss')
  .pipe(sassLint({
    configFile: 'main.scss'
  }))
  .pipe(sassLint.format())
  .pipe(sassLint.failOnError())
}

function compileStyles() {
  return gulp.src('src/scss/main.scss')
  .pipe(plumber({
    errorHandler: notify.onError(function (err) {
      return {
        title: 'Styles',
        message: err.message
      };
    })
  }))
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream())
}

function transpileScript() {
  return gulp.src(['src/script/*.js', '!src/script/main.js'])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream());
}


function buildStyles() {
  return gulp.src('src/css/*.css')
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('build/css'))
}

function buildScript() {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
}

function buildHtml() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('build'))
}

function copiImages () {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('build'));
};

function cleanUp() {
  return del('build')
}

function archive() {
  return gulp.src('build/**/**')
    .pipe(zip('build.zip'))
    .pipe(gulp.dest('./'))
}

exports.default = liveReload;
exports.scss = compileStyles;
exports.sassLinter= sassLinter;
exports.build = gulp.series(cleanUp, gulp.parallel(buildStyles, buildScript, buildHtml, copiImages), archive);