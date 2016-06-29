import gulp from 'gulp';
import del from 'del';
import run from 'run-sequence';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import {
  PATHS, WEBPACK_HOST, WEBPACK_PORT,
  demo, devServerConf,
  build, githubPagesConf
} from './webpack.conf';

gulp.task('clean', cb => del('dist/*', cb));

gulp.task('statics', () => {
  return gulp.src('statics/**/*')
    .pipe(gulp.dest('dist/statics'));
});

gulp.task('watch', () => {
  gulp.watch('statics/**/*', ['statics']);
});

gulp.task('build', ['clean'], (cb) => {
  webpack(build, function(err, stats) {
    cb();
  });
});

gulp.task('wp:dev', (cb) => {
  const webpackDevServer = new WebpackDevServer(webpack(demo), devServerConf);
  webpackDevServer.listen(WEBPACK_PORT, WEBPACK_HOST, (err, result) => {
    console.log(err || 'Listening at %s:%s', WEBPACK_HOST, WEBPACK_PORT);
    cb();
  });
});

gulp.task('dev', cb => {
  run('statics', 'watch', 'wp:dev');
});

gulp.task('wp:ghp', (cb) => {
  webpack(githubPagesConf, function(err, stats) {
    cb();
  });
});

gulp.task('ghp', cb => {
  run('build', 'wp:ghp');
});
