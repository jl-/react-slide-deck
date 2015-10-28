import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const PATHS = {
  SRC: path.resolve(__dirname, 'client'),
  DIST: path.resolve(__dirname, 'dist'),
  NODE_MODULES: path.resolve(__dirname, 'node_modules'),
  PUBLIC: '/'
};
const WEBPACK_HOST = process.env.HOST || 'localhost'
const WEBPACK_PORT = process.env.PORT || 3003;

let autoprefixerConf = [
  '{browsers:["last 5 version"]}'
].join('&');

let resolve = {
  extensions: ['', '.js', '.jsx']
}
let externals = {
  'react': {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react',
    umd: 'react'
  },
  'react-dom': {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom',
    umd: 'react-dom'
  }
};

let build = {
  entry: {
    src: './src/deck.js'
  },
  resolve: resolve,
  output: {
    path: PATHS.DIST,
    filename: 'deck.js',
    publicPath: PATHS.PUBLIC,
    sourceMapFilename: 'deck.map.json',
    library: 'ReactDeck',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel'
    }, {
      test: /\.(css|scss)$/,
      loader: `style!css?importLoaders=2!autoprefixer?${autoprefixerConf}!sass`
    }]
  },
  devtool: 'sourcemap',
  externals: externals,
};

let demo = {
  entry: {
    demo: './demo/index.js'
  },
  resolve: resolve,
  output: {
    path: path.resolve(PATHS.DIST, 'demo'),
    filename: 'index.js',
    publicPath: PATHS.PUBLIC,
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel'
    }, {
      test: /\.(css|scss)$/,
      loader: `style!css?importLoaders=2!autoprefixer?${autoprefixerConf}!sass`
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      hash: true,
      template: './demo/index.html',
      title: 'React',
      filename: 'index.html'
    })
  ]
}



export default {
  build,
  demo
}
