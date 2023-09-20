module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module-resolver", {
        "alias": {
          "utils": "./src/utils",
          "service": "./src/service",
          "components": "./src/components",
          "views": "./src/views",
          "store": "./src/store",
          "mock": "./src/mock",
          "assets": "./assets"
        },
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
        ]
      }],
    ]
  };
};
