// gulp, gulp watch - начать слежку за файлами

var
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    cleancss = require('gulp-cleancss'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    less = require('gulp-less'),
    browserSync = require('browser-sync'),
    path = require('path');

gulp.task('less', function () {
    return gulp.src('./src/less/**/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .on("error", notify.onError())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./src/assets/css'))
        .pipe(cleancss({
            level: {
                1: {
                    specialComments: false
                }
            }
        }))
        .pipe(rename({
            suffix: '.min',
            prefix: ''
        }))
        .pipe(gulp.dest('./src/assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', function buildHTML() {
    return gulp.src([
        './src/less/desktop.blocks/**/*.js',
        './src/less/core/**/*.js'
    ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest("./src/assets/js"))
    .pipe(uglify())
    .pipe(rename({
        suffix: '.min',
        prefix: ''
    }))
    .pipe(gulp.dest('./src/assets/js'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('vendor-js', function buildHTML() {
    return gulp.src([
        './src/vendor/jquery/jquery.js',
        './src/vendor/select2-develop/dist/js/select2.full.js',
        './src/vendor/Magnific-Popup-master 2/dist/jquery.magnific-popup.js',
        './src/vendor/jQuery-Mask-Plugin-master 2/dist/jquery.mask.js',
        './src/vendor/slick-1.8.1 3/slick/slick.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest("./src/assets/js"))
    .pipe(uglify())
    .pipe(rename({
        suffix: '.min',
        prefix: ''
    }))
    .pipe(gulp.dest('./src/assets/js'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('vendor-css', function () {
    return gulp.src([
        './src/vendor/normalize.css/normalize.css',
        './src/vendor/slick-1.8.1 3/slick/slick.css',
        './src/vendor/slick-1.8.1 3/slick/slick-theme.css',
        './src/vendor/select2-develop/dist/css/select2.css',
        './src/vendor/Magnific-Popup-master 2/dist/magnific-popup.css',
        './src/vendor/iconmoon/style.css'
    ])
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest("./src/assets/css"))
        .pipe(cleancss({
            level: {
                1: {
                    specialComments: false
                }
            }
        }))
        .pipe(rename({
            suffix: '.min',
            prefix: ''
        }))
        .pipe(gulp.dest("./src/assets/css"));
});

gulp.task('browser-sync', function() {
        browserSync.init({
            proxy: "http://bravebig/"
        });
});

gulp.task('build', function () {
    var renameHtaccess = gulp.src('./src/h.taccess').pipe(concat('.htaccess')).pipe(gulp.dest('./public'));

    var grapFiles = gulp.src([
        './src/*.html'
    ]).pipe(gulp.dest('./public'));

    var grapCss = gulp.src([
        './src/assets/css/vendor.css',
        './src/assets/css/vendor.min.css',
        './src/assets/css/style.css',
        './src/assets/css/style.min.css'
    ]).pipe(gulp.dest('./public/css'));

    var grapJs = gulp.src([
        './src/assets/js/vendor.js',
        './src/assets/js/vendor.min.js',
        './src/assets/js/scripts.js',
        './src/assets/js/scripts.min.js'
    ],
        {
            allowEmpty: true
        }).pipe(gulp.dest('./public/js'));

    var grapFonts = gulp.src('./src/assets/fonts/**/*').pipe(gulp.dest('./public/fonts'));

    var grapImages = gulp.src('./src/assets/img/**/*').pipe(gulp.dest('./public/img'));
});

gulp.task('watch', function() {
    browserSync.init({
        proxy: "http://bravebig/"
    });
    gulp.watch('./src/less/**/*.less', ['less']);
    gulp.watch('./src/less/desktop.blocks/**/*.js', ['js']);
    gulp.watch('./src/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['watch']); 