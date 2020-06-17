const gulp = require('gulp');
const sass = require('gulp-sass');
const inlineSource = require('gulp-inline-source');

sass.compiler = require('node-sass');

const path = {
	src: './src/**/*.scss',
	css: './dist/style.css',
	dest: './dist/css'
};

// scss
const scss = () => {
	return gulp.src(path.src).pipe(sass().on('error', sass.logError)).pipe(gulp.dest(path.dest));
};

// scss watch
const watchSCSS = () => {
	gulp.watch(path.src, scss);
};

// css watch
const watchCSS = () => {
	gulp.watch(path.css, inject);
};

// inject
const inject = () => {
	const options = {
		compress: false
	};
	return gulp.src(path.srcHTML).pipe(inlineSource(options)).pipe(gulp.dest(path.dest + '/out'));
};

exports.scss = gulp.series(watchSCSS);
exports.styles = gulp.parallel(watchSCSS, watchCSS);
