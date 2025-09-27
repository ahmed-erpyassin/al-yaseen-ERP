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
  axios.defaults.baseURL = "https://alyaseenerp.com/api/v1";
  axios.defaults.headers.common["Accept"] = "application/json";
  axios.defaults.headers.common["Content-Type"] = "application/json";

  // إضافة interceptor للتعامل مع الأخطاء
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // التحقق من رسالة "Unauthenticated"
      if (error.response && error.response.data && error.response.data.message === "Unauthenticated.") {
        // مسح بيانات المصادقة من localStorage
        localStorage.removeItem('authStatus');
        localStorage.removeItem('authToken');
        localStorage.removeItem('authBranchId');
        
        // إعادة توجيه إلى صفحة تسجيل الدخول باستخدام Vue Router
        if (window.$router) {
          window.$router.push({ name: 'auth.login' });
        } else {
          // Fallback إذا لم يكن Vue Router متاحاً
          window.location.href = '/auth/login';
        }
      }
      return Promise.reject(error);
    }
  );

  // إنشاء التطبيق
  createApp(App)
    .use(BootstrapVue3)
    .use(i18n)
    .use(store)
    .use(router)
    .mount("#app");

  // جعل router متاحاً عالمياً للـ interceptor
  window.$router = router;
}


bootstrapApp();