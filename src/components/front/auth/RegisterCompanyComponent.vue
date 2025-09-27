<template>
    <div class="register-company">
        <LoadingComponent :is-loading="isLoading" />
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
                <form @submit.prevent="submitForm" class="form" enctype="multipart/form-data">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="item">
                                <div class="mb-3 position-relative">
                                    <label for="company_name" class="form-label">{{ $t('label.company_name') }}</label>
                                    <input type="text" v-model="form.company_name" id="company_name"
                                        class="form-control rounded-1" />
                                </div>
                                <p class='text-danger form-text' v-if="errors.company_name">{{ errors.company_name[0] }}
                                </p>
                            </div>

                            <div class="item">
                                <div class="mb-3 position-relative">
                                    <label for="company_type" class="form-label">{{ $t('label.company_field')
<<<<<<< HEAD
                                        }}</label>
=======
<<<<<<< HEAD
                                        }}</label>

                                    <Select v-model="form.company_type" :options="companyTypes"
                                        :label="locale === 'ar' ? 'title_ar' : 'title_en'"
                                        :reduce="company => company.id" placeholder="" />

=======
                                    }}</label>
>>>>>>> 993524366d9251d18f8ed0bd241476c8902bea33

                                    <Vue3Select v-model="form.company_type" :options="companyTypes"
                                        :label="locale === 'ar' ? 'title_ar' : 'title_en'"
                                        :reduce="company => company.id" placeholder="" />
>>>>>>> 5e25639469de159d12b434d70cc5162e896419f7
                                </div>
                                <p class='text-danger form-text' v-if="errors.company_type">{{ errors.company_type[0] }}
                                </p>

                            </div>

                            <div class="item">
                                <div class="mb-3 position-relative">
                                    <label for="company_address" class="form-label">{{ $t('label.company_address')
<<<<<<< HEAD
                                        }}</label>
=======
<<<<<<< HEAD
                                        }}</label>
=======
                                    }}</label>
>>>>>>> 5e25639469de159d12b434d70cc5162e896419f7
>>>>>>> 993524366d9251d18f8ed0bd241476c8902bea33
                                    <input type="text" v-model="form.company_address" id="company_address"
                                        class="form-control rounded-1"
                                        :placeholder="$t('label.company_address_placeholder')" />
                                </div>
                                <p class='text-danger form-text' v-if="errors.company_address">{{
                                    errors.company_address[0]
<<<<<<< HEAD
                                }}
=======
<<<<<<< HEAD
                                }}
=======
                                    }}
>>>>>>> 5e25639469de159d12b434d70cc5162e896419f7
>>>>>>> 993524366d9251d18f8ed0bd241476c8902bea33
                                </p>

                            </div>

                            <div class="item">
                                <div class="mb-3 position-relative">
                                    <label for="email" class="form-label">{{ $t('label.email') }}</label>
                                    <div class="position-relative group">
                                        <input type="email" v-model="form.email" id="email"
                                            class="form-control rounded-1" placeholder="yassin2029@gmail.com" />
                                        <i class="bi bi-envelope"></i>
                                    </div>
                                    <p class='text-danger form-text' v-if="errors.email">
                                        {{ errors.email[0] }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="item">
                                <div class="mb-3 position-relative">
                                    <label for="commerical_registration_number" class="form-label">{{
                                        $t('label.commerical_registration_number') }}</label>
                                    <div class="position-relative group">
                                        <input type="text" v-model="form.commercial_registration_number"
                                            id="commercial_registration_number" class="form-control rounded-1" />
                                    </div>
                                    <p class='text-danger form-text' v-if="errors.commercial_registration_number">
                                        {{ errors.commercial_registration_number[0] }}
                                    </p>
                                </div>
                            </div>

                            <div class="item">
                                <div class="mb-3 position-relative">
                                    <label for="work_type" class="form-label">{{ $t('label.work_type') }}</label>
                                    <Vue3Select v-model="form.work_type" :options="workTypes"
                                        :label="locale === 'ar' ? 'title_ar' : 'title_en'"
                                        :reduce="workType => workType.id" placeholder="" />
                                </div>
                                <p class='text-danger form-text' v-if="errors.workType">
                                    {{ errors.workType[0] }}
                                </p>
                            </div>

                            <div class="item">
                                <div class="mb-3 position-relative">
                                    <label for="company_logo" class="form-label">{{ $t('label.company_logo') }}</label>
                                    <div class="position-relative ">
                                        <input type="file" @change="handleLogo" id="company_logo"
                                            class="form-control rounded-0 w-100" />
                                    </div>
                                </div>
                                <p class='text-danger form-text' v-if="errors.company_logo">
                                    {{ errors.company_logo[0] }}
                                </p>
                            </div>
                            <div class="item">
                                <div class="mb-3 position-relative">
                                    <label for="phone" class="form-label">{{ $t('label.phone_number') }}</label>
                                    <div class="position-relative group">
                                        <input type="tel" v-model="form.phone" id="phone"
                                            class="form-control rounded-0 w-100" />
                                    </div>
                                </div>
                                <p class='text-danger form-text' v-if="errors.phone">
                                    {{ errors.phone[0] }}
                                </p>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="form-check mb-3">
                                <input type="checkbox" v-model="form.allow_emails"
                                    class="form-check-input rounded-circle" id="remember" />
<<<<<<< HEAD
                                <label class="form-check-label" for="remember">{{ $t('label.messages_push') }}</label>
=======
                                <label class="form-check-label" for="remember">{{ $t('label.messages_push')
<<<<<<< HEAD
                                    }}</label>
=======
                                }}</label>
