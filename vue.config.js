const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: [],

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "ar",
      localeDir: "locales",
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
  },

devServer: {
  proxy: {
    "/api": {
      target: "https://dev.alyaseenerp.com",
      changeOrigin: true,
      secure: false,
    },
  },
},

});
