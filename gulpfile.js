'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');

gulp.task('views', () => {
    return gulp.src('views/*.pug')
        .pipe(sourcemaps.init())
        .pipe(pug({
            pretty: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build'))
});

gulp.task('styles', () => {
    return gulp.src([
                'styles/reset.scss',
                'styles/build.scss'
         ])
        .pipe(sourcemaps.init())
        .pipe(sass(
            {outputStyle: 'compressed'}
        ).on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 0.5%, last 4 versions, Firefox ESR, ios_saf 4, Firefox >= 20, ie 6-11, iOS >=7']
        }))
        .pipe(concat('build.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/css'))
});

gulp.task('images', () => {
    return gulp.src('images/**')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('build/img'))
});

gulp.task('watch', () => {
    browserSync.init({
        server: "./build"
    });

    gulp.watch('images/**', gulp.series('images'));
    gulp.watch('styles/**/*.scss', gulp.series('styles'));
    gulp.watch('views/**/*.pug', gulp.series('views'));
});

gulp.task('build', gulp.series(gulp.parallel('images', 'styles', 'views'), 'watch'));
