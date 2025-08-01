<template>
    <div class="container">
        <div class="form mt-5">

            <form @submit.prevent="login">
                <div class="header ">
                    <LogoComponent />
                    <h4 class="text-center fs-5 fw-bold mt-3">{{ $t('alerts.reset_password_success') }}</h4>
                    <p class="text-center text-secondary mb-5">{{ $t('label.reset_password_success_text') }}</p>
                </div>
                <router-link :to="{ name: 'auth.login' }" class = "btn btn-main w-100 rounded-0">{{ $t('label.login') }}</router-link>
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
