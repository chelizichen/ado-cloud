import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import { createPinia } from "pinia";
import "element-plus/dist/index.css";
import { trim_directive } from "./directive/trim";

const app = createApp(App)
trim_directive(app);

app
  .use(router)
  .use(ElementPlus)
  .use(createPinia())
  .mount("#app");
