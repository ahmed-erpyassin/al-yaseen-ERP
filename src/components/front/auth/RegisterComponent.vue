<template>
    <div class="container">
        <div class="form mt-5">

            <form @submit.prevent="login">
                <div class="header ">
                    <LogoComponent />
                    <p class="text-center fs-5 fw-bold mt-3 mb-5">{{ $t('label.register') }}</p>
                </div>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <div class="mb-3 position-relative">
                            <label for="first_name" class="form-label">{{ $t('label.first_name') }}</label>
                            <div class=" position-relative group">

                                <input type="text" id="first_name" class="form-control rounded-0" />
                                <i class="bi bi-person"></i>
                            </div>

                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3 position-relative">
                            <label for="second_name" class="form-label">{{ $t('label.second_name') }}</label>
                            <div class=" position-relative group">

                                <input type="text" id="second_name" class="form-control rounded-0" />
                            </div>

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

                </div>
                <div class="mb-3 mt-4 position-relative ">
                    <label for="phone" class="form-label">{{ $t('label.phone_number') }}</label>
                    <div class=" position-relative group">

                        <input type="tel" id="phone" class="form-control rounded-0 w-100" />
                    </div>

                </div>
                <div class="form-check ">
                    <input type="checkbox" checked class="form-check-input rounded-circle" id="remember"/>
                    <label class="form-check-label" for="remember">{{ $t('label.messages_push') }}</label>
                </div>
                <div class="mb-3 mt-4 position-relative">
                    <label for="password" class="form-label">{{ $t('label.password') }}</label>
                    <div class=" position-relative group">

                        <input type="password" id="password" class="form-control rounded-0" v-model="form.password"
                            placeholder="******" />
                        <i class="bi bi-lock"></i>
                    </div>
                </div>
                <div class="mb-3 mt-4 position-relative">
                    <label for="password_confirmtion" class="form-label">{{ $t('label.password_confirmtion')
                        }}</label>
                    <div class=" position-relative group">

                        <input type="password_confirmtion" id="password_confirmtion" class="form-control rounded-0"
                            placeholder="******" />
                        <i class="bi bi-lock"></i>
                    </div>
                </div>
                <p class="mb-3 form-text">{{ $t('label.password_text') }}</p>
                <button class="btn btn-main w-100 rounded-0">{{ $t('label.register') }}</button>
                <div class="or_cont position-relative">
                    <div class="text-center my-3 or">{{ $t('label.or') }}</div>
                    <div class='border border-solid or-border'></div>
                </div>

                <div class="d-flex justify-content-around gap-3 mt-3 mb-5">
                    <img src="@/assets/icons/socials/facebook.png" alt="Facebook" width="30"
                        style="cursor: pointer" />
                    <img src="@/assets/icons/socials/google.png" alt="Google" width="30"
                        style="cursor: pointer" />
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

export default {
    name: "RegisterComponent",
    components: { LogoComponent },
    data() {
        return {
            form: {
                email: null,
                password: null,
                remember: false,
            },
            iti: {},
        };
    },
    mounted() {
        const input = document.querySelector("#phone");
        this.iti = intlTelInput(input, {
            initialCountry: "PS",
            loadUtils: () => import("../../../../node_modules/intl-tel-input/build/js/utils"),
            containerClass: 'w-100',

        });


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

/* .iti {
    --iti-path-flags-1x: url('path/to/flags.webp');
    --iti-path-flags-2x: url('path/to/flags@2x.webp');
    --iti-path-globe-1x: url('path/to/globe.webp');
    --iti-path-globe-2x: url('path/to/globe@2x.webp');
} */
</style>