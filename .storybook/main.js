module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-scss",
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config, { configType }) => {
    // get index of css rule
    const ruleCssIndex = config.module.rules.findIndex(
      (rule) => rule.test.toString() === "/\\.css$/"
    );

    // map over the 'use' array of the css rule and set the 'module' option to true
    config.module.rules[ruleCssIndex].use.map((item) => {
      if (item.loader && item.loader.includes("/css-loader/")) {
        item.options.modules = {
          mode: "local",
          localIdentName:
            configType === "PRODUCTION"
              ? "[local]__[hash:base64:5]"
              : "[name]__[local]__[hash:base64:5]",
        };
      }

      return item;
    });

    return config;
  },
};
