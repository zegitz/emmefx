var gulp = require('gulp');
var order = require("gulp-order");
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var inject = require('gulp-inject');
var del = require('del');
var scripts = require('./scripts');
var styles = require('./styles');
var fonts = require('./fonts');

gulp.task('jscopy', function () {
    gulp.src(scripts)
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js-dev', function () {
	return gulp.src([
        './srcnew/js/lotter-dev.config.js'
    ])
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js-dev2', function () {
	return gulp.src("./srcnew/js/*.js")
		.pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js-prod', function () {
    gulp.src(scripts.concat(['./src/js/lotter-prod.config.js']))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("start-dev", ["clean","images","css-dev","jscopy","js-dev","html","languages","fonts","htaccess"], function () {
    gulp.watch(["./src/app-assets/images/**/*.+(png|PNG|jpg|gif|svg|ico)"], ["images"]);
    gulp.watch(["./src/app-assets/css/**/*.css"], ["css-dev"]);
	 gulp.watch(["./src/app-assets/js/**/*.js"], ["jscopy"]);
    gulp.watch(["./src/js/**/*.js"], ["jscopy"]);
    gulp.watch(["./src/views/**/*.html"], ["html"]);
    return gulp.start(["inject", "browser-sync"]);
});

gulp.task("start-dev2", ["clean","images","css-dev","jscopy","js-dev2","html","languages","fonts","htaccess"], function () {
    gulp.watch(["./srcnew/images/**/*.+(png|PNG|jpg|gif|svg|ico)"], ["images"]);
    gulp.watch(["./srcnew/css/**/*.css"], ["css-dev"]);
	gulp.watch(["./srcnew/js/**/*.js"], ["js-dev2"]);
    gulp.watch(["./srcnew/views/**/*.html"], ["html"]);
    return gulp.start(["inject", "browser-sync"]);
});

// Inject js and css files into index.html
gulp.task('inject', function () {
    var injectSrc = gulp.src(['./dist/js/**/*.js'], { read: true });

    return gulp.src('./srcnew/index.html')
        .pipe(inject(injectSrc, { ignorePath: '/dist' }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('images', function () {
    return gulp.src([
        './srcnew/images/**/*.+(png|PNG|jpg|gif|svg|ico)',
    ])
      //  .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('css-dev', function () {
    gulp.src(styles)
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('css', function () {
    gulp.src(styles)
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('languages', function () {
    return gulp.src([
        './src/languages/*.json'
    ])
        .pipe(gulp.dest('dist/languages'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html', function () {
    gulp.src('./srcnew/views/**/*.html')
        .pipe(gulp.dest('./dist/views'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('fonts', function () {
    return gulp.src([
	'./srcnew/fonts/**/*.+(eot|ttf|woff|woff2)'	
    ])
        .pipe(gulp.dest('dist/fonts'));

    // added to extract fonts from node_modules because some css need these fonts 
    gulp.src(fonts)
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('htaccess', function () {
    return gulp.src(['.htaccess'])
        .pipe(gulp.dest('dist'));
});

gulp.task('browser-sync', function () {
    browserSync.init(null, {
        open: false,
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task("start", ["clean", "images", "css", "js", "html", "languages", "fonts"], function() {
  gulp.watch(["./src/images/**/*.+(png|PNG|jpg|gif|svg|ico)"], ["images"]);
  gulp.watch(["./src/css/**/*.css"], ["css"]);
  gulp.watch(["./src/js/**/*.js"], ["js"]);
  gulp.watch(["./src/views/**/*.html"], ["html"])
  return gulp.start(["inject", "browser-sync"]);
});


gulp.task("build-devel", ["images", "css-dev", "js", "html", "languages", "fonts"], function () {
    return gulp.start(["inject"]);
});

gulp.task('build-dev', function () {
    gulp.start(['images', 'css-dev', 'jscopy', 'html', 'languages', 'fonts', 'htaccess']);
});

gulp.task('build', ['images', 'css', 'js-prod', 'html', 'languages', 'fonts', 'htaccess'], function () {
    return gulp.start(['inject']);
});

gulp.task('build-dev', ['images', 'css-dev', 'js', 'html', 'languages', 'fonts','htaccess'], function () {
    return gulp.start(['inject']);
});

gulp.task('clean', function () {
    return del.sync('dist');
});

