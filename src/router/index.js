import { createRouter, createWebHistory } from "vue-router";
import auth from "./routes/auth";
import HomeComponent from "@/components/front/home/HomeComponent.vue";
import dashboard from "./routes/dashboard";
import AdminComponent from "@/components/layouts/admin/AdminComponent.vue";
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
// Base Routes (public)
const baseRoutes = [
  {
    path: "/",
    name: "home",
    component: HomeComponent,
  },
  {
    path: "/about",
    name: "about",
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  // 404 Not Found Route - must be last
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import(/* webpackChunkName: "not-found" */ "../views/NotFoundView.vue"),
  },
];

// Admin Routes with Layout
const adminRoutes = [...dashboard, ..._new, ...sales, ...purchases, ...reciptesAndPayments, ...projects, ...cheque, ...accounting, ...employees, ...warehouses, ...taxes, ...reports, ...tools];

const adminRoutesFinal = [
  {
    path: "/admin",
    component: AdminComponent,
    children: adminRoutes,
  }
];

// Final Routes Array
const routes = baseRoutes.concat(
  auth,
  adminRoutesFinal
);

// Router Instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// Authentication middleware function
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

  // Handle password reset flow
  if (to.name === "auth.otp" && step !== "email_sent") {
    return next({ name: "auth.forget-password" });
  }

  if (to.name === "auth.password-reset" && step !== "otp_verified") {
    return next({ name: "auth.forget-password" });
  }

  if (to.name === "auth.reset-password-success" && step !== "password_reset") {
    return next({ name: "auth.forget-password" });
  }

  // Apply authentication middleware
  requireAuth(to, from, next);
});
export default router;
