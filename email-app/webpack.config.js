const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const env = process.env.NODE_ENV || "development";

const PATHS = {
  app: path.join(__dirname, "app"),
  build: path.join(__dirname, "build")
};

const config = {
  resolve: {
    modules: [
      path.resolve("app"),
      "node_modules"
    ],
    extensions: [".js", ".css"]
  },

  entry: path.resolve("app", "js/application.js"),

  output: {
    path: path.resolve("build"),
    filename: "js/[name].js"
  },
  
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: "pug-loader",
        options: { pretty: true }
      },

      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader:"babel-loader",
            options: { presets: ["es2015"] }
          }
        ]
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: "file-loader",
        options: { name: "images/[name].[ext]" }
      }
    ]
  },

  devtool: env === "development" ? "eval-source-map" : "",

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(env)
    }),

    new HtmlWebpackPlugin({
      filename: "index.html",
      template: PATHS.app + "/templates/layouts/layout.pug"
    }),

    new webpack.ProvidePlugin({
      $: "jquery",
      JQuery: "jquery"
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: "common"
    }),
  ]
};

if (env === "production") {
  config.module.rules.push({
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      publicPath: "./build",
      fallback: "style-loader",
      use: [
        {
          loader: "css-loader",
          query: {
            modules: true,
            importLoaders: 1
          }
        },
        "postcss-loader"
      ],
    }),
  });

  config.plugins.push(
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: { removeAll: true }}
    }),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: { warnings: false }
    }),

    new ExtractTextPlugin({
      filename: "./css/[name].css",
      allChunks: true
    })
  );
}
else {
  config.module.rules.push({
    test: /\.css$/,
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: { importLoaders: 1 }
      },
      "postcss-loader"
    ]
  });

  // config.plugins.push(
  //   new StyleLintPlugin({
  //     configFile: "./stylelint.config.js"
  //   })
  // );

  config.devServer = {
    stats: "errors-only",
    port: 9000,
    historyApiFallback: true
  };
}

module.exports = config;