var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var miniCss = require('gulp-clean-css');
var concat = require('gulp-concat');

gulp.task('default',['imageconverter','linting','minify']);

gulp.task('imageconverter', function() {
	console.log('ImageConverter Task started')
	
});

gulp.task('linting', function() {
	console.log('Liniting Task started')
});

gulp.task('minify', function() {
	console.log('minify task started')
	
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