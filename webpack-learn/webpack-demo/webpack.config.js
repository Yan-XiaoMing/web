const { mode } = require("webpack-nano/argv");
const { merge } = require("webpack-merge");
const parts = require("./webpack.parts");
const { entry } = require("../../webpack/整体配置结构/webpack.config");

const cssLoaders = [parts.tailwind()];

const commonConfig = merge([
  {
    entry: ["./src"],
  },
  parts.page({ title: "Demo" }),
  // parts.loadCSS(),
  // parts.extractCSS(),
  parts.extractCSS({ loaders: cssLoaders }),
]);

const productionConfig = merge([]);

const developmentConfig = merge([
  { entry: ["webpack-plugin-serve/client"] },
  parts.devServer(),
]);

const getConfig = (mode) => {
  switch (mode) {
    case "production":
      return merge(commonConfig, productionConfig, { mode });
    case "development":
      return merge(commonConfig, developmentConfig, { mode });
    default:
      throw new Error("Trying to use an unkonwn mode " + mode);
  }
};

module.exports = getConfig(mode);
