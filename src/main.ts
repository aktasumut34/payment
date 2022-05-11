import { createApp } from "vue";
import App from "./App.vue";
import { VueRestrictedInputDirective } from "vue-restricted-input/dist";
import "./index.css";

createApp(App).directive("mask", VueRestrictedInputDirective).mount("#app");
