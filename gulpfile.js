const gulp = require('gulp');
const sass = require('gulp-sass');
const sync = require('browser-sync');

const prefixer = require('gulp-autoprefixer');

/* Configs */
const themePath = 'example';

/* Tasks */
const sassLib = () => (
  gulp
    .src('src/soft-lib/assets/sass/**/**.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefixer('Last 50 versions'))
    .pipe(gulp.dest('src/soft-lib/assets/css/'))
    .pipe(sync.stream())
);

const sassTheme = () => (
  gulp
    .src('src/soft-theme/' + themePath + '/assets/sass/**/**.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefixer('Last 50 versions'))
    .pipe(gulp.dest('src/soft-theme/' + themePath + '/assets/css/'))
    .pipe(sync.stream())
);

const sassWatch = () => {
  gulp.watch('src/soft-lib/assets/sass/**/**.sass', sassLib);
  gulp.watch('src/soft-theme/' + themePath + '/assets/sass/**/**.sass', sassTheme);
};

const browserSync = () => {
  sync.init({
    server: { baseDir: './src/' },
    ghostMode: false
  });
};

/* Tasks Declaration */
gulp.task('sass-lib', sassLib);
gulp.task('sass-theme', sassTheme);
gulp.task('sass-watch', sassWatch);
gulp.task('browser-sync', browserSync);
gulp.task('soft', gulp.series('sass-lib', 'sass-theme', gulp.parallel('browser-sync', 'sass-watch')));