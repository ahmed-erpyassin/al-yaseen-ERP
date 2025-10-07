<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-cash-stack"></i> {{ $t('label.expenses') }}</h1>

        <!-- أزرار إنشاء وحذف -->
        <div class="d-flex align-items-center justify-content-end mb-4">
            <router-link :to="{ name: 'admin.new-expense' }" class="btn btn-lg btn-main me-3">
                {{ $t('buttons.create') }}
            </router-link>
        </div>

        <!-- البحث والتحكم بالأعمدة -->
        <div class="d-flex align-items-center actions mb-3">
            <div class="search me-2 mb-3">
                <i class="bi bi-search me-2"></i>
                <input type="text" v-model="searchQuery" placeholder="Search customer/supplier..."
                    class="border rounded px-2 py-1" />
            </div>

            <div class="dropdown mb-3">
                <i class="bi bi-gear" type="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                <ul class="dropdown-menu align-center rounded-0 p-2" style="width: 250px;">
                    <li v-for="(col, index) in columns" :key="index">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="col.visible" :id="'col' + index" />
                            <label class="form-check-label" :for="'col' + index">{{ col.label }}</label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- جدول المصروفات -->
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-for="col in visibleColumns" :key="col.key">{{ col.label }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="expenses.length === 0">
                        <td :colspan="visibleColumns.length" class="text-center">No expenses found</td>
                    </tr>
                    <tr v-else v-for="expense in filteredExpenses" :key="expense.id">
                        <td v-for="col in visibleColumns" :key="col.key">{{ expense[col.key] }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
    name: "ExpensesComponent",
    data() {
        return {
            searchQuery: "",
            expenses: [],
            columns: [
                { key: "invoice_no", label: this.$t("label.invoice_no"), visible: true },
                { key: "customer_or_supplier_name", label: this.$t("label.customer_or_supplier_name"), visible: true },
                { key: "licensed_operator", label: this.$t("label.licensed_operator"), visible: true },
                { key: "amount", label: this.$t("label.amount"), visible: true },
                { key: "currency", label: this.$t("label.currency"), visible: true },
                { key: "date", label: this.$t("label.date"), visible: true },
                { key: "registration_number", label: this.$t("label.registration_number"), visible: true },
            ],
        };
    },
    computed: {
        visibleColumns() {
            return this.columns.filter((col) => col.visible);
        },
        filteredExpenses() {
            if (!this.searchQuery) return this.expenses;
            return this.expenses.filter(
                (e) =>
                    e.customer_or_supplier_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    e.invoice_no.toString().includes(this.searchQuery)
            );
        },
    },
    mounted() {
        this.fetchExpenses();
    },
    methods: {
        fetchExpenses() {
            // بيانات وهمية كمثال
            this.expenses = [
                {
                    id: 1,
                    invoice_no: "EXP-1001",
                    customer_or_supplier_name: "Supplier A",
                    licensed_operator: "Operator 1",
                    amount: 2500,
                    currency: "USD",
                    date: "2025-09-01",
                    registration_number: "REG-7001",
                },
                {
                    id: 2,
                    invoice_no: "EXP-1002",
                    customer_or_supplier_name: "Customer B",
                    licensed_operator: "Operator 2",
                    amount: 1800,
                    currency: "USD",
                    date: "2025-09-03",
                    registration_number: "REG-7002",
                },
            ];
        },
        deleteSelected() {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire("Deleted!", "Expenses have been deleted.", "success");
                    // هنا يمكن إضافة الحذف عبر API
                }
            });
        },
    },
};
</script>

<style scoped>
.header th {
    background-color: #F4FFF0 !important;
}

.actions i {
    font-size: 30px;
}

.actions span {
    font-size: 24px;
}

.dropdown .show {
    color: #1D7342;
}

.form-check-input:checked[type="checkbox"] {
    border-radius: 50%;
    background-color: #1D7342 !important;
}
</style>
