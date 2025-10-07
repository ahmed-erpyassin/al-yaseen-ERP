<template>
    <div class="container">
        <div class="form mt-5">

            <form @submit.prevent="register">
                <div class="header ">
                    <LogoComponent />
                    <p class="text-center fs-5 fw-bold mt-3 mb-5">{{ $t('label.register') }}</p>
                </div>
                <div class="alert alert-danger" v-if="errorMsg">{{ errorMsg }}</div>

                <div class="row mb-3">
                    <div class="col-md-6">
                        <div class="mb-3 position-relative">
                            <label for="first_name" class="form-label">{{ $t('label.first_name') }}</label>
                            <div class=" position-relative group">

                                <input type="text" id="first_name" class="form-control rounded-0"
                                    v-model="form.first_name" />
                                <i class="bi bi-person"></i>
                            </div>
                            <p class="form-text text-danger" v-if="errors.first_name">{{ errors.first_name[0] }}</p>

                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3 position-relative">
                            <label for="second_name" class="form-label">{{ $t('label.second_name') }}</label>
                            <div class=" position-relative group">

                                <input type="text" id="second_name" class="form-control rounded-0"
                                    v-model="form.second_name" />
                            </div>
                            <p class="form-text text-danger" v-if="errors.second_name">{{ errors.second_name[0] }}</p>

                        </div>
                    </div>
                </div>
                <div class="mb-3 position-relative">
                    <label for="email" class="form-label">{{ $t('label.email') }}</label>
                    <div class=" position-relative group">

                        <input type="email" id="email" class="form-control rounded-0" v-model="form.email"
                            placeholder="yassin2029@gmail.com" />
                        <i class="bi bi-envelope"></i>
                    </div>

                    <p class="form-text text-danger" v-if="errors.email">{{ errors.email[0] }}</p>

                </div>
                <div class="mb-3 mt-4 position-relative ">
                    <label for="phone" class="form-label">{{ $t('label.phone_number') }}</label>
                    <div class=" position-relative group">

                        <input type="tel" id="phone" class="form-control rounded-0 w-100" v-model="form.phone" />
                    </div>
                    <p class="form-text text-danger" v-if="errors.phone">{{ errors.phone[0] }}</p>
                    <p class="form-text text-danger" v-if="errors.phone_country_code">{{ errors.phone_country_code[0] }}
                    </p>

                </div>
                <div class="form-check ">
                    <input type="checkbox" checked class="form-check-input rounded-circle" id="allows_emails"
                        v-model="form.allows_emails" />
                    <label class="form-check-label" for="allows_emails">{{ $t('label.messages_push') }}</label>
                </div>
                <div class="mb-3 mt-4 position-relative">
                    <label for="password" class="form-label">{{ $t('label.password') }}</label>
                    <div class=" position-relative group">

                        <input type="password" id="password" class="form-control rounded-0" v-model="form.password"
                            placeholder="******" />
                        <i class="bi bi-lock"></i>
                    </div>
                    <p class="form-text text-danger" v-if="errors.password">{{ errors.password[0] }}</p>

                </div>
                <div class="mb-3 mt-4 position-relative">
                    <label for="password_confirmtion" class="form-label">{{ $t('label.password_confirmtion')
                        }}</label>
                    <div class=" position-relative group">

                        <input type="password" id="password_confirmtion" class="form-control rounded-0"
                            placeholder="******" v-model="form.password_confirmation" />
                        <i class="bi bi-lock"></i>
                    </div>
                    <p class="form-text text-danger" v-if="errors.password_confirmation">{{
                        errors.password_confirmation[0] }}</p>

                </div>
                <p class="mb-3 form-text">{{ $t('label.password_text') }}</p>
                <button class="btn btn-main w-100 rounded-0">{{ $t('label.register') }}</button>
                <div class="or_cont position-relative">
                    <div class="text-center my-3 or">{{ $t('label.or') }}</div>
                    <div class='border border-solid or-border'></div>
                </div>

                <div class="d-flex justify-content-around gap-3 mt-3 mb-5">
                    <img src="@/assets/icons/socials/facebook.png" alt="Facebook" width="30" style="cursor: pointer" />
                    <img src="@/assets/icons/socials/google.png" alt="Google" width="30" style="cursor: pointer" />
                    <img src="@/assets/icons/socials/apple.png" alt="Apple" width="30" style="cursor: pointer" />
                </div>

            </form>
        </div>
    </div>
</template>

