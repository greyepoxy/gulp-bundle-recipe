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

var babelifyOps = {presets: ["es2015"]};

function getBundler(file) {
	var bundler = browserify(file.path, {debug: true});

	return bundler;
};

function bundle(file, bundler, outDirectory, shouldUglify) {
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
		.pipe(shouldUglify ? uglify() : gutil.noop())
			.on('error', gutil.log)
		.pipe(shouldUglify ? rename({ suffix: '.min' }) : gutil.noop())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(outDirectory));
};

function bundleTask(sources, sourcesBaseDir, outDir, isPublishVer){
	return gulp.src(sources, { base: sourcesBaseDir })
		.pipe(forEach(function (stream, file) {
			var bundler = getBundler(file)
				.transform(babelify, babelifyOps);
			
			bundle(file, bundler, outDir, isPublishVer);
		}));
}

var bundleTaskName = 'bundle';
var bundleUglifyTaskName = 'publishBundle';
var bundleWatchTaskName = 'autoBundle';
var sourcesBaseDir = './dist';
var sources = [path.join(sourcesBaseDir, 'index.js')];
var outDir = './dist/bundles';
gulp.task(bundleTaskName, function () {
	return bundleTask(sources, sourcesBaseDir, outDir, false /* shouldUglify */)
});

gulp.task(bundleUglifyTaskName, function () {
	return bundleTask(sources, sourcesBaseDir, outDir, true /* shouldUglify */)
});

gulp.task(bundleWatchTaskName, function () {
	return gulp.src(sources, { base: sourcesBaseDir })
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
