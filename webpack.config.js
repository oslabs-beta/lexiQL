const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: ['core-js/stable', 'regenerator-runtime/runtime', './client/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: isProd ? 'bundle.[contenthash].js' : '[name].bundle.js',
    chunkFilename: isProd ? '[name].[contenthash].js' : '[name].chunk.js',
    publicPath: '/',
    clean: true,
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    publicPath: '/',
    hot: true,
    port: 8080,
    proxy: {
      '/example-schema': 'http://localhost:3000',
      '/sql-schema': 'http://localhost:3000',
      '/playground': 'http://localhost:3000',
      '/test': 'http://localhost:3000',
      '/test-mock': 'http://localhost:3000',
      '/test-gql': 'http://localhost:3000',
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[contenthash].css' : '[name].css',
      chunkFilename: isProd ? '[id].[contenthash].css' : '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
      inject: 'body',
      minify: isProd
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
          }
        : false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'client/favicon.ico', to: 'favicon.ico' },
        { from: 'server/tableQuery.sql', to: 'tableQuery.sql' },
        {
          from: 'client/assets/example-schema.json',
          to: 'example-schema',
          toType: 'file',
        },
        // Optimized assets available but not auto-copied to avoid path conflicts
      ],
    }),
    ...(process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : []),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    usedExports: true,
    sideEffects: false,
    minimize: isProd,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: '> 0.25%, not dead',
                  modules: false,
                  useBuiltIns: 'usage',
                  corejs: 3,
                },
              ],
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|webp|avif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb
          },
        },
        generator: {
          filename: 'images/[name].[hash][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', 'css'],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
    },
  },
  performance: {
    hints: isProd ? 'warning' : false,
    maxAssetSize: 1000000, // 1MB - more realistic for this app with large GIFs
    maxEntrypointSize: 3000000, // 3MB - account for vendor bundle size
  },
};