<script>
import LogoComponent from '../components/LogoComponent.vue';
import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: "RegisterComponent",
    components: { LogoComponent },

    data() {
        return {
            form: {
                first_name: "",
                second_name: "",
                email: "",
                phone: "",
                phone_country_code: "",
                allows_emails: false,
                password: "",
                password_confirmation: "",
            },
            iti: null,
            errors: [],
            errorMsg: null,
            isLoading: false,
        };
    },

    mounted() {
        const input = document.querySelector("#phone");
        this.iti = intlTelInput(input, {
            initialCountry: "PS",
            loadUtils: () => import("../../../../node_modules/intl-tel-input/build/js/utils"),
            containerClass: "w-100",
        });
        this.form.phone_country_code = this.iti.getSelectedCountryData().dialCode;

        input.addEventListener("countrychange", () => {
            this.form.phone_country_code = this.iti.getSelectedCountryData().dialCode;
        });
    },

    methods: {
        async register() {
            this.isLoading = true;
            this.errors = [];
            this.errorMsg = null;

            try {
                // 1️⃣ إرسال بيانات التسجيل
                const registerData = new FormData();
                registerData.append("first_name", this.form.first_name);
                registerData.append("second_name", this.form.second_name);
                registerData.append("email", this.form.email);
                registerData.append("phone", this.form.phone);
                registerData.append("phone_country_code", "+" + this.form.phone_country_code);
                registerData.append("password", this.form.password);
                registerData.append("password_confirmation", this.form.password_confirmation);

                const res = await axios.post(
                    "https://alyaseenerp.com/api/v1/auth/register?lang=ar",
                    registerData,
                    { headers: { Accept: "application/json" } }
                );

                if (res.data?.success) {
                    Swal.fire({
                        icon: "success",
                        title: "تم إنشاء الحساب بنجاح 🎉",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    // ✅ تجاوز التحقق من البريد (تجريبي)
                    // نحفظ توكن مؤقت محليًا لتجاوز شرط تسجيل الدخول
                    localStorage.setItem("authToken", "temp_dev_token");

                    // 🟢 تحويل المستخدم مباشرة لصفحة تسجيل الشركة
                    setTimeout(() => {
                        this.$router.push({ name: "auth.create-company", query: { registered: true } });
                    }, 1500);

                } else {
                    Swal.fire("تنبيه", res.data.message || "حدث خطأ أثناء التسجيل", "warning");
                }

            } catch (err) {
                if (err.response && err.response.status === 422) {
                    this.errors = err.response.data.errors;
                    this.errorMsg = "يرجى تصحيح الأخطاء الموضحة أدناه.";
                } else {
                    this.errorMsg = "حدث خطأ غير متوقع، حاول مرة أخرى.";
                }
            } finally {
                this.isLoading = false;
            }
        },


        // 🔐 تسجيل الدخول التلقائي
        async autoLogin() {
            try {
                const loginData = new FormData();
                loginData.append("email", this.form.email);
                loginData.append("password", this.form.password);

                const loginRes = await axios.post(
                    "https://alyaseenerp.com/api/v1/auth/login?lang=ar",
                    loginData,
                    { headers: { Accept: "application/json" } }
                );

                const token = loginRes.data?.data?.access_token;

                if (token) {
                    // 🟢 حفظ التوكن وتوجيه المستخدم لتسجيل الشركة
                    localStorage.setItem("authToken", token);
                    this.$router.push({ name: "auth.create-company", query: { registered: true } });
                } else {
                    Swal.fire("تنبيه", "تم التسجيل ولكن لم يتم تسجيل الدخول تلقائيًا.", "info");
                }

            } catch (error) {
                console.error("❌ فشل تسجيل الدخول التلقائي:", error);
                Swal.fire("خطأ", "تم إنشاء الحساب لكن واجهنا مشكلة في تسجيل الدخول التلقائي.", "error");
                this.$router.push({ name: "auth.login" });
            }
        },
    },
};
</script>



<style scoped>
.form {

    max-width: 500px;
    margin: auto;

}

.form label,
.form input,
.form i {
    color: #767171;
}

.forget-password {
    color: #FF1500E5;
    text-decoration: none;
}

.or {
    position: relative;
    width: fit-content;
    margin: auto;
    background-color: #FFF;
    padding: 0 10px;
    z-index: 2;
}

.or-border {
    position: absolute;
    top: 50%;
    height: 1px;
    width: 100%;
    border: 1px solid #ACB7CA !important;
}

.sign-up-action {
    color: #1D7342;
}

/* .iti {
    --iti-path-flags-1x: url('path/to/flags.webp');
    --iti-path-flags-2x: url('path/to/flags@2x.webp');
    --iti-path-globe-1x: url('path/to/globe.webp');
    --iti-path-globe-2x: url('path/to/globe@2x.webp');
} */
</style>