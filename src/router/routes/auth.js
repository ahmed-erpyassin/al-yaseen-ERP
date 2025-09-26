import ForgetPasswordComponent from "@/components/front/auth/ForgetPasswordComponent.vue";
import LoginComponent from "@/components/front/auth/LoginComponent.vue";
import OtpComponent from "@/components/front/auth/OtpComponent.vue";
import PasswordResetComponent from "@/components/front/auth/PasswordResetComponent.vue";
import RegisterCompanyComponent from "@/components/front/auth/RegisterCompanyComponent.vue";
import RegisterComponent from "@/components/front/auth/RegisterComponent.vue";
import RestPasswordSuccessComponent from "@/components/front/auth/RestPasswordSuccessComponent.vue";

export default [
  {
    path: "/login",
    component: LoginComponent,
    name: "auth.login",
  }, {
    path: "/register",
    component: RegisterComponent,
    name: "auth.register",
  }, {
    path: "/forget-password",
    component: ForgetPasswordComponent,
    name: "auth.forget-password",
  }, {
    path: "/otp/:token",
    component: OtpComponent,
    name: "auth.otp",
    props: true
  }, {
    path: "/reset-password/:token",
    component: PasswordResetComponent,
    name: "auth.password-reset",
    props: true
  }, {
    path: "/reset-password-success",
    component: RestPasswordSuccessComponent,
    name: "auth.reset-password-success",
  }, {
    path: "/create-company",
    component: RegisterCompanyComponent,
    name: "auth.create-company",
  }
];
