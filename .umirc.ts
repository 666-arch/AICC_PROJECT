import { defineConfig } from "umi";
const { proxy } = require("./buildConfig.json")

export default defineConfig({
  history: {
    type: "hash",
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
      // routes: [
      //   { path: "/home/ElectricityOverview", component: "../pages/Home/ElectricityOverview"},
      // ], 
    },
  ],
  // outputPath: "./dist/public",
  outputPath: "./pkg/public",
  hash: true,
  npmClient: "pnpm",
  proxy,
  copy: [
    // { from: "./buildConfig.json", to: "./dist/config/index.json", }
    { from: "./buildConfig.json", to: "./pkg/config/index.json", }
  ]
});
