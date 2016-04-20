var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var miniCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var csslint = require('gulp-csslint');
var htmllint = require('gulp-htmllint');
var gutil = require('gulp-util');


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
	
	console.log('CSS Lint done');
	
	gulp.src('index.html')
	.pipe(htmllint({}, htmllintReporter));
	
	function htmllintReporter(filepath, issues) {
	if (issues.length > 0) {
		issues.forEach(function (issue) {
			gutil.log(gutil.colors.cyan('[gulp-htmllint] ') + gutil.colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + gutil.colors.red('(' + issue.code + ') ' + issue.msg));
		});
 
		process.exitCode = 1;
	}
};

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