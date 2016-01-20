var gulp = require('gulp');
var forEach = require('gulp-foreach');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var gutil = require('gulp-util');
var path = require('path');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var config = require('../gulpconfig.json')['bundle'];

var babelifyOps = {presets: ["es2015"]};

function getBundler(file) {
	var bundler = browserify(file.path, {debug: true});

	return bundler;
};

function bundle(file, bundler, outDirectory, outputMinJs) {
	var fileName = path.basename(file.path);
	
	return bundler
		.bundle()
		.on('error', function(err) {
			gutil.log("error:", err.message);
			this.emit('end');
		})
		.pipe(source(fileName))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(outputMinJs ? uglify() : gutil.noop())
			.on('error', gutil.log)
		.pipe(outputMinJs ? rename({ suffix: '.min' }) : gutil.noop())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(outDirectory));
};

var sources = config.rootSrcFiles;
var outDir = config.outDir;
gulp.task(config.taskName, function () {
	return gulp.src(sources)
		.pipe(forEach(function (stream, file) {
			var bundler = getBundler(file)
				.transform(babelify, babelifyOps);

			return bundle(file, bundler, outDir, true /* outputMinJs */);
		}));
});

gulp.task(config.watchTaskName, function () {
	return gulp.src(sources)
		.pipe(forEach(function (stream, file) {
			var bundler = watchify(getBundler(file))
				.transform(babelify, babelifyOps);

			function rebundle() {
				gutil.log('Updated', file.path);

				return bundle(file, bundler, outDir, false /* outputMinJs */);
			}

			bundler.on("update", rebundle);
			bundler.on("log", gutil.log);

			return rebundle();
		}));
});
