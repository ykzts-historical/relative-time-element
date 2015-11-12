import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import { name } from './package';

gulp.task('build', ['build:npm', 'build:browser']);

gulp.task('build:npm', () =>
  gulp.src(`${__dirname}/src/${name}.js`)
    .pipe(babel())
    .pipe(gulp.dest(`${__dirname}/lib`))
);

gulp.task('build:browser', () =>
  browserify({
    entries: [`${__dirname}/src/${name}.js`]
  })
    .transform(babelify)
    .bundle()
    .pipe(source(`${name}.js`))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(`${__dirname}`))
);
