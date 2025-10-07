import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue3 from "bootstrap-vue-3";
import i18n from "./i18n";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "vue3-select/dist/vue3-select.css";
import 'vue3-org-chart/dist/style.css'
// import 'vue3-org-chart/dist/vue3-org-chart.css'

// 🧩 وظيفة لتحميل ملفات CSS حسب اللغة
function loadStyle(href, id) {
  let link = document.getElementById(id);
  if (link) {
    link.href = href;
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

  // تحميل Bootstrap حسب اللغة
  if (lang === "ar") {
    loadStyle(
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css",
      "bootstrap-css"
    );
    loadStyle("/css/main.css", "main-css");
    loadStyle("/css/rtl.css", "rtl-css");
  } else {
    loadStyle(
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
      "bootstrap-css"
    );
    loadStyle("/css/main.css", "main-css");
  }

  // إعداد Axios الأساسي
  axios.defaults.baseURL = "https://alyaseenerp.com/api/v1";
  axios.defaults.headers.common["Accept"] = "application/json";
  axios.defaults.headers.common["Content-Type"] = "application/json";

  // 🟢 Interceptor لإضافة التوكن تلقائيًا مع كل طلب
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 🔴 Interceptor لمعالجة الأخطاء مثل Unauthenticated
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.data?.message === "Unauthenticated.") {
        localStorage.removeItem("authStatus");
        localStorage.removeItem("authToken");
        localStorage.removeItem("authBranchId");

        if (window.$router) {
          window.$router.push({ name: "auth.login" });
        } else {
          window.location.href = "/auth/login";
        }
      }
      return Promise.reject(error);
    }
  );

  // إنشاء التطبيق
  const app = createApp(App);
  app.use(BootstrapVue3);
  app.use(i18n);
  app.use(store);
  app.use(router);
  app.mount("#app");

  // جعل router متاحاً عالمياً
  window.$router = router;
}

bootstrapApp();
