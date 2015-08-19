var gulp = require("gulp");
var gutil = require('gulp-util');
var babel = require("gulp-babel");
var print = require('gulp-print');
var less = require('gulp-less');
var watch = require('gulp-watch');
var symlink = require('gulp-sym');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var rename = require("gulp-rename");

var babelOptions = {
	optional: ["es7.objectRestSpread", "es7.classProperties", "strict"]
};

var filepath = {
	js: {src: 'app/**/*.js', dest: 'dist/js/app'},
	css: {watch: 'app/less/**/*.*(css|less)', src: 'app/less/app.less', dest: 'dist/css', file: 'output.css'},
	html: {src: 'app/index.html', dest: 'dist', file: 'index.html'}
};

// TODO - workout how to make gulp-watch work and remove
// duplication below
gulp.task('html_watch', function() {
	return gulp.src(filepath.html.src)
	.pipe(watch(filepath.html.src))
	.pipe(rename(filepath.html.file))
	.pipe(gulp.dest(filepath.html.dest))
	.pipe(connect.reload());
});

gulp.task('less_watch', function() {
	return gulp.src(filepath.css.src)
	.pipe(watch(filepath.css.src))
	.pipe(rename(filepath.css.file))
	.pipe(gulp.dest(filepath.css.dest));
});

gulp.task('transpile', function() {
	return gulp.src(filepath.js.src)
	.pipe(sourcemaps.init())
	.pipe(babel(babelOptions))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(filepath.js.dest));
});

gulp.task('transpile_watch', function() {
	return gulp.src(filepath.js.src)
	.pipe(watch(filepath.js.src))
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(babel(babelOptions))
	.pipe(print(function(filepath) {
		return "transpiled: " + filepath;
	}))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(filepath.js.dest));
});

// gulp.task('fonts_watch', function() {
// 	return gulp.src([
// 		'jspm_packages/npm/font-awesome@4.3.0/fonts/*',
// 		'jspm_packages/npm/react-widgets@2.7.3/dist/fonts/*'
// 	])
// 	.pipe(watch([
// 		'jspm_packages/npm/font-awesome@4.3.0/fonts/*',
// 		'jspm_packages/npm/react-widgets@2.7.3/dist/fonts/*'
// 	]))
// 	.pipe(gulp.dest('dist/fonts'));
// })

gulp.task('connect', function() {
	return connect.server({
		root: 'dist/',
		port: 8080
	});
});

gulp.task("default", ["html_watch", "less_watch", "transpile_watch", "connect"]);
