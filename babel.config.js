process.env.EXPO_ROUTER_APP_ROOT = "../../src/app"
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module-resolver", {
        "alias": {
          "utils": "./utils",
          "service": "./service",
          "components": "./components",
          "views": "./views",
          "store": "./store",
          "mock": "./mock",
          "constants": "./constants",
          "hooks": "./hooks",
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