>>>>>>> 5e25639469de159d12b434d70cc5162e896419f7
>>>>>>> 993524366d9251d18f8ed0bd241476c8902bea33
                            </div>
                            <h4 class="mb-5">{{ $t('label.taxHeading') }}</h4>
                        </div>

                        <div class="col-md-6">
                            <div class="item">
                                <div class="mb-3 position-relative">
<<<<<<< HEAD
                                    <label for="income_tax_rate" class="form-label">{{
                                        $t('label.income_tax_rate')}}</label>
=======
                                    <label for="income_tax_rate" class="form-label">{{ $t('label.income_tax_rate')
<<<<<<< HEAD
                                        }}</label>
=======
                                    }}</label>
>>>>>>> 5e25639469de159d12b434d70cc5162e896419f7
>>>>>>> 993524366d9251d18f8ed0bd241476c8902bea33
                                    <input type="text" v-model="form.income_tax_rate" id="income_tax_rate"
                                        class="form-control rounded-1" placeholder="20%" />
                                </div>
                                <p class='text-danger form-text' v-if="errors.income_tax_rate">
                                    {{ errors.income_tax_rate[0] }}
                                </p>
                            </div>

                            <div class="item">
                                <div class="mb-3 position-relative">
<<<<<<< HEAD
                                    <label for="fiscal_year" class="form-label">{{ $t('label.fiscal_year') }}</label>
=======
                                    <label for="fiscal_year" class="form-label">{{ $t('label.fiscal_year')
<<<<<<< HEAD
                                        }}</label>
=======
                                    }}</label>
>>>>>>> 5e25639469de159d12b434d70cc5162e896419f7
>>>>>>> 993524366d9251d18f8ed0bd241476c8902bea33
                                    <input type="text" v-model="form.fiscal_year" id="fiscal_year"
                                        class="form-control rounded-1" placeholder="2026" />
                                </div>
                                <p class='text-danger form-text' v-if="errors.fiscal_year">
                                    {{ errors.fiscal_year[0] }}
                                </p>
                            </div>

                            <div class="item">
                                <div class="mb-3 position-relative">
                                    <label for="currency" class="form-label">{{ $t('label.currency') }}</label>

                                    <Vue3Select v-model="form.currency_id" :options="currencies"
                                        :label="locale === 'ar' ? 'name_ar' : 'name_en'"
                                        :reduce="currency => currency.id" placeholder="" />

                                </div>
                                <p class='text-danger form-text' v-if="errors.currency_id">
                                    {{ errors.currency_id[0] }}
                                </p>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="item">
                                <div class="mb-3 position-relative">
                                    <label for="added_tax_rate" class="form-label">{{ $t('label.added_tax_rate')
<<<<<<< HEAD
                                        }}</label>
=======
<<<<<<< HEAD
                                        }}</label>
=======
                                    }}</label>
