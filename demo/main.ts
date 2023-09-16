import { createApp } from "vue";
import App from "./App.vue";
import { vMask } from "../src/index";
createApp(App).directive("mask", vMask).mount("#app");
