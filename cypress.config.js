import { defineConfig } from "cypress";
import viteConfig from './vite.config.js'

export default defineConfig({
  projectId: "eogrz3",
  viewportHeight:768,
  viewportWidth:1366,
  trashAssetsBeforeRuns:false,
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
