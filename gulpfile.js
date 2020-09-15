'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var pipeConcat = require('pipe-concat');

sass.compiler = require('node-sass');

//style paths
var sassFiles = 'assets/sass/*.scss',
    cssDest = './';

gulp.task('styles', function () {
    // return gulp.src(sassFiles)
    //     .pipe(sass().on('error', sass.logError))
    //     .pipe(concat('style.css'))
    //     .pipe(gulp.dest(cssDest));

    var stream = pipeConcat(
        gulp.src(sassFiles)
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('dist'))
    );
    stream.on('end',() => {
        console.log('compile finished!')
    });
    return stream;
});

gulp.task('watch', function () {
    gulp.watch(sassFiles, gulp.series('styles'));
});

// Default Task
gulp.task('default', gulp.parallel('styles','watch'));