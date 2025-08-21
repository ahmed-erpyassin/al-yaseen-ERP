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
];

// Admin Routes with Layout
const adminRoutes = [...dashboard, ..._new, ...sales, ...purchases, ...reciptesAndPayments, ...projects, ...cheque, ...accounting, ...employees, ...warehouses, ...taxes, ...reports];

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
router.beforeEach((to, from, next) => {
  const step = localStorage.getItem("resetStep");

  if (to.name === "auth.otp" && step !== "email_sent") {
    return next({ name: "auth.forget-password" });
  }

  if (to.name === "auth.password-reset" && step !== "otp_verified") {
    return next({ name: "auth.forget-password" });
  }

  if (to.name === "auth.reset-password-success" && step !== "password_reset") {
    return next({ name: "auth.forget-password" });
  }

  next();
});
export default router;
