import { createApp } from "vue";
import "./assets/index.css";
import App from "./App.vue";
import { createPinia } from "pinia";

import http from "./utils/request.js";
//routes
import router from './router/index'

const app = createApp(App);
const pinia = createPinia();


app.use(http);
app.use(router)
app.use(pinia);
app.mount("#app");
