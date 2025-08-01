import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue3 from 'bootstrap-vue-3';
import i18n from './i18n';
import 'bootstrap-icons/font/bootstrap-icons.css';

async function bootstrapApp() {
  const lang = localStorage.getItem('locale') || 'en';
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;

  if (lang === 'ar') {
    await import('bootstrap/dist/css/bootstrap.rtl.css');
    await import('../public/css/main.css');
    await import('../public/css/rtl.css');
  } else {
    await import('bootstrap/dist/css/bootstrap.min.css');
    await import('../public/css/main.css');
  }

  createApp(App)
    .use(BootstrapVue3)
    .use(i18n)
    .use(store)
    .use(router)
    .mount("#app");
}

bootstrapApp();
