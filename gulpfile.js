var gulp = require("gulp");
var browserify = require("browserify");
var babelify = require("babelify");
var connect = require("gulp-connect");
var opn = require("opn");
var runSequence = require("run-sequence");
var source = require("vinyl-source-stream");

gulp.task("build", function() {
	return browserify({
		entries: "index.js",
		extensions: ['.js'],
		debug: true
	})
	.transform(babelify)
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(gulp.dest('app'));
});

gulp.task("startserver", function() {
	return connect.server({
		port: 3000,
		root: './app/',
		fallback: 'index.html'
	});
});

gulp.task("openbrowser", function() {
	return opn("http://localhost:3000");
});


gulp.task("default", function() {
	runSequence( "build", "startserver", "openbrowser" );
});
