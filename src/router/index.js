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
const adminRoutes = [...dashboard,..._new,...sales, ...purchases, ...reciptesAndPayments, ...projects, ...cheque];

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

export default router;
