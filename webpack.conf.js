import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export const WEBPACK_HOST = process.env.HOST || 'localhost'
export const WEBPACK_PORT = process.env.PORT || 3003;
export const PATHS = {
  SRC: path.resolve(__dirname, 'src'),
  DEMO: path.resolve(__dirname, 'demo'),
  UTILS: path.resolve(__dirname, 'utils'),
  DIST: path.resolve(__dirname, 'dist'),
  NODE_MODULES: path.resolve(__dirname, 'node_modules'),
  PUBLIC: '/'
};

const AUTOPREFIXER_CONF = [
  '{browsers:["last 5 version"]}'
].join('&');

const SASS_LOADER_CONF = [
  `includePaths[]=${PATHS.SRC}`
].join('&');

const RESOLVE = {
  extensions: ['', '.js', '.jsx', '.css', '.scss', '.json'],
  modulesDirectories: ['node_modules', 'web_modules'],
  alias: {
    utils: PATHS.UTILS
  }
};

const EXTERNALS = {
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
  },
  'react-addons-transition-group': {
    root: 'ReactTransitionGroup',
    commonjs2: 'react-addons-transition-group',
    commonjs: 'react-addons-transition-group',
    amd: 'react-addons-transition-group',
    umd: 'react-addons-transition-group'
  }
};

const CSS_MODULES_CONF = 'modules&localIdentName=[name]__[local]___[hash:base64:5]';

export const build = {
  entry: {
    src: path.resolve(PATHS.SRC, 'deck.js')
  },
  resolve: RESOLVE,
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
      loader: 'babel',
      include: [PATHS.SRC, PATHS.UTILS]
    }, {
      test: /\.(css|scss)$/,
      loader: `style!css?importLoaders=2&${CSS_MODULES_CONF}!autoprefixer?${AUTOPREFIXER_CONF}!sass`,
      include: [PATHS.SRC]
    }, {
      test: /\.(png|woff|woff2|eot|ttf|svg)(\?t=[0-9]+)?$/,
      loader: `url?limit=100000000`
    }]
  },
  devtool: 'sourcemap',
  externals: EXTERNALS,
};

export const demo = {
  entry: {
    demo: [
      'webpack-dev-server/client?http://' + WEBPACK_HOST + ':' + WEBPACK_PORT,
      'webpack/hot/only-dev-server',
      path.resolve(PATHS.DEMO, 'index.js')
    ]
  },
  resolve: RESOLVE,
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
      include: [PATHS.SRC, PATHS.DEMO, PATHS.DIST, PATHS.UTILS]
    }, {
      test: /\.(css|scss)$/,
      loader: `style!css?importLoaders=2&${CSS_MODULES_CONF}!autoprefixer?${AUTOPREFIXER_CONF}!sass`,
      include: [PATHS.SRC]
    }, {
      test: /\.(css|scss)$/,
      loader: `style!css?importLoaders=2!autoprefixer?${AUTOPREFIXER_CONF}!sass`,
      include: [PATHS.DEMO]
    }, {
      test: /\.(png|woff|woff2|eot|ttf|svg)(\?t=[0-9]+)?$/,
      loader: `url?limit=100000000`,
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),

    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      hash: true,
      template: path.resolve(PATHS.DEMO, 'index.html'),
      title: 'Demo',
      filename: 'index.html'
    })
  ]
}

export const devServerConf = {
  contentBase: PATHS.DIST,
  publicPath: '/',
  historyApiFallback: true,
  hot: true,
  stats: {
    colors: true
  }
};

export const githubPagesConf = {
  entry: {
    ghpages: [
      path.resolve(PATHS.DEMO, 'index.js')
    ]
  },
  resolve: RESOLVE,
  output: {
    path: __dirname,
    filename: 'index.js',
    publicPath: './',
    sourceMapFilename: 'index.map.json',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: [PATHS.SRC, PATHS.DEMO, PATHS.DIST, PATHS.UTILS]
    }, {
      test: /\.(css|scss)$/,
      loader: `style!css?importLoaders=2&${CSS_MODULES_CONF}!autoprefixer?${AUTOPREFIXER_CONF}!sass`,
      include: [PATHS.SRC]
    }, {
      test: /\.(css|scss)$/,
      loader: `style!css?importLoaders=2!autoprefixer?${AUTOPREFIXER_CONF}!sass`,
      include: [PATHS.DEMO]
    }, {
      test: /\.(png|woff|woff2|eot|ttf|svg)(\?t=[0-9]+)?$/,
      loader: `url?limit=100000000`,
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      hash: false,
      template: path.resolve(PATHS.DEMO, 'index.html'),
      title: 'Demo',
      filename: 'index.html'
    })
  ]
};

