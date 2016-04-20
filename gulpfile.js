var gulp = require('gulp');

gulp.task('default',['imageconverter','linting','minify']);

gulp.task('imageconverter', function() {
	console.log('ImageConverter Task started')
	
});

gulp.task('linting', function() {
	console.log('Liniting Task started')
});

gulp.task('minify', function() {
	console.log('minify task started')
});