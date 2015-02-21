'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');

var connect = require('connect');
var browserify = require('browserify');
var watchify = require('watchify');
var es6ify = require('es6ify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var serveStatic = require('serve-static');
var nconf = require('nconf');
var del = require('del');

// Load config from file
nconf.file({ file: 'app/config/app.json' });

var htmlFiles = 'app/**/*.html';
var jsxFiles = 'app/jsx/**/*.jsx';
var scssFiles = 'app/scss/**/*.scss';
var vendorFiles = [
  'node_modules/es6ify/node_modules/traceur/bin/traceur-runtime.js'
];
var vendorBuild = nconf.get('distPath') + '/vendor';
var requireFiles = './node_modules/react/react.js';

gulp.task('clean', function(next) {
  del([nconf.get('distPath')+'/**/*'], next);
})

gulp.task('vendor', ['clean'], function () {
  return gulp.src(vendorFiles)
    .pipe(gulp.dest(vendorBuild));
});

gulp.task('html', ['clean'], function () {
  return gulp.src(htmlFiles)
    .pipe(gulp.dest(nconf.get('distPath')));
});

gulp.task('scripts', ['clean'], function () {

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
    stream.pipe(gulp.dest(nconf.get('distPath')+'/bundle'));
  }

  bundler.on('update', rebundle);
  rebundle();
});

gulp.task('livereload', ['build'], function() {
  livereload.listen({
    port: nconf.get('livereloadPort'),
    basePath: nconf.get('distPath')
  });
  gulp.watch([nconf.get('distPath') + '/**/*'], function (evt) {
    livereload.changed(evt.path);
  });
});

gulp.task('lint', function() {
  return gulp
    .src(['./*.js', './*.json'])
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-stylish')));
});

gulp.task('sass', ['clean'], function () {
  return gulp
    .src(scssFiles)
    .pipe(sass())
    .pipe(gulp.dest(nconf.get('distPath') + '/css'));
});

gulp.task('server', ['watch'], function (next) {
  connect()
  .use(serveStatic(nconf.get('distPath')))
  .listen(nconf.get('serverPort'), function() {
    gutil.log('Server listening on port:', nconf.get('serverPort'));
    next();
  });
});

gulp.task('watch', ['build'], function() {
  gulp.watch(htmlFiles, ['html']);
  gulp.watch(scssFiles, ['sass']);
});

gulp.task('build', [
  'vendor',
  'sass',
  'html',
  'scripts'
]);

gulp.task('default', [
  'clean',
  'build',
  'livereload',
  'watch',
  'server'
]);
