'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var connect = require('connect');
var browserify = require('browserify');
var watchify = require('watchify');
var es6ify = require('es6ify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var serveStatic = require('serve-static');
var sass = require('gulp-sass');
var config = require('./config.json');

var htmlFiles = 'app/**/*.html';
var jsxFiles = 'app/jsx/**/*.jsx';
var scssFiles = 'app/scss/**/*.scss';
var vendorFiles = [
  'node_modules/es6ify/node_modules/traceur/bin/traceur-runtime.js'
];
var vendorBuild = config.distPath + '/vendor';
var requireFiles = './node_modules/react/react.js';

gulp.task('vendor', function () {
  return gulp.src(vendorFiles)
    .pipe(gulp.dest(vendorBuild));
});

gulp.task('html', function () {
  return gulp.src(htmlFiles)
    .pipe(gulp.dest(config.distPath));
});

gulp.task('server', function (next) {
  connect()
  .use(serveStatic(config.distPath))
  .listen(config.serverPort, function() {
    gutil.log('Server listening on port:', config.serverPort);
    next();
  });
});

gulp.task('scripts', function () {

  es6ify.traceurOverrides = {experimental: true};

  var entryFile = './app/jsx/app.jsx';

  var bundler = browserify({
    cache: {},
    packageCache: {},
    debug: true
  });
  bundler.add(entryFile);
  bundler = watchify(bundler);

  bundler.require(requireFiles);
  bundler.transform(reactify);
  bundler.transform(es6ify.configure(/.jsx/));

  function rebundle() {
    var stream = bundler.bundle();

    stream.on('error', function (err) { console.error(err); });
    stream = stream.pipe(source(entryFile));
    stream.pipe(rename('app.js'));
    stream.pipe(gulp.dest(config.distPath+'/bundle'));
  }

  bundler.on('update', rebundle);
  rebundle();
});

gulp.task('livereload', function() {
  livereload.listen({
    port: config.livereloadPort,
    basePath: config.distPath
  });
  gulp.watch([config.distPath + '/**/*'], function (evt) {
    livereload.changed(evt.path);
  });
});

gulp.task('lint', function() {
  gulp
    .src(['./*.js', './*.json'])
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-stylish')));
});

gulp.task('sass', function () {
  gulp
    .src(scssFiles)
    .pipe(sass())
    .pipe(gulp.dest(config.distPath + '/css'));
});

gulp.task('watch', function() {
  gulp.watch(htmlFiles, ['html']);
  gulp.watch(scssFiles, ['sass']);
});

gulp.task('default', [
  'vendor',
  'sass',
  'html',
  'scripts',
  'livereload',
  'watch',
  'server'
]);
