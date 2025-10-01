import { createRouter, createWebHistory } from "vue-router";

// استيراد الروترات المنفصلة
import auth from "./routes/auth";
import dashboard from "./routes/dashboard";
import _new from "./routes/new";
import sales from "./routes/sales";
import purchases from "./routes/purchases";
import reciptesAndPayments from "./routes/reciptesAndPayments";
import projects from "./routes/projects";
import cheque from "./routes/cheque";
import accounting from "./routes/accounting";
import employees from "./routes/employees";
import warehouses from "./routes/warehouses";
import taxes from "./routes/taxes";
import reports from "./routes/reports";
import tools from "./routes/tools";
import levelsRoutes from "./routes/levels"; // المسار الجديد
import sourcesRoutes from "./routes/sources"; // المسار الجديد
import documentsRoutes from "./routes/documents";

// مكونات Layout و Home
import HomeComponent from "@/components/front/home/HomeComponent.vue";
import AdminComponent from "@/components/layouts/admin/AdminComponent.vue";

// Base Routes (public)
const baseRoutes = [
  { path: "/", name: "home", component: HomeComponent },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  // 404 Not Found
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/NotFoundView.vue"),
  },
];

// Admin Routes
const adminRoutes = [
  ...dashboard,
  ..._new,
  ...sales,
  ...purchases,
  ...reciptesAndPayments,
  ...projects,
  ...cheque,
  ...accounting,
  ...employees,
  ...warehouses,
  ...taxes,
  ...reports,
  ...tools,
  ...levelsRoutes, // <-- أضفنا مسارات المراحل
  ...sourcesRoutes,
  ...documentsRoutes
];

// Admin Layout Routes
const adminRoutesFinal = [
  {
    path: "/admin",
    component: AdminComponent,
    children: adminRoutes,
  },
];

// دمج كل الروترات
const routes = baseRoutes.concat(auth, adminRoutesFinal);

// إنشاء الـ Router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Authentication middleware (يمكن تعديلها حسب مشروعك)
const requireAuth = (to, from, next) => {
  // const authStatus = localStorage.getItem('authStatus') === 'true';
  // const authToken = localStorage.getItem('authToken');

  // // Check if the route is an admin route
  // const isAdminRoute = to.path.startsWith('/admin');

  // if (isAdminRoute && (!authStatus || !authToken)) {
  //   // Redirect to login if accessing admin routes without proper auth
  //   return next({ name: "auth.login" });
  // }

  // // If user is authenticated and trying to access login/register, redirect to admin dashboard
  // if (authStatus && authToken && (to.name === "auth.login" || to.name === "auth.register")) {
  //   return next({ name: "admin.dashboard" });
  // }
  next();
};

router.beforeEach((to, from, next) => {
  const step = localStorage.getItem("resetStep");

  if (to.name === "auth.password-reset" && step !== "otp_verified") {
    return next({ name: "auth.forget-password" });
  }

  if (to.name === "auth.reset-password-success" && step !== "password_reset") {
    return next({ name: "auth.forget-password" });
  }

  requireAuth(to, from, next);
});

export default router;
