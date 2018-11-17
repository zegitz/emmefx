var gulp = require('gulp');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var inject = require('gulp-inject');
var del = require('del');
var minifyCss = require('gulp-clean-css');
var streamqueue  = require('streamqueue');
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
	 return streamqueue({ objectMode: true },
        gulp.src(scripts.concat(['./src/js/emmefx-dev.config.js']))
	)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js-prod', function () {
    return streamqueue({ objectMode: true },
        gulp.src(scripts.concat(['./src/js/emmefx-prod.config.js']))
	)
        .pipe(concat('main' + Date.now() + '.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task("start-dev", ["clean","images","css-dev","js-dev","html","fonts","htaccess"], function () {
    gulp.watch(["./src/images/**/*.+(png|PNG|jpg|gif|svg|ico)"], ["images"]);
    gulp.watch(["./src/css/**/*.css"], ["css-dev"]);
	gulp.watch(["./src/js/**/*.js"], ["js-dev"]);
    gulp.watch(["./src/views/**/*.html"], ["html"]);
    return gulp.start(["inject", "browser-sync"]);
});

gulp.task("start-prod", ["clean","images","css-prod","js-prod","html","fonts","htaccess"], function () {
    gulp.watch(["./src/images/**/*.+(png|PNG|jpg|gif|svg|ico)"], ["images"]);
    gulp.watch(["./src/css/**/*.css"], ["css-prod"]);
	gulp.watch(["./src/js/**/*.js"], ["js-prod"]);
    gulp.watch(["./src/views/**/*.html"], ["html"]);
    return gulp.start(["inject", "browser-sync"]);
});
 
// Inject js and css files into index.html
gulp.task('inject', function () {
    var injectSrc = gulp.src(['./dist/js/**/*.js', './dist/css/**/*.css'], { read: true });

    return gulp.src('./src/index.html')
        .pipe(inject(injectSrc, { ignorePath: '/dist' }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('images', function () {
    return gulp.src([
        './src/images/**/*.+(png|PNG|jpg|gif|svg|ico)',
    ])
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('css-dev', function () {
	 return streamqueue({ objectMode: true },
        gulp.src(styles)
	)
		.pipe(concat('main' + Date.now() + '.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('css-prod', function () {
    return streamqueue({ objectMode: true },
       gulp.src(styles)
   )
       .pipe(concat('main' + Date.now() + '.css'))
       .pipe(minifyCss())
       .pipe(gulp.dest('./dist/css'))
       .pipe(browserSync.reload({
           stream: true
       }));
});


gulp.task('html', function () {
    gulp.src('./src/views/**/*.html')
        .pipe(gulp.dest('./dist/views'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('fonts', function () {
    return gulp.src([
	'./src/fonts/**/*.+(eot|ttf|woff|woff2)'
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


gulp.task('build-dev', ["clean","images","css-dev","js-dev","html","fonts","htaccess"], function () {
    return gulp.start(['inject']);
});

gulp.task('build-prod', ["clean","images","css-prod","js-prod","html","fonts","htaccess"], function () {
    return gulp.start(['inject']);
});


gulp.task('clean', function () {
    return del.sync('dist');
});

