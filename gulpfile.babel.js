import gulp from 'gulp';
import del from 'del';
import run from 'run-sequence';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';



import {
  build,
  demo,
  devServerConf,
  WEBPACK_HOST,
  WEBPACK_PORT
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
  let webpackDevServer = new WebpackDevServer(webpack(demo), devServerConf);
  webpackDevServer.listen(WEBPACK_PORT, WEBPACK_HOST, (err, result) => {
    console.log(err || 'Listening at %s:%s', WEBPACK_HOST, WEBPACK_PORT);
    cb();
  });
});

gulp.task('dev', cb => {
  run('clean', 'statics', 'watch', 'wp:dev');
});
