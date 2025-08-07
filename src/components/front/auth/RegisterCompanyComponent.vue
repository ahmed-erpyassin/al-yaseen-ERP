<template>
    <div class="register-company">
        <header>
            <nav class="navbar navbar-light bg-white py-3 px-4 d-flex justify-content-between align-items-center">
                <div class="container">

                    <NavbarLogoComponent />
                    <div class="d-flex align-items-center gap-3">
                        <LanguageSwitcher class="me-5" />
                        <img src="@/assets/avatar.jpg" alt="User" class="rounded-circle" width="40" height="40" />
                    </div>
                </div>
            </nav>

        </header>
        <div class="content">
            <div class="container">
                <h4 class="mb-5">{{ $t('label.registerCompany') }}</h4>
                <form @submit.prevent="submitForm" class="form">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="item">
                                <div class="mb-3 position-relative">
                                    <label for="company_name" class="form-label">{{ $t('label.company_name')
                                    }}</label>

                                    <input type="text" v-model="form.name" id="company_name" class="form-control rounded-1" />

                                </div>
                            </div>
                            <div class="item">
                                <div class="mb-3 position-relative">
                                    <label for="company_field" class="form-label">{{ $t('label.company_field')
                                    }}</label>
                                    <select name="company_field" v-model="form.company_field" id="company_field" class="form-control rounded-1">

                                        <option value=""></option>
                                        <option value="">Contracting and construction</option>

                                    </select>

                                </div>
                            </div>
                            <div class="item">
                                <div class="mb-3 position-relative">
                                    <label for="company_address" class="form-label">{{
                                        $t('label.company_address')
                                    }}</label>
                                    <input type="text" v-model="form.address" id="company_address" class="form-control rounded-1"
                                        :placeholder="$t('label.company_address_placeholder')" />

                                </div>
                            </div>
                            <div class="item">
                                <div class="mb-3 position-relative">
                                    <label for="email" class="form-label">{{ $t('label.email')
                                    }}</label>
                                    <div class=" position-relative group">
                                        <input type="email" v-model="form.email" id="email" class="form-control rounded-1"
                                            placeholder="yassin2029@gmail.com" />
                                        <i class="bi bi-envelope"></i>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="item">
                                <div class="mb-3 position-relative">
                                    <label for="commerical_registration_number" class="form-label">{{
                                        $t('label.commerical_registration_number')
                                    }}</label>
                                    <div class=" position-relative group">

                                        <input type="text" v-model="form.commercial_registration" id="commerical_registration_number"
                                            class="form-control rounded-1" />
                                    </div>

                                </div>
                            </div>
                            <div class="item">
                                <div class="mb-3 position-relative">
                                    <label for="work_type" class="form-label">{{
                                        $t('label.work_type')
                                    }}</label>
                                    <select name="work_type" id="work_type" class='form-control rounded-1'>

                                        <option value=""></option>
                                        <option value="">Sole proprietorship</option>
                                        <option value="">Solidarity company</option>

                                    </select>

                                </div>
                            </div>
                            <div class="item">
                                <div class="mb-3 position-relative">
                                    <label for="work_type" class="form-label">{{
                                        $t('label.work_type')
                                    }}</label>
                                    <select name="work_type" id="work_type" class='form-control rounded-1'>

                                        <option value=""></option>
                                        <option value="">Sole proprietorship</option>
                                        <option value="">Solidarity company</option>

                                    </select>

                                </div>
                            </div>
                            <div class="item">
                                <div class="mb-3 position-relative">
                                    <label for="contact" class="form-label">{{
                                        $t('label.phone_number')
                                    }}</label>
                                    <label for="phone" class="form-label">{{ $t('label.phone_number') }}</label>
                                    <div class=" position-relative group">

                                        <input type="tel" v-model="form.phone" id="phone" class="form-control rounded-0 w-100" />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="col-12">

                            <div class="form-check mb-3">
                                <input type="checkbox" checked class="form-check-input rounded-circle" id="remember" />
                                <label class="form-check-label" for="remember">{{ $t('label.messages_push')
                                }}</label>
                            </div>
                            <h4 class="mb-5">{{ $t('label.taxHeading') }}</h4>
                        </div>
                        <div class="col-md-6">
                            <div class="item">
                                <div class="mb-3 position-relative">
                                    <label for="income_tax_rate" class="form-label">{{
                                        $t('label.income_tax_rate')
                                        }}</label>

                                    <input type="text" v-model="form.income_tax_rate" id="income_tax_rate" class="form-control rounded-1"
                                        placeholder="20%" />

                                </div>
                            </div>
                            <div class="item">
                                <div class="mb-3 position-relative">
                                    <label for="fiscal_year" class="form-label">{{ $t('label.fiscal_year')
                                    }}</label>

                                    <input type="text" v-model="form.fiscal_year" id="fiscal_year" class="form-control rounded-1"
                                        placeholder="2026" />

                                </div>
                            </div>
                            <div class="item">
                                <div class="mb-3 position-relative">
                                    <label for="currency" class="form-label">{{ $t('label.currency')
                                    }}</label>
                                    <select name="currency" v-model="form.currency" id="currency" class="form-control">
                                        <option value="">$ USD</option>
                                    </select>

                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="item">
                                <div class="mb-3 position-relative">
                                    <label for="added_tax_rate" class="form-label">{{
                                        $t('label.added_tax_rate')
                                        }}</label>

                                    <input type="text" v-model="form.vat_rate" id="added_tax_rate" class="form-control rounded-1"
                                        placeholder="20%" />

                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3 position-relative">
                                        <label for="from" class="form-label">{{
                                            $t('label.from')
                                        }}</label>

                                        <input type="date" v-model="form.from_date" id="from" class="form-control rounded-1" />

                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3 position-relative">
                                        <label for="from" class="form-label">{{
                                            $t('label.to')
                                        }}</label>

                                        <input type="date" v-model="form.to_date" id="to" class="form-control rounded-1" />

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <button class="btn btn-main w-100 mb-5 rounded-1">{{ $t('label.next') }}</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/axios.js';
import NavbarLogoComponent from '../components/NavbarLogoComponent.vue';
import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';
import LanguageSwitcher from '../components/LanguageSwitcher.vue';
export default {
    name: 'RegisterCompany',
    components: { NavbarLogoComponent,LanguageSwitcher },
    data() {
        return {
            form: {
                name: '',
                commercial_registration: '',
                companyField: '',
                clientType: '',
                logo: null,
                address: '',
                email: '',
                phone: '',
                income_tax_rate: '20%',
                vat_rate: '20%',
                fiscal_year: '2026',
                from_date: '',
                to_date: '',
                base_currency: 'USD',
            },
            iti: {},
        }
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
        handleLogo(event) {
            this.form.companyLogo = event.target.files[0];
        },
        async submitForm() {
            try {
                const formData = {
                    name: this.form.name,
                    commercial_registration: this.form.commercial_registration,
                    address: this.form.address,
                    // logo: this.form.logo,
                    email: this.form.email,
                    phone: this.form.phone,
                    vat_rate: +this.form.vat_rate,
                    income_tax_rate: +this.form.income_tax_rate,
                    fiscal_year: this.form.fiscal_year,
                    base_currency: this.form.base_currency,
                    from_date: this.form.from_date,
                    to_date: this.form.to_date,
                };
                const response = await axios.post('/api/create_company', formData);
                alert(response.data.message);
                // localStorage.setItem("token", response.data.new_token);
                this.$router.push({ name: 'admin.dashboard' }); 
            } catch (error) {
                    // تحقق إذا في رسالة خطأ من السيرفر
                    if (error.response && error.response.data && error.response.data.message) {
                        alert(`خطأ: ${error.response.data.message}`);
                    } else if (error.response && error.response.data && error.response.data.errors) {
                        // لو فيه validation errors مثلاً
                        const errors = error.response.data.errors;
                        let errorMessages = '';
                        for (const key in errors) {
                            if (Object.prototype.hasOwnProperty.call(errors, key)) {
                                errorMessages += `${errors[key].join(', ')}\n`;
                            }
                        }
                        alert(`أخطاء في البيانات:\n${errorMessages}`);
                    } else {
                        alert("حدث خطأ أثناء إنشاء الشركة.");
                    }
                    console.error(error);
                }
            },
    }
}
</script>

<style scoped>
header,
.navbar {
    height: 96px;
}

.form .item {
    margin-bottom: 40px;
}
</style>
