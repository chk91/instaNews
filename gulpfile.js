var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    eslint = require('gulp-eslint'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    babel = require('gulp-babel'),
    notify = require('gulp-notify');

// This gulp will notify if there is an error @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
var plumberErrorHandler = {
    errorHandler:notify.onError({
        title:'Gulp',
        message: 'Error: <%= error.message %>'
    })
};

gulp.task('scripts', function(){  //runs a file that we named default
    gulp.src('./js/*.js') // these are the files that work with gulp
        .pipe(plumber(plumberErrorHandler))
        .pipe(babel({presets:['es2015']}))
        .pipe(uglify()) // minify files. compresses files
        .pipe(rename({ extname: '.min.js' })) // changes name of file
        .pipe(gulp.dest('./build/js')) // where the finished task goes
});

// GULP SASS @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

gulp.task('sass', function() {
    gulp.src('./sass/style.scss')
      .pipe(plumber(plumberErrorHandler))
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./build/css'))
      .pipe(cssnano())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./build/css'));
});

// compile ES2015 -> ESS
gulp.task('babel', () => {
    return gulp.src(input)
    .pipe(babel())
    .pipe(gulp.dest(output));
});

// GULP browserSync @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   
gulp.task('serve', function () {
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(["build/css/*.css", "build/js/*.js"]).on("change", browserSync.reload);
});

gulp.task('watch', function(){
    gulp.watch("sass/*.scss", ['sass']);
    gulp.watch("js/*.js", ['scripts','lint']);
});

// ESLINT @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
gulp.task('lint', function (){
 return gulp.src ('./js/*js')
 .pipe(plumber(plumberErrorHandler))
 .pipe(eslint())
 .pipe(eslint.format())
 .pipe(eslint.failAfterError());
})

gulp.task('default', ['serve', 'watch']);