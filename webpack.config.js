const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: "./src/pages/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
  },
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"), // tell the server where to serve content from in dev mode
    compress: true, // this will speed up file loading in development mode
    port: 8080, // will open your site at localhost:8080 (you can use another port)

    open: true, // site will open automatically in the browser after executing npm run dev
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        // add the rule for processing files
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // path to our index.html file
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
