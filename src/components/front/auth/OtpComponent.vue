<template>
    <LoadingComponent :isLoading="isLoading" />
    <div class="container">
        <div class="form mt-5">

            <form @submit.prevent="checkOtp">
                <div class="header">
                    <LogoComponent />
                    <h4 class="text-center fs-5 fw-bold mt-3">{{ $t('label.enter_otp') }}</h4>
                    <p class="text-secondary text-center mb-3">{{ $t('label.otp_text') }}</p>
                </div>

                <!-- حقل إدخال رقم الهاتف -->
                <div class="mb-3 position-relative">
                    <label for="phone" class="form-label">{{ $t('label.phone_number') }}</label>
                    <input type="tel" id="phone" class="form-control rounded-0" v-model="phone"
                        placeholder="0599916673" />
                </div>

                <!-- حقول الكود -->
                <div class="d-flex justify-content-center gap-3 mb-3">
                    <input v-for="(digit, index) in code" :key="index" type="text" class="form-control code-input"
                        maxlength="1" v-model="code[index]" @input="onInput(index)"
                        @keydown.backspace="onBackspace(index, $event)" @paste="onPaste" ref="inputs" />
                </div>

                <p class="text-danger form-text" v-if="errors.otp && errors.otp.length">{{ errors.otp[0] }}</p>
                <p class="text-danger form-text" v-if="errorMsg">{{ errorMsg }}</p>

                <button class="btn btn-main w-100 rounded-0">{{ $t('label.verification') }}</button>

                <div class="text-center mt-3">
                    <button type="button" class="btn btn-link p-0" @click="resendCode" :disabled="counter > 0">
                        {{ $t('label.resend_code') }}
                        <span v-if="counter > 0">({{ counter }})</span>
                    </button>
                </div>

                <div class="text-center mt-5">
                    <p class="fw-bold">{{ $t('label.text1') }}</p>
                    <p class="fw-bold">{{ $t('label.text2') + formattedTime }}</p>
                </div>
            </form>

        </div>
    </div>
</template>

<script>
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import LogoComponent from '../components/LogoComponent.vue';
import axios from 'axios';

export default {
    name: "OtpComponent",
    components: { LogoComponent, LoadingComponent },
    data() {
        return {
            isLoading: false,
            phone: '',
            code: ['', '', '', ''],
            counter: 0, // يبدأ من 0 ليمكنه إعادة الإرسال مباشرة
            timer: null,
            errors: [],
            errorMsg: null
        };
    },
    computed: {
        formattedTime() {
            let minutes = String(Math.floor(this.counter / 60)).padStart(2, "0");
            let seconds = String(this.counter % 60).padStart(2, "0");
            return `${minutes}:${seconds}`;
        },
    },
    methods: {
        startCounter(seconds = 5) {
            this.counter = seconds;
            if (this.timer) clearInterval(this.timer);
            this.timer = setInterval(() => {
                if (this.counter > 0) {
                    this.counter--;
                } else {
                    clearInterval(this.timer);
                }
            }, 1000);
        },

        resendCode() {
            if (!this.phone) {
                this.errorMsg = "الرجاء إدخال رقم الهاتف لإرسال الكود";
                return;
            }

            this.isLoading = true;
            this.errorMsg = null;
            axios.post('https://alyaseenerp.com/api/v1/auth/send-otp?lang=ar', { phone: this.phone })
                .then(res => {
                    this.isLoading = false;
                    if (res.data.status === 200) {
                        this.startCounter(5); // عداد 5 ثواني
                        alert("تم إرسال الكود مرة أخرى ✅");
                    } else {
                        this.errorMsg = res.data.message || "فشل إرسال الكود";
                    }
                })
                .catch(err => {
                    this.isLoading = false;
                    this.errorMsg = err.response?.data?.message || "حدث خطأ أثناء إرسال الكود";
                });
        },

        checkOtp() {
            this.errors = [];
            this.errorMsg = null;
            this.isLoading = true;

            if (!this.phone) {
                this.isLoading = false;
                this.errorMsg = "الرجاء إدخال رقم الهاتف";
                return;
            }

            const payload = { phone: this.phone, otp: this.getFullCode() };
            axios.post('https://alyaseenerp.com/api/v1/auth/verify-otp?lang=ar', payload)
                .then(res => {
                    this.isLoading = false;

                    console.log(res.data, res.status);

                    if (res.status === 200) {
                        this.$router.push({
                            name: "auth.login",
                            query: { registered: false }
                        });
                    } else {
                        this.errorMsg = res.data.message || "فشل التحقق من OTP";
                    }
                })
                .catch(err => {
                    this.isLoading = false;
                    if (err.response?.status === 422) {
                        this.errors = err.response.data.errors || {};
                        this.errorMsg = err.response.data.message || null;
                    } else if (err.response?.status === 401) {
                        this.errorMsg = err.response.data.message;
                    } else {
                        this.errorMsg = "حدث خطأ ما";
                    }
                });
        },

        onInput(index) {
            const input = this.code[index];
            if (!/^\d$/.test(input)) this.code[index] = '';
            if (index < this.code.length - 1) this.$refs.inputs[index + 1].focus();
        },
        onBackspace(index) {
            if (this.code[index] === '' && index > 0) this.$refs.inputs[index - 1].focus();
        },
        onPaste(event) {
            event.preventDefault();
            const digits = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, this.code.length);
            digits.split('').forEach((digit, i) => this.code[i] = digit);
            const nextIndex = digits.length < this.code.length ? digits.length : this.code.length - 1;
            this.$nextTick(() => this.$refs.inputs[nextIndex].focus());
        },
        getFullCode() {
            return this.code.join('');
        }
    },
    mounted() {
        this.startCounter(5);
    },
    beforeUnmount() {
        if (this.timer) clearInterval(this.timer);
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
    box-shadow: 0 0 5px rgba(40, 167, 69, 0.5);
    outline: none;
}
</style>
