/**
 * @param key
 * @param env
 *
 * 开发环境打包
 * node public/config/webpack key=test
 *
 * 生产环境打包
 * node config/webpack key=test env=production
 *
 */

/**
 * Module
 */
const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const colors = require("colors");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const compose = (...fn) => fn.reduce((a, b) => (...args) => a(b(...args)));
const applyMiddleware = (context, middlewares) => {
  const chain = middlewares.map(item => item(context));
  return compose(...chain);
};

/**
 * 导入设置
 */
const { exec, getParam } = require("./utils/fn");
const config = require("./config");
const optionMiddleware = require("./middleware/option");
const execMiddleware = require("./middleware/output");

/**
 * 环境参数
 */
const getContext = () => {
  const key = getParam("key");
  if (!(key && config.entry[key])) {
    console.log(`KEY匹配错误`.red);
  }
  const env = getParam("env") || "development";
  const value = config.entry[key];
  const isPlain = typeof value !== "string"; //参数是对象格式
  return { env, value, isPlain, config: config };
};

/**
 * 基本配置
 */
const createOption = function(context) {
  const getDir = url => path.join(__dirname, "../", url);
  const { value, env, isPlain } = context;
  const relativePath = isPlain ? value.entry : value;
  const fileName = relativePath.match(/[^\/]+$/);
  const absolutePath = getDir(relativePath);
  const option = {
    mode: env,
    entry: {
      [fileName]: absolutePath
    },
    output: {
      path: path.dirname(absolutePath),
      filename: "[name].bundle.js"
    },
    resolve: {
      extensions: [".js", ".vue"],
      alias: { vue$: "vue/dist/vue.esm" }
    }
  };
  return option;
};

/* 运行 */

(function main() {
  const context = getContext();
  const option = createOption(context);
  const decorateOption = applyMiddleware(context, optionMiddleware)(option);
  const launch = exec(applyMiddleware(context, execMiddleware));
  const package = {
    development() {
      const watchOps = { aggregateTimeout: 300, poll: 1000 };
      webpack(decorateOption).watch(watchOps, launch);
    },
    production() {
      webpack(decorateOption).run(launch);
    }
  };
  package[context.env]();
})();
