import gulp from 'gulp';
import del from 'del';
import path from 'path';
import webpack from 'webpack';

import connect from 'gulp-connect';



import {
  build,
  demo
} from './webpack.conf';

gulp.task('clean', cb => del('dist/*', cb));

gulp.task('build', ['clean'], (cb) => {
  webpack(build, function(err, stats) {
    cb();
  });
});


gulp.task('demo', (cb) => {
  webpack(demo, function(err, stats) {
    cb();
  });
});

gulp.task('conn', () => {
  connect.server({
    root: './dist/demo',
    port: 8888
  })
});

