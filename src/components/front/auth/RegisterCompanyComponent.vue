<template>
    <div class="register-company">
        <!-- ✅ شاشة تحميل -->
        <div v-if="isLoading" class="loading-overlay">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">جارٍ التحميل...</span>
            </div>
        </div>

        <!-- ✅ الرأس -->
        <header>
            <nav class="navbar navbar-light bg-white py-3 px-4 d-flex justify-content-between align-items-center">
                <div class="container d-flex justify-content-between align-items-center">
                    <div class="navbar-logo">
                        <img src="@/assets/logo.png" alt="Logo" height="40" />
                    </div>

                    <div class="d-flex align-items-center gap-3">
                        <!-- ✅ تغيير اللغة -->
                        <select v-model="locale" @change="changeLang" class="form-select form-select-sm w-auto">
                            <option value="ar">العربية</option>
                            <option value="en">English</option>
                        </select>

                        <img src="@/assets/avatar.jpg" alt="User" class="rounded-circle" width="40" height="40" />
                    </div>
                </div>
            </nav>
        </header>

        <!-- ✅ المحتوى -->
        <div class="content">
            <div class="container">
                <h4 class="mb-5">{{ $t('label.registerCompany') || 'تسجيل الشركة' }}</h4>

                <form @submit.prevent="submitForm" class="form" enctype="multipart/form-data">
                    <div class="row">

                        <!-- العمود الأيسر -->
                        <div class="col-md-6">
                            <div class="item">
                                <label class="form-label">اسم الشركة</label>
                                <input type="text" v-model="form.company_name" class="form-control" />
                                <p class="text-danger" v-if="errors.company_name">{{ errors.company_name[0] }}</p>
                            </div>

                            <div class="item">
                                <label class="form-label">مجال الشركة</label>
                                <select v-model.number="form.company_type" class="form-control">
                                    <option value="" disabled>اختر مجال الشركة</option>
                                    <option v-for="type in companyTypes" :key="type.id" :value="type.id">{{ type.title
                                        }}</option>
                                </select>
                                <p class="text-danger" v-if="errors.company_type">{{ errors.company_type[0] }}</p>
                            </div>

                            <div class="item">
                                <label class="form-label">عنوان الشركة</label>
                                <input type="text" v-model="form.company_address" class="form-control" />
                            </div>

                            <div class="item">
                                <label class="form-label">البريد الإلكتروني</label>
                                <input type="email" v-model="form.email" class="form-control"
                                    placeholder="example@mail.com" />
                            </div>
                        </div>

                        <!-- العمود الأيمن -->
                        <div class="col-md-6">
                            <div class="item">
                                <label class="form-label">رقم السجل التجاري</label>
                                <input type="text" v-model="form.commercial_registration_number" class="form-control" />
                            </div>

                            <div class="item">
                                <label class="form-label">نوع العمل</label>
                                <select v-model.number="form.work_type" class="form-control">
                                    <option value="" disabled>اختر نوع العمل</option>
                                    <option v-for="type in workTypes" :key="type.id" :value="type.id">{{ type.title }}
                                    </option>
                                </select>
                            </div>

                            <div class="item">
                                <label class="form-label">شعار الشركة</label>
                                <input type="file" @change="handleLogo" class="form-control" />
                            </div>

                            <div class="item">
                                <label class="form-label">رقم الهاتف</label>
                                <input type="tel" v-model="form.phone" id="phone" class="form-control" />
                            </div>
                        </div>

                        <!-- الضرائب -->
                        <div class="col-12 mt-4">
                            <h4 class="mb-3">الضرائب</h4>
                        </div>

                        <div class="col-md-6">
                            <div class="item">
                                <label class="form-label">نسبة ضريبة الدخل</label>
                                <input type="number" min="0" max="100" v-model.number="form.income_tax_rate"
                                    class="form-control" />
                            </div>

                            <div class="item">
                                <label class="form-label">السنة المالية</label>
                                <input type="text" v-model="form.fiscal_year" class="form-control" />
                            </div>

                            <div class="item">
                                <label class="form-label">العملة</label>
                                <select v-model.number="form.currency_id" class="form-control">
                                    <option value="" disabled>اختر العملة</option>
                                    <option v-for="currency in currencies" :key="currency.id" :value="currency.id">
                                        {{ locale === 'ar' ? currency.name_ar : currency.name_en }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="item">
                                <label class="form-label">نسبة ضريبة القيمة المضافة</label>
                                <input type="number" min="0" max="100" v-model.number="form.vat_rate"
                                    class="form-control" />
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <label class="form-label">من</label>
                                    <input type="date" v-model="form.from" class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">إلى</label>
                                    <input type="date" v-model="form.to" class="form-control" />
                                </div>
                            </div>
                        </div>

                        <div class="col-12 mt-4">
                            <button class="btn btn-main w-100 rounded-1">التالي</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import intlTelInput from 'intl-tel-input';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: "RegisterCompany",
    data() {
        return {
            locale: localStorage.getItem('locale') || 'ar',
            form: {
                company_name: "",
                company_type: null,
                work_type: null,
                company_logo: null,
                company_address: "",
                email: "",
                country_code: "",
                phone: "",
                income_tax_rate: 0,
                vat_rate: 0,
                fiscal_year: 2026,
                from: "2026-01-01",
                to: "2026-12-31",
                currency_id: null,
                commercial_registration_number: "",
                landline: ""
            },
            workTypes: [
                { id: 1, title: "شركة فردية" },
                { id: 2, title: "شركة تضامنية" },
                { id: 3, title: "شركة قابضة" },
                { id: 4, title: "فرع شركة أجنبية" },
                { id: 5, title: "شركة مساهمة عامة" },
                { id: 6, title: "شركة ذات مسؤولية محدودة" },
                { id: 7, title: "شركة توصية بسيطة" },
                { id: 8, title: "شركة مساهمة مقفلة" }
            ],
            companyTypes: [
                { id: 1, title: "المقاولات والإنشاءات" },
                { id: 2, title: "التجارة العامة" },
                { id: 3, title: "الزراعة والصناعات الغذائية" },
                { id: 4, title: "الخدمات اللوجستية والنقل" },
                { id: 5, title: "الصناعات التحويلية" },
                { id: 6, title: "خدمات تقنية وبرمجية" },
                { id: 7, title: "الاستيراد والتصدير" },
                { id: 8, title: "الخدمات المالية والمحاسبية" },
                { id: 9, title: "الخدمات التعليمية والتدريبية" },
                { id: 10, title: "الصحة والخدمات الطبية" },
                { id: 11, title: "العقارات والتطوير العقاري" },
                { id: 12, title: "الإعلام والتسويق والإعلان" },
                { id: 13, title: "السياحة والسفر" },
                { id: 14, title: "الطاقة والبيئة" },
                { id: 15, title: "الأمن والحراسات" },
                { id: 16, title: "خدمات أخرى" }
            ],
            currencies: [
                { id: 1, name_ar: "الدولار الأمريكي", name_en: "USD" },
                { id: 2, name_ar: "اليورو", name_en: "EUR" },
                { id: 3, name_ar: "الجنيه المصري", name_en: "EGP" }
            ],
            errors: {},
            isLoading: false,
            iti: null
        };
    },
    mounted() {
        const input = document.querySelector("#phone");
        this.iti = intlTelInput(input, { initialCountry: "PS" });
        this.form.country_code = this.iti.getSelectedCountryData().dialCode;
        input.addEventListener("countrychange", () => {
            this.form.country_code = this.iti.getSelectedCountryData().dialCode;
        });
    },
    methods: {
        changeLang() {
            localStorage.setItem('locale', this.locale);
            window.location.reload();
        },
        handleLogo(event) {
            this.form.company_logo = event.target.files[0];
        },
        async submitForm() {
            this.isLoading = true;
            this.errors = {};

            if (!this.form.company_name) return this.showError("يرجى إدخال اسم الشركة");
            if (!this.form.company_type) return this.showError("يرجى اختيار مجال الشركة");
            if (!this.form.work_type) return this.showError("يرجى اختيار نوع العمل");
            if (!this.form.currency_id) return this.showError("يرجى اختيار العملة");

            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    Swal.fire('خطأ', 'يرجى تسجيل الدخول أولاً', 'error');
                    this.$router.push({ name: 'auth.login' });
                    return;
                }

                const formData = new FormData();

                // 🏢 الحقول الأساسية
                formData.append('title', this.form.company_name || 'شركة بدون اسم');
                formData.append('commercial_registeration_number', this.form.commercial_registration_number || '000');

                // 📅 السنة المالية
                formData.append('financial_year_id', Number(1));

                // 🏭 الصناعة ونوع العمل
                formData.append('industry_id', Number(this.form.company_type || 1));
                formData.append('business_type_id', Number(this.form.work_type || 1));

                // 🌍 الموقع
                formData.append('country_id', Number(1));
                formData.append('region_id', Number(1));
                formData.append('city_id', Number(1));
                formData.append('status', 'active');

                // 💰 العملة
                formData.append('currency_id', Number(this.form.currency_id || 1));

                // 📫 بيانات الاتصال
                formData.append('address', this.form.company_address || 'غير محدد');
                formData.append('email', this.form.email || 'noemail@example.com');

                // ✅ رقم الهاتف بصيغة دولية صحيحة
                const cleanPhone = this.form.phone.replace(/\D/g, '');
                formData.append('mobile', cleanPhone.startsWith('+') ? cleanPhone : '+' + cleanPhone);

                // ☎️ الهاتف الأرضي
                formData.append('landline', this.form.landline || '');

                // 🧾 الضرائب (أرقام فقط)
                formData.append('income_tax_rate', Number(this.form.income_tax_rate) || 0);
                formData.append('vat_rate', Number(this.form.vat_rate) || 0);

                // 🖼️ الشعار (jpg/png فقط)
                if (this.form.company_logo) {
                    const allowed = ['image/jpeg', 'image/png', 'image/gif'];
                    if (!allowed.includes(this.form.company_logo.type)) {
                        Swal.fire('خطأ', 'يجب أن تكون الصورة من نوع JPG أو PNG أو GIF فقط', 'error');
                        this.isLoading = false;
                        return;
                    }
                    formData.append('logo', this.form.company_logo);
                }


                console.log("📦 البيانات المرسلة:", Object.fromEntries(formData));

                const res = await axios.post('https://alyaseenerp.com/api/v1/companies', formData, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Accept': 'application/json'
                    }
                });

                console.log("🟢 الرد من السيرفر:", res.data);

                const companyId = res.data.data?.id;
                if (companyId) localStorage.setItem("company_id", companyId);

                Swal.fire({
                    icon: 'success',
                    title: 'تم تسجيل الشركة بنجاح!',
                    timer: 2000,
                    showConfirmButton: false
                });

                this.$router.push('/admin');
            } catch (err) {
                // 👇 هذا الجزء الأهم الآن
                if (err.response) {
                    console.error("🟥 تفاصيل الخطأ من السيرفر:", err.response.data);
                    this.errors = err.response.data.errors || {};
                    Swal.fire({
                        icon: 'error',
                        title: 'فشل في التسجيل',
                        text: err.response.data.message || 'يرجى التحقق من البيانات',
                        footer: `<pre style="text-align:left;direction:ltr">${JSON.stringify(err.response.data.errors, null, 2)}</pre>`,
                        width: 600
                    });
                } else {
                    console.error("🟥 خطأ غير متوقع:", err);
                    Swal.fire('خطأ', 'حدث خطأ غير متوقع، حاول مجددًا', 'error');
                }
            } finally {
                this.isLoading = false;
            }
        },
        showError(msg) {
            Swal.fire('تنبيه', msg, 'warning');
            this.isLoading = false;
        }

    }
};
</script>

<style scoped>
.form .item {
    margin-bottom: 20px;
}

.form-control {
    height: 46px;
    border: 1px solid #ced4da;
    border-radius: 8px;
    font-size: 14px;
}

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.text-danger {
    font-size: 13px;
    margin-top: 4px;
}
</style>