>>>>>>> 5e25639469de159d12b434d70cc5162e896419f7
>>>>>>> 993524366d9251d18f8ed0bd241476c8902bea33
                                    <input type="text" v-model="form.vat_rate" id="added_tax_rate"
                                        class="form-control rounded-1" placeholder="20%" />
                                </div>
                                <p class='text-danger form-text' v-if="errors.vat_rate">
                                    {{ errors.vat_rate[0] }}
                                </p>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3 position-relative">
                                        <label for="from" class="form-label">{{ $t('label.from') }}</label>
                                        <input type="date" v-model="form.from" id="from"
                                            class="form-control rounded-1" />
                                    </div>
                                    <p class='text-danger form-text' v-if="errors.from">
                                        {{ errors.from[0] }}
                                    </p>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3 position-relative">
                                        <label for="to" class="form-label">{{ $t('label.to') }}</label>
                                        <input type="date" v-model="form.to" id="to" class="form-control rounded-1" />
                                    </div>
                                    <p class='text-danger form-text' v-if="errors.to">
                                        {{ errors.to[0] }}
                                    </p>
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
import NavbarLogoComponent from '../components/NavbarLogoComponent.vue'
import 'intl-tel-input/build/css/intlTelInput.css'
import intlTelInput from 'intl-tel-input'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
<<<<<<< HEAD
// import VueSelect from 'vue-select'
import Vue3Select from 'vue3-select'
=======
<<<<<<< HEAD
import Select from "vue3-select";
import "vue3-select/dist/vue3-select.css";
=======
import VueSelect from 'vue-select'
>>>>>>> 5e25639469de159d12b434d70cc5162e896419f7
>>>>>>> 993524366d9251d18f8ed0bd241476c8902bea33
import LoadingComponent from '@/components/components/LoadingComponent.vue'
import {
    useI18n
} from 'vue-i18n'

export default {
    name: 'RegisterCompany',
<<<<<<< HEAD
    components: {
        NavbarLogoComponent,
        LanguageSwitcher,
        Vue3Select,
        LoadingComponent
    },
=======
<<<<<<< HEAD
    components: { NavbarLogoComponent, LanguageSwitcher, Select, LoadingComponent },
=======
    components: { NavbarLogoComponent, LanguageSwitcher, VueSelect, LoadingComponent },
>>>>>>> 5e25639469de159d12b434d70cc5162e896419f7
>>>>>>> 993524366d9251d18f8ed0bd241476c8902bea33
    data() {
        return {
            isLoading: true,
            locale: null,
            form: {
                company_name: '',
                commercial_registration_number: '',
                company_type: null,
                work_type: null,
                company_logo: null,
                company_address: '',
                email: '',
                country_code: '',
                phone: '',
                allow_emails: false,
                income_tax_rate: 0,
                vat_rate: 0,
                fiscal_year: 2026,
                from: '2026-01-01',
                to: '2026-12-31',
                currency_id: null,

            },
            iti: null,
            errors: []
        }
    },
    computed: {
        currencies: function () {

            return this.$store.getters['options/currencies'];

        },
        workTypes: function () {

            return this.$store.getters['options/workTypes'];

        },
        companyTypes: function () {

            return this.$store.getters['options/companyTypes'];

        },

    },
    async mounted() {
        const input = document.querySelector("#phone")
        this.iti = intlTelInput(input, {
            initialCountry: "PS",
            loadUtils: () => import("intl-tel-input/build/js/utils"),
            containerClass: 'w-100',
        });
        this.form.country_code = this.iti.getSelectedCountryData().dialCode;

        input.addEventListener("countrychange", () => {
            this.form.country_code = this.iti.getSelectedCountryData().dialCode;
        });
        const {
            locale
        } = useI18n();
        this.locale = locale.value;
        await this.$store.dispatch('options/getCurrencies');
        await this.$store.dispatch('options/getWorkTypes');
        await this.$store.dispatch('options/getCompanyTypes');
        this.isLoading = false;
    },
    methods: {
        handleLogo(event) {
            this.form.company_logo = event.target.files[0]
        },
        submitForm() {
            this.isLoading = true;
            this.errors = [];
            const formData = new FormData()

            formData.append('company_name', this.form.company_name)
            formData.append('commercial_registration_number', this.form.commercial_registration_number)
            formData.append('company_type', this.form.company_type)
            formData.append('work_type', this.form.work_type)
            formData.append('company_logo', this.form.company_logo)
            formData.append('company_address', this.form.company_address)
            formData.append('email', this.form.email)
            formData.append('country_code', this.form.country_code)
            formData.append('phone', this.form.phone)
            formData.append('allow_emails', this.form.allow_emails ? 1 : 0)
            formData.append('income_tax_rate', this.form.income_tax_rate)
            formData.append('vat_rate', this.form.vat_rate)
            formData.append('fiscal_year', this.form.fiscal_year)
            formData.append('from', this.form.from)
            formData.append('to', this.form.to)
            formData.append('currency_id', this.form.currency_id)

            this.$store.dispatch('auth/registerCompany', formData).then(res => {
                this.isLoading = false;
                if (res.data.success) {
                    this.$router.push("/admin");
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
