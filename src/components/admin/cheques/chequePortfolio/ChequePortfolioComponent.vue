<template>
    <div class="container pe-5 ps-5">
        <!-- العنوان -->
        <h1><i class="bi bi-wallet2 me-2"></i> {{ $t('label.cheque_portfolio') }}</h1>

        <!-- الأزرار العلوية -->
        <div class="d-flex align-items-center justify-content-end mb-4">
            <router-link :to="{ name: 'admin.cheques.cheque_portfolio.create' }" class="btn btn-lg btn-main me-3">
                <i class="bi bi-plus-lg me-2"></i>{{ $t('buttons.create') }}
            </router-link>

            <div class="dropdown me-3">
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
                <input type="text" class="form-control" placeholder="ابحث في الحافظة..." v-model="searchQuery" />
            </div>

            <div class="dropdown">
                <i class="bi bi-gear" type="button" data-bs-toggle="dropdown" aria-expanded="false"
                    style="font-size:1.5rem;cursor:pointer;"></i>
                <ul class="dropdown-menu rounded-0 p-2" style="width: 250px;">
                    <li v-for="(th, index) in table.fields" :key="index">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="th.status" :id="'col-' + index" />
                            <label class="form-check-label" :for="'col-' + index">{{ th.name }}</label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- الروابط الصغيرة -->
        <!-- <div class="d-flex justify-content-end mb-3">
            <div class="text-end">
                <p class="text-main mb-1">{{ $t('label.cheque_status_update') }}</p>
                <p class="text-main mb-1">{{ $t('label.receipt_voucher_review') }}</p>
                <p class="text-main mb-0">{{ $t('label.incoming_cheques_report') }}</p>
            </div>
        </div> -->

        <!-- الجدول -->
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-for="(th, index) in visibleFields" :key="index">{{ th.name }}</th>
                        <th>إجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="paginatedData.length === 0">
                        <td :colspan="visibleFields.length + 1" class="text-center">لا توجد بيانات لعرضها</td>
                    </tr>
                    <tr v-for="(item, index) in paginatedData" :key="index">
                        <td v-for="(th, i) in visibleFields" :key="i">Test</td>
                        <td>
                            <i class="bi bi-eye action-icon me-2 text-primary" title="عرض"></i>
                            <i class="bi bi-pencil action-icon me-2 text-warning" title="تعديل"></i>
                            <i class="bi bi-trash action-icon text-danger" title="حذف"></i>
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
export default {
    name: "ChequePortfolioComponent",
    data() {
        return {
            searchQuery: "",
            currentPage: 1,
            perPage: 8,
            table: {
                fields: [
                    { name: this.$t("label.check_number"), status: true },
                    { name: this.$t("label.check_date"), status: true },
                    { name: this.$t("label.right_date"), status: true },
                    { name: this.$t("label.check_owner"), status: true },
                    { name: this.$t("label.account_number"), status: true },
                    { name: this.$t("label.account_name"), status: true },
                    { name: this.$t("label.statement"), status: true },
                    { name: this.$t("label.bank_name"), status: true },
                    { name: this.$t("label.bank_account"), status: true },
                    { name: this.$t("label.branch_name"), status: false },
                    { name: this.$t("label.transaction_date"), status: false },
                    { name: this.$t("label.voucher_account_number"), status: false },
                    { name: this.$t("label.amount"), status: false },
                    { name: this.$t("label.currency"), status: false },
                ],
            },
        };
    },
    computed: {
        visibleFields() {
            return this.table.fields.filter((f) => f.status);
        },
        filteredData() {
            return this.searchQuery ? this.mockData.filter((row) =>
                Object.values(row).some((v) =>
                    v.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
                )
            ) : this.mockData;
        },
        paginatedData() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredData.slice(start, start + this.perPage);
        },
        totalPages() {
            return Math.ceil(this.filteredData.length / this.perPage) || 1;
        },
        mockData() {
            // بيانات تجريبية فقط لعرض الجدول
            return Array.from({ length: 15 }, (_, i) => ({
                id: i + 1,
                check_number: `CH-${1000 + i}`,
                owner: "شركة الاختبار",
                amount: "1000 ILS",
            }));
        },
    },
    methods: {
        prevPage() {
            if (this.currentPage > 1) this.currentPage--;
        },
        nextPage() {
            if (this.currentPage < this.totalPages) this.currentPage++;
        },
    },
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

.btn-outline-danger {
    border-width: 2px;
    font-weight: 500;
}

.btn-outline-danger:hover {
    background-color: #dc3545;
    color: #fff;
}

.search-bar input {
    border-radius: 4px;
    padding: 0.5rem 1rem;
}

.dropdown i {
    color: #1D7342;
}

.table tbody tr:hover {
    background-color: #F9FFF7;
}

.text-main {
    color: #1D7342;
    font-size: 1.1rem;
}

h1 {
    color: #1D7342;
    margin-bottom: 25px;
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
</style>
