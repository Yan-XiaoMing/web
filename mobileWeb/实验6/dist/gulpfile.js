var gulp = require('gulp'),
    minifyCss = require('gulp-minify-css'),
    uglify  = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat')
    htmlmin = require('gulp-htmlmin');

gulp.task('minifyCss',function(){
    return gulp.src('sys/css/*.css')
        .pipe(rename({suffix:'.min'}))
        .pipe(minifyCss())      
        .pipe(gulp.dest('dist/sys/css'));
});

gulp.task('minifyJs',function(){
    return gulp.src('sys/js/*.js')
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/sys/js'));
});

gulp.task('minfyJsrender',function(){
    return gulp.src('lib/jsrender/*js')
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/lib/jsrender'))
})

gulp.task('minnifyJqueryUi',function(){
    return gulp.src('lib/jquery/jquery-ui.css')
    .pipe(rename({suffix:'.min'}))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/lib/jquery'));
})

gulp.task('minnifyJqueryJs',function(){
    return gulp.src('lib/jquery/*.js')
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/lib/jquery'))
})

gulp.task('minfyHtml',function(){
    return gulp.src('*.html')
        .pipe(rename({suffix:'.min'}))
        .pipe(htmlmin({
            removeComments:true,
            collapseWhitespace:true
        }))
        .pipe(gulp.dest('dist'))
})
