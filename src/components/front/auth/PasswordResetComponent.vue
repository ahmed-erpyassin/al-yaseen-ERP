<template>
    <LoadingComponent :isLoading="isLoading" />

    <div class="container">
        <div class="form mt-5">

            <form @submit.prevent="ResetPassword">
                <div class="header ">
                    <LogoComponent />
                    <h4 class="text-center fs-5 fw-bold mt-3">{{ $t('label.reset_password') }}</h4>
                    <p class="text-center text-secondary mb-5">{{ $t('label.reset_password_text') }}</p>
                </div>
                <div class="mb-3 mt-4 position-relative">
                    <label for="password" class="form-label">{{ $t('label.password') }}</label>
                    <div class=" position-relative group">

                        <input type="password" id="password" class="form-control rounded-0" v-model="form.password"
                            placeholder="******" />
                        <i class="bi bi-lock"></i>
                    </div>
                    <p class="text-danger form-text" v-if="errors.password">{{ errors.password[0] }}</p>
                    <p class="text-danger form-text" v-if="errorMsg">{{ errorMsg }}</p>
                </div>
                <button class="btn btn-main w-100 rounded-0">{{ $t('label.verification') }}</button>
            </form>
        </div>
    </div>
</template>

<script>

import LogoComponent from '../components/LogoComponent.vue';
import LoadingComponent from '@/components/components/LoadingComponent.vue';

export default {
    name: "PasswordResetComponent",
    components: { LogoComponent, LoadingComponent },
    props: ['token'],
    data() {
        return {
            isLoading: true,
            form: {
                password: null,
            },
            errors: [],
            errorMsg: null
        };
    },
    mounted() {
        this.isLoading = false;
    },
    methods: {
        ResetPassword: function () {
            this.errors = [];
            this.errorMsg = null;
            this.isLoading = true;

            this.$store.dispatch('auth/resetPassword', { password: this.form.password, token: this.token }).then(res => {
                this.isLoading = false;

                if (res.data.success) {
                    localStorage.setItem("resetStep", 'password_reset');

                    this.$router.push({ name: 'auth.reset-password-success' });
                } else {
                    alert(res.data.message);
                }
            }).catch(err => {
                this.isLoading = false;

                if (err.response && err.response.status === 422) {
                    this.errors = err.response.data.errors;
                } else {
                    this.errorMsg = "Something went wrong";

                }
            });
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
</style>
