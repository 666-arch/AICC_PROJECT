import { defineConfig } from "umi";
const { proxy } = require("./buildConfig.json")

export default defineConfig({
  history: {
    type: "browser",
  },
  deadCode: {},
  dva: {},
  plugins: ["@umijs/plugins/dist/dva"],
  ignoreMomentLocale: false,
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/home",
      component: "Home",
    },
  ],
  outputPath: "./pkg/public",
  hash: true,
  npmClient: "pnpm",
  proxy,
  copy: [
    { from: "./buildConfig.json", to: "./pkg/config/index.json", }
  ]
});
