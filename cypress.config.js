import { defineConfig } from "cypress";
import viteConfig from './vite.config.js'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: viteConfig,
    },
  },
});
