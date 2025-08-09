<template>
    <div class="container">
        <div class="form mt-5">

            <form @submit.prevent="login">
                <div class="header ">
                    <LogoComponent />
                    <p class="text-center fs-5 fw-bold mt-3 mb-5">{{ $t('label.login_now') }}</p>
                </div>
                <div class="mb-3 position-relative">
                    <label for="email" class="form-label">{{ $t('label.email') }}</label>
                    <div class=" position-relative group">

                        <input type="email" id="email" class="form-control rounded-0" v-model="form.email"
                            placeholder="yassin2029@gmail.com" />
                        <i class="bi bi-envelope"></i>
                    </div>

                </div>

                <div class="mb-3 mt-4 position-relative">
                    <label for="password" class="form-label">{{ $t('label.password') }}</label>
                    <div class=" position-relative group">

                        <input type="password" id="password" class="form-control rounded-0" v-model="form.password"
                            placeholder="******" />
                        <i class="bi bi-lock"></i>
                    </div>
                </div>
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <div class="form-check ">
                        <input type="checkbox" class="form-check-input rounded-circle" id="remember"
                            v-model="form.remember" />
                        <label class="form-check-label" for="remember">{{ $t('label.rememberMe') }}</label>
                    </div>
                    <router-link :to="{ name: 'auth.forget-password' }" class="small d-block  forget-password">{{ $t('label.forgetYourPassword')}}</router-link>
                </div>

                <button class="btn btn-main w-100 rounded-0">{{ $t('label.login') }}</button>
                <div class="or_cont position-relative">
                    <div class="text-center my-3 or">{{ $t('label.or') }}</div>
                    <div class='border border-solid or-border'></div>
                </div>

                <div class="d-flex justify-content-around gap-3 mt-3">
                    <img src="@/assets/icons/socials/facebook.png" alt="Facebook" width="30"
                        style="cursor: pointer" />
                    <img src="@/assets/icons/socials/google.png" alt="Google" width="30"
                        style="cursor: pointer" />
                    <img src="@/assets/icons/socials/apple.png" alt="Apple" width="30" style="cursor: pointer" />
                </div>
                
            </form>
            <div class="d-flex align-items-center justify-content-center mt-5">
                <p class="mb-0">{{ $t('label.not_have_account') }}</p>
                <router-link :to="{ name: 'auth.register' }" class="text-decoration-none sign-up-action">{{ $t('label.register') }}</router-link>
            </div>
        </div>
    </div>
</template>

<script>

import LogoComponent from '../components/LogoComponent.vue';
export default {
    name: "LoginComponent",
    components: { LogoComponent },
    data() {
        return {
            form: {
                email: null,
                password: null,
                remember: false,
            },
        };
    },
    methods: {
        login: function () {
            alert("done");
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
</style>
