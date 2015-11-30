var gulp = require('gulp')
var babel = require('gulp-babel')
// var standard = require('gulp-standard')

gulp.task('default', function () {
  return gulp.src('src/index.js')
    // .pipe(standard())
    // .pipe(standard.reporter('default', {breakOnError: true}))
    .pipe(babel())
    .pipe(gulp.dest('lib/'))
})
