import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue3 from 'bootstrap-vue-3';
import i18n from './i18n';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import "vue3-select/dist/vue3-select.css"

function loadStyle(href, id) {
  let link = document.getElementById(id);
  if (link) {
    link.href = href; // تحديث الرابط لو الملف موجود
  } else {
    link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }
}

async function bootstrapApp() {
  const lang = localStorage.getItem("lang") || "en";
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lang;

  // تحميل ملفات bootstrap حسب اللغة
  if (lang === "ar") {
    loadStyle("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css", "bootstrap-css");
    loadStyle("/css/main.css", "main-css");
    loadStyle("/css/rtl.css", "rtl-css");
  } else {
    loadStyle("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css", "bootstrap-css");
    loadStyle("/css/main.css", "main-css");
  }

  // إعداد axios
  axios.defaults.baseURL = "https://api.alyaseenerp.com/public/api";
  axios.defaults.headers.common["Accept"] = "application/json";
  axios.defaults.headers.common["Content-Type"] = "application/json";

  // إنشاء التطبيق
  createApp(App)
    .use(BootstrapVue3)
    .use(i18n)
    .use(store)
    .use(router)
    .mount("#app");
}


bootstrapApp();