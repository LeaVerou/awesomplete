var gulp = require('gulp');
var closure = require('gulp-closure-compiler-service');
var rename = require('gulp-rename');
var header = require('gulp-header');

var banner = "// Awesomplete - Lea Verou - MIT license\n";

gulp.task('minify', function() {
	return gulp.src(['awesomplete.js'])
		.pipe(closure({
			compilation_level: 'SIMPLE_OPTIMIZATIONS',
			language: 'ECMASCRIPT5'
		}))
		.pipe(rename({ suffix: '.min' }))
		.pipe(header(banner))
		.pipe(gulp.dest('.'));
});

gulp.task('default', ['minify']);
