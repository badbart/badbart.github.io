var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var miniCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var csslint = require('gulp-csslint');


gulp.task('default',['linting','imageconverter','minify']);

gulp.task('imageconverter', function() {
	console.log('ImageConverter Task started');
});

gulp.task('linting', function() {
	console.log('Liniting Task started');
	
	gulp.src('gulpfile.js')
	.pipe(jshint())	
	.pipe(jshint.reporter('default'))
	.pipe(jshint.reporter('fail'));
	
	console.log('JS Hint done');
	
	gulp.src('src/css/styles.css')
	.pipe(csslint())
	.pipe(csslint.reporter());
});

gulp.task('minify', function() {
	console.log('minify task started');
	
	gulp.src('src/js/*.js')
	.pipe(concat('app.js'))
	.pipe(uglify())
	.pipe(rename('app.min.js'))
	.pipe(gulp.dest('build/js/'));
	
	console.log('JS Uglified');
	
	gulp.src('src/css/*.css')
	.pipe(miniCss())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('build/css'));
	
	console.log('CSS minified');
});