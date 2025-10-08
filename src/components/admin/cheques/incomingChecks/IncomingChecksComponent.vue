<template>
    <div class="container pe-5 ps-5">
        <!-- العنوان -->
        <h1><i class="bi bi-cash-stack me-2"></i> {{ $t('label.incoming_checks') }}</h1>

        <!-- أزرار التحكم -->
        <div class="d-flex align-items-center justify-content-end mb-4">
            <router-link :to="{ name: 'admin.cheques.incoming_checks.create' }" class="btn btn-lg btn-main me-3">
                <i class="bi bi-plus-lg me-2"></i>{{ $t('buttons.create') }}
            </router-link>

            <div class="dropdown">
                <button class="btn btn-lg btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    استيراد / تصدير
                </button>
                <ul class="dropdown-menu dropdown-menu-end p-2">
                    <li>
                        <label class="dropdown-item mb-0" style="cursor: pointer;">
                            استيراد Excel
                            <input type="file" accept=".xlsx, .xls" class="d-none" />
                        </label>
                    </li>
                    <li><button class="dropdown-item">تصدير Excel</button></li>
                    <li><button class="dropdown-item">تصدير PDF</button></li>
                    <li><button class="dropdown-item">طباعة</button></li>
                </ul>
            </div>
        </div>

        <!-- البحث والإعدادات -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="search-bar d-flex align-items-center flex-grow-1 me-3">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" placeholder="ابحث عن شيك..." v-model="searchQuery" />
            </div>

            <div class="dropdown">
                <i class="bi bi-gear" type="button" data-bs-toggle="dropdown" aria-expanded="false"
                    style="font-size:1.5rem;cursor:pointer;"></i>
                <ul class="dropdown-menu rounded-0 p-2" style="width: 250px;">
                    <li v-for="(field, index) in table.fields" :key="field.key">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="field.status"
                                :id="'col-' + index" />
                            <label class="form-check-label" :for="'col-' + index">{{ field.name }}</label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- الجدول -->
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-for="field in visibleFields" :key="field.key">{{ field.name }}</th>
                        <th>إجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="paginatedChecks.length === 0">
                        <td :colspan="visibleFields.length + 1" class="text-center">لا توجد شيكات لعرضها</td>
                    </tr>
                    <tr v-for="(check) in paginatedChecks" :key="check.id">
                        <td v-for="field in visibleFields" :key="field.key">{{ check[field.key] }}</td>
                        <td class="text-center">
                            <i class="bi bi-eye action-icon me-2 text-primary" @click="viewCheck(check)"
                                title="عرض"></i>
                            <i class="bi bi-pencil action-icon me-2 text-warning" @click="editCheck(check)"
                                title="تعديل"></i>
                            <i class="bi bi-trash action-icon text-danger" @click="deleteCheck(check)" title="حذف"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-secondary" @click="prevPage" :disabled="currentPage === 1">السابق</button>
            <span>صفحة {{ currentPage }} من {{ totalPages }}</span>
            <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">التالي</button>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    name: 'IncomingChecksComponent',
    data() {
        return {
            searchQuery: '',
            currentPage: 1,
            perPage: 8,
            checks: [
                {
                    id: 1,
                    check_number: 'CH-1001',
                    check_date: '2025-01-12',
                    right_date: '2025-01-15',
                    owner: 'شركة السلام',
                    account_number: 'ACC-445',
                    account_name: 'شركة السلام التجارية',
                    statement: 'دفعة أولى للمشروع',
                    bank_name: 'بنك فلسطين',
                    bank_account: 'BNK-001',
                    branch_name: 'غزة - الرئيسي',
                    transaction_date: '2025-01-13',
                    voucher_account_number: 'VCH-2025',
                    amount: '1500',
                    currency: 'ILS',
                    status: 'قيد التحصيل'
                },
                {
                    id: 2,
                    check_number: 'CH-1002',
                    check_date: '2025-02-05',
                    right_date: '2025-02-10',
                    owner: 'مؤسسة الريادة',
                    account_number: 'ACC-890',
                    account_name: 'مؤسسة الريادة للمقاولات',
                    statement: 'دفعة نهائية',
                    bank_name: 'البنك الإسلامي',
                    bank_account: 'BNK-002',
                    branch_name: 'فرع الرمال',
                    transaction_date: '2025-02-06',
                    voucher_account_number: 'VCH-2026',
                    amount: '3200',
                    currency: 'USD',
                    status: 'مُحصّل'
                }
            ],
            table: {
                fields: [
                    { name: '#', key: 'id', status: true },
                    { name: 'رقم الشيك', key: 'check_number', status: true },
                    { name: 'تاريخ الشيك', key: 'check_date', status: true },
                    { name: 'تاريخ الاستحقاق', key: 'right_date', status: true },
                    { name: 'صاحب الشيك', key: 'owner', status: true },
                    { name: 'رقم الحساب', key: 'account_number', status: true },
                    { name: 'اسم الحساب', key: 'account_name', status: true },
                    { name: 'البيان', key: 'statement', status: true },
                    { name: 'اسم البنك', key: 'bank_name', status: false },
                    { name: 'رقم حساب البنك', key: 'bank_account', status: false },
                    { name: 'الفرع', key: 'branch_name', status: false },
                    { name: 'تاريخ العملية', key: 'transaction_date', status: false },
                    { name: 'رقم القيد', key: 'voucher_account_number', status: false },
                    { name: 'المبلغ', key: 'amount', status: false },
                    { name: 'العملة', key: 'currency', status: false },
                    { name: 'الحالة', key: 'status', status: true }
                ]
            }
        };
    },
    computed: {
        visibleFields() {
            return this.table.fields.filter(f => f.status);
        },
        filteredChecks() {
            if (!this.searchQuery) return this.checks;
            const q = this.searchQuery.toLowerCase();
            return this.checks.filter(c =>
                Object.values(c).some(val => val?.toString().toLowerCase().includes(q))
            );
        },
        paginatedChecks() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredChecks.slice(start, start + this.perPage);
        },
        totalPages() {
            return Math.ceil(this.filteredChecks.length / this.perPage) || 1;
        }
    },
    methods: {
        viewCheck(check) {
            Swal.fire({
                title: `تفاصيل الشيك رقم ${check.check_number}`,
                html: `
                    <p><b>المبلغ:</b> ${check.amount}${check.currency}</p>
                    <p><b>صاحب الشيك:</b> ${check.owner}</p>
                    <p><b>البنك:</b> ${check.bank_name}</p>
                    <p><b>الفرع:</b> ${check.branch_name}</p>
                    <p><b>الحالة:</b> ${check.status}</p>
                    <p><b>تاريخ العملية:</b> ${check.transaction_date}</p>
                `,
                confirmButtonText: 'إغلاق'
            });
        },
        editCheck(check) {
            Swal.fire('تعديل', `تعديل الشيك رقم ${check.check_number}`, 'info');
        },
        async deleteCheck(check) {
            const res = await Swal.fire({
                title: 'تأكيد الحذف',
                text: `هل أنت متأكد من حذف الشيك رقم ${check.check_number}؟`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'نعم، احذف',
                cancelButtonText: 'إلغاء',
                confirmButtonColor: '#dc3545'
            });
            if (res.isConfirmed) {
                this.checks = this.checks.filter(c => c.id !== check.id);
                Swal.fire('تم الحذف', 'تم حذف الشيك بنجاح', 'success');
            }
        },
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; }
    }
};
</script>

<style scoped>
.header th {
    background-color: #F4FFF0 !important;
}

.btn-main {
    background-color: #28a745;
    border-color: #28a745;
    border-radius: 4px;
    font-weight: 500;
    transition: all 0.2s ease;
}

.btn-main:hover {
    background-color: #218838;
    border-color: #1e7e34;
    transform: translateY(-1px);
}

.action-icon {
    font-size: 1.3rem;
    cursor: pointer;
    transition: transform 0.2s, opacity 0.2s;
}

.action-icon:hover {
    transform: scale(1.2);
    opacity: 0.8;
}

.search-bar input {
    border-radius: 4px;
    padding: 0.5rem 1rem;
}
</style>
