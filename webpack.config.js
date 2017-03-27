const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashBoardPlugin = require('webpack-dashboard/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const precss       = require('precss');
const autoprefixer = require('autoprefixer');

const HOST = (process.env.HOST || 'localhost');
const PORT = (process.env.PORT || '3000');

const env = process.env.NODE_ENV || 'development'
const __DEV__ = env === 'development'
const __STAGING__ = env === 'staging'
const __TEST__ = env === 'test'
const __PROD__ = env === 'production'
const __BASE__ = '/'

function assetsPath(_path) {
  return path.posix.join('static', _path)
}

const webpackConfig = {
  name: 'client',
  target: 'web',
  // cheap-module-eval-source-map is faster for development
  devtools: process.env.WEBPACK_DEVTOOL || '#cheap-module-eval-source-map',
  context: __dirname,
  entry: {
    app: './src/index.jsx'
  },
  resolve: {
    extensions: ['', '.json', '.js', '.jsx']
  },
  module: {}
}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output =  {
  publicPath: '/',
  path: path.resolve(__dirname, 'dist'),
  // Note:
  // hash only for development mode
  // chunkhash for all mode
  filename: assetsPath('js/[name].[hash].js'),
  chunkFilename: assetsPath('js/[id].[chunkhash].js')
}

// ------------------------------------
// Externals
// ------------------------------------
if (__PROD__) {
  webpackConfig.externals = {
    'moment': 'moment'
  }
}

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env)
  }),
  new ExtractTextPlugin(assetsPath('css/[name].[contenthash].css')),
  new HtmlWebpackPlugin({
    template: 'index.html',
    filename: 'index.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  }),
  // split vendor [js|css] into its own file
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module, count) {
      // any required modules inside node_modules are extracted to vendor
      return (
        module.resource &&
        /\.(js|css)$/.test(module.resource) &&
        module.resource.indexOf(
          path.join(__dirname, 'node_modules')
        ) === 0
      )
    }
  }),
  // extract webpack runtime and module manifest to its own file in order to
  // prevent vendor hash from being updated whenever app bundle is updated
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    chunks: ['vendor']
  })
]

if (!__PROD__) {
  // add hot-reload related code to entry chunks
  Object.keys(webpackConfig.entry).forEach(function(name) {
    webpackConfig.entry[name] = ['react-hot-loader/patch'].concat(webpackConfig.entry[name]);
  })

  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new DashBoardPlugin()
  )
} else /*if(!__TEST__) */{
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
      },
    }),
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'static'),
        to: 'static',
        ignore: ['.*']
      }
    ])
  )
}

// ------------------------------------
// No Parse
// ------------------------------------
webpackConfig.module.noParse = [
  /\.json$/,
]

// ------------------------------------
// Pre-Loaders
// ------------------------------------
if (!__PROD__) {
  webpackConfig.module.preLoaders = [
    { test: /\.jsx?$/, include: path.join(__dirname, 'src'), loader: 'eslint-loader'}
  ]
}

// ------------------------------------
// Loaders
// ------------------------------------
webpackConfig.module.loaders = [
  { test: /\.json$/, loader: 'json-loader' },
  { test: /\.jsx?$/, include: path.resolve(__dirname, 'src'), loader: 'babel-loader' },
  { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
  { test: /\.(sass|scss)$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&camelCase&localIdentName=[path][name]__[local]--[hash:base64:5]!postcss-loader!sass-loader') },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 10000,
      name: assetsPath('img/[name].[hash:7].[ext]')
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 10000,
      name: assetsPath('fonts/[name].[hash:7].[ext]')
    }
  }
];

// ------------------------------------
// PostCSS
// ------------------------------------
webpackConfig.postcss = function() {
  return {
    defaults: [precss, autoprefixer({ browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'] })],
    cleaner: [autoprefixer({ browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'] })]
  }
}

if (!__PROD__) {
  webpackConfig.devServer = {
   // contentBase: './public',
   // do not print bundle build stats
   noInfo: true,
   // enable HMR
   hot: true,
   // embed the webpack-dev-server runtime into the bundle
   inline: true,
   // serve index.html in place of 404 responses to allow HTML5 history
   historyApiFallback: true,
   port: PORT,
   host: HOST
  }
}

module.exports = webpackConfig;