var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var miniCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var csslint = require('gulp-csslint');
var html5Lint = require('gulp-html5-lint');
var gutil = require('gulp-util');
var imageResize = require('gulp-image-resize');


gulp.task('default',['linting','imageconverter','minify']);

gulp.task('imageconverter', function() {
	console.log('ImageConverter Task started');
	
	gulp.src('src/img/svg/logo.svg')
	.pipe(gulp.dest('build/img/svg/'));
	
	[980,760,450].forEach(function(size) {
		gulp.src('src/img/code.jpg')
		.pipe(imageResize({
			width: size,
			quality: 0.80		
		}))
		.pipe(rename({
			suffix: '.' + size
		}))
		.pipe(gulp.dest('build/img/'));
	});

	gulp.src(['src/img/game.jpg','src/img/portfolio.jpg','src/img/resume.png'])
	.pipe(imageResize({
			width: 350,
			quality: 0.80		
		}))
	.pipe(gulp.dest('build/img/'));
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
	
	console.log('CSS Lint done');
	
	gulp.src('index.html')
	.pipe(html5Lint());

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