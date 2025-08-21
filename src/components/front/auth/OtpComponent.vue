<template>
    <div class="container">
        <div class="form mt-5">

            <form @submit.prevent="checkOtp">
                <div class="header ">
                    <LogoComponent />
                    <h4 class="text-center fs-5 fw-bold mt-3 ">{{ $t('label.enter_otp') }}</h4>
                    <p class="text-secondary text-center mb-3">{{ $t('label.otp_text') }}</p>
                </div>

                <div class="d-flex justify-content-center gap-3 mb-5">
                    <input v-for="(digit, index) in code" :key="index" type="text" class="form-control code-input"
                        maxlength="1" v-model="code[index]" @input="onInput(index)"
                        @keydown.backspace="onBackspace(index, $event)" @paste="onPaste" ref="inputs" />
                </div>
                <p class="text-danger form-text" v-if="errors.otp">{{ errors.otp[0] }}</p>
                <p class="text-danger form-text" v-if="errorMsg">{{ errorMsg }}</p>
                <button class="btn btn-main w-100 rounded-0">{{ $t('label.verification') }}</button>
                <div class="text-center mt-5">
                    <p class="fw-bold">{{ $t('label.text1') }}</p>
                    <p class="fw-bold">{{ $t('label.text2') }}</p>
                </div>
            </form>

        </div>
    </div>
</template>

<script>

import LogoComponent from '../components/LogoComponent.vue';
export default {
    name: "OtpComponent",
    components: { LogoComponent },
    props: ['token'],
    data() {
        return {
            code: ['', '', '', ''],
            errors: [],
            errorMsg: null
        };
    },
    methods: {
        checkOtp: function () {
            this.errors = [];
            this.errorMsg = null;
            let payload = {
                token: this.token,
                otp: this.getFullCode()
            };
            this.$store.dispatch('auth/checkOtp', payload).then(res => {
                if (res.data.success) {
                    localStorage.setItem("resetStep", 'otp_verified');

                    this.$router.push({
                        name: 'auth.password-reset',
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
        onInput(index) {
            const input = this.code[index];
            // Only digits allowed
            if (!/^\d$/.test(input)) {
                this.code[index] = '';
                return;
            }

            // Move focus to next input
            if (index < this.code.length - 1) {
                this.$refs.inputs[index + 1].focus();
            }
        },
        onBackspace(index) {
            if (this.code[index] === '') {
                if (index > 0) {
                    this.$refs.inputs[index - 1].focus();
                }
            }
        }, onPaste(event) {
            event.preventDefault();
            const paste = event.clipboardData.getData('text');
            const digits = paste.replace(/\D/g, '').slice(0, this.code.length);

            digits.split('').forEach((digit, i) => {
                this.code[i] = digit;
            });

            // Focus the last filled input
            const nextIndex = digits.length < this.code.length ? digits.length : this.code.length - 1;
            this.$nextTick(() => {
                this.$refs.inputs[nextIndex].focus();
            });
        },
        getFullCode() {
            return this.code.join('');
        }
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

.code-input {
    width: 60px;
    height: 60px;
    font-size: 28px;
    text-align: center;
    border: 2px solid #dee2e6;
    border-radius: 8px;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.code-input:focus {
    border-color: #28a745;
    /* Bootstrap green */
    box-shadow: 0 0 5px rgba(40, 167, 69, 0.5);
    outline: none;
}
</style>
