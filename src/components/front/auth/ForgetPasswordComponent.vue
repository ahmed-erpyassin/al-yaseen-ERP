<template>
    <div class="container">
        <div class="form mt-5">

            <form @submit.prevent="forgetPassword">
                <div class="header ">
                    <LogoComponent />
                    <p class="text-center fs-5 fw-bold mt-3 mb-5">{{ $t('label.forgetYourPassword') }}</p>
                </div>
                <div class="alert alert-danger" v-if="errorMsg">{{ errorMsg }}</div>
                <div class="mb-3 position-relative">
                    <label for="email" class="form-label">{{ $t('label.email') }}</label>
                    <div class=" position-relative group">

                        <input type="email" id="email" class="form-control rounded-0" v-model="form.email"
                            placeholder="yassin2029@gmail.com" />
                        <i class="bi bi-envelope"></i>
                    </div>
                    <p class="text-danger form-text" v-if="errors.email">{{ errors.email[0] }}</p>

                </div>
                <button class="btn btn-main w-100 rounded-0">{{ $t('label.send_otp') }}</button>
            </form>
        </div>
    </div>
</template>

<script>

import LogoComponent from '../components/LogoComponent.vue';
export default {
    name: "ForgetPasswordComponent",
    components: { LogoComponent },
    data() {
        return {
            form: {
                email: null,
            },
            errors: [],
            errorMsg: null
        };
    },
    methods: {
        forgetPassword: function () {
            this.errors = [];
            this.errorMsg = null;
            this.$store.dispatch('auth/forgetPassword', this.form).then(res => {
                if (res.data.success) {
                    localStorage.setItem("resetStep", 'email_sent');
                    this.$router.push({
                        name: 'auth.otp',
                        params: { token: res.data.token }
                    });
                } else {
                    alert(res.data.message);
                }
            }).catch(err => {
                if (err.response && err.response.status === 422) {
                    this.errors = err.response.data.errors;
                } else if (err.response && err.response.status === 401) {
                    this.errorMsg = err.response.data.message;
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
