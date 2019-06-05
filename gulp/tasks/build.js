var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var del = require('del');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

// open browser and show index in dist folder
gulp.task('dist', function () {
	browserSync.init({
		notify: false,
		server: {
			baseDir: "dist"
		}
	});
});


// delete old before processing 
gulp.task('deleteDistFolder', function () {
	return del("./dist");
});


// copy other files (if any) at app folder to dist folder
gulp.task('copyGeneralFiles', ['deleteDistFolder'], function () {
	var pathsToCopy = [
		"./app/**/*",
		"!./app/index.html",
		"!./app/assets/images/**",
		"!./app/assets/scripts/**",
		"!./app/assets/styles/**",
		"!./app/temp",
		"!./app/temp/**"
	];
	return gulp.src(pathsToCopy)
		.pipe(gulp.dest("./dist"));
});


// icons task (from sprite.js) added to dependencies to be sure that there are the latest versions to process
gulp.task('optimizeImages', ['deleteDistFolder', 'icons'], function () {
	return gulp.src(["./app/assets/images/**/*", "!./app/assets/images/icons", "!./app/assets/images/icons/**/*"])
		.pipe(imagemin({
			progressive: true,
			interlaced: true,
			multipass: true
		}))
		.pipe(gulp.dest("./dist/assets/images"));
});


// styles ja scripts tasks added to dependencies to be sure that there are the latest versions to process
gulp.task('usemin', ['deleteDistFolder', 'styles', 'scripts'], function () {
	return gulp.src("./app/index.html")
		.pipe(usemin({
			css: [function () {return rev();}, function () {return cssnano();}],
			js: [function() {return rev();}, function() {return uglify();}]
		}))
		.pipe(gulp.dest("./dist"));
});

// run: gulp build
gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'usemin']);