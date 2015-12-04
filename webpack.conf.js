import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const PATHS = {
  SRC: path.resolve(__dirname, 'src'),
  DEMO: path.resolve(__dirname, 'demo'),
  DIST: path.resolve(__dirname, 'dist'),
  NODE_MODULES: path.resolve(__dirname, 'node_modules'),
  PUBLIC: '/'
};
const WEBPACK_HOST = process.env.HOST || 'localhost'
const WEBPACK_PORT = process.env.PORT || 3003;

let AUTOPREFIXER_CONF = [
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
      loader: `style!css?importLoaders=2!autoprefixer?${AUTOPREFIXER_CONF}!sass`
    }]
  },
  devtool: 'sourcemap',
  externals: externals,
};

let demo = {
  entry: {
    demo: [
      'webpack-dev-server/client?http://' + WEBPACK_HOST + ':' + WEBPACK_PORT,
      'webpack/hot/only-dev-server',
      './demo/index.js'
    ]
  },
  resolve: resolve,
  output: {
    path: PATHS.DIST,
    filename: 'index.js',
    publicPath: PATHS.PUBLIC,
    sourceMapFilename: 'index.map.json',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', `babel`],
      include: [PATHS.SRC, PATHS.DEMO]
    }, {
      test: /\.(css|scss)$/,
      loader: `style!css?importLoaders=2!autoprefixer?${AUTOPREFIXER_CONF}!sass`
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      hash: true,
      template: './demo/index.html',
      title: 'Demo',
      filename: 'index.html'
    })
  ]
}


const devServerConf = {
  contentBase: PATHS.DIST,
  publicPath: '/',
  historyApiFallback: true,
  hot: true,
  stats: {
    colors: true
  }
};

export default {
  build,
  demo,
  devServerConf,
  WEBPACK_HOST,
  WEBPACK_PORT
}
