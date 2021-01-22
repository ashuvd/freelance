import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './assets/theme.css';
import dateFilter from "@/filters/date.filter";

const app = createApp(App)
  .use(store)
  .use(router);

app.config.globalProperties.$filters = {date: dateFilter};
app.mount("#app");
