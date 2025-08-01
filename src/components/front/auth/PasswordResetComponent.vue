<template>
    <div class="container">
        <div class="form mt-5">

            <form @submit.prevent="login">
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
                </div>
                <button class="btn btn-main w-100 rounded-0">{{ $t('label.verification') }}</button>
            </form>
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
</style>
