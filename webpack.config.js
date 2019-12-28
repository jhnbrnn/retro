const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  resolve: { extensions: ['.ts', '.js', '.tsx', '.svg', '.css'] },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ["svg-url-loader"],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public'),
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    })
  ],
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, 'src'),
    hot: true,
    port: 9000,
    watchContentBase: true,
  }
};
