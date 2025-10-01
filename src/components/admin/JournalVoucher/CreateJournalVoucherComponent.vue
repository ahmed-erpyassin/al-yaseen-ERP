<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-currency-dollar"></i> {{ modalTitle }}</h1>

        <div class="d-flex align-items-center justify-content-end mb-4">
            <router-link to="/admin/accounting/journal-entries" class="btn btn-outline-secondary me-3">إلغاء</router-link>
            <button class="btn btn-success" @click="saveEntry">حفظ</button>
        </div>

        <form @submit.prevent="saveEntry">
            <div class="row mb-4">
                <div class="col-md-3">
                    <label>{{ $t('label.entry_number') }}</label>
                    <input type="text" class="form-control" v-model="entry.number" required>
                </div>
                <div class="col-md-3">
                    <label>{{ $t('label.entry_date') }}</label>
                    <input type="date" class="form-control" v-model="entry.date" required>
                </div>
                <div class="col-md-3">
                    <label>{{ $t('label.entry_time') }}</label>
                    <input type="time" class="form-control" v-model="entry.time" required>
                </div>
                <div class="col-md-3">
                    <label>{{ $t('label.entry_currency') }}</label>
                    <input type="text" class="form-control" v-model="entry.currency" required>
                </div>
                <div class="col-12 mt-3">
                    <label>{{ $t('label.entry_description') }}</label>
                    <textarea class="form-control" v-model="entry.description" rows="3"></textarea>
                </div>
            </div>

            <h4>{{ $t('label.entry_information') }}</h4>
            <div class="table-responsive mb-3">
                <table class="table table-bordered text-center align-middle">
                    <thead class="header">
                        <tr>
                            <th>#</th>
                            <th>{{ $t('label.account_number') }}</th>
                            <th>{{ $t('label.account_name') }}</th>
                            <th>{{ $t('label.debit') }}</th>
                            <th>{{ $t('label.credit') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in entryDetails" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td><input type="text" class="form-control" v-model="row.accountNumber"></td>
                            <td><input type="text" class="form-control" v-model="row.accountName"></td>
                            <td><input type="number" class="form-control" v-model.number="row.debit"></td>
                            <td><input type="number" class="form-control" v-model.number="row.credit"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="d-flex gap-2 mb-3">
                <button type="button" class="btn btn-secondary" @click="addRow">{{ $t('actions.add_row') }}</button>
                <button type="button" class="btn btn-danger" @click="removeRow">{{ $t('actions.remove_row') }}</button>
            </div>

            <div class="row">
                <div class="col-md-3">
                    <label>{{ $t('label.total_debit') }}</label>
                    <input type="number" class="form-control" :value="totalDebit" readonly>
                </div>
                <div class="col-md-3">
                    <label>{{ $t('label.total_credit') }}</label>
                    <input type="number" class="form-control" :value="totalCredit" readonly>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
    name: "JournalEntryCreate",
    data() {
        return {
            modalTitle: "إضافة قيد جديد",
            entry: {
                number: "",
                date: "",
                time: "",
                currency: "USD",
                description: ""
            },
            entryDetails: [
                { accountNumber: "", accountName: "", debit: 0, credit: 0 }
            ]
        };
    },
    computed: {
        totalDebit() {
            return this.entryDetails.reduce((sum, row) => sum + (Number(row.debit) || 0), 0);
        },
        totalCredit() {
            return this.entryDetails.reduce((sum, row) => sum + (Number(row.credit) || 0), 0);
        }
    },
    methods: {
        addRow() {
            this.entryDetails.push({ accountNumber: "", accountName: "", debit: 0, credit: 0 });
        },
        removeRow() {
            if (this.entryDetails.length > 1) this.entryDetails.pop();
        },
        saveEntry() {
            if (this.totalDebit !== this.totalCredit) {
                Swal.fire({
                    icon: 'error',
                    title: 'خطأ',
                    text: 'المجموع الدائن لا يساوي المجموع المدين!',
                });
                return;
            }

            // إرسال البيانات لل API أو التعامل معها محلياً
            console.log("Entry Saved:", { ...this.entry, details: this.entryDetails });

            Swal.fire({
                icon: 'success',
                title: 'نجاح',
                text: 'تم حفظ القيد بنجاح!',
                confirmButtonText: 'حسناً'
            }).then(() => {
                this.$router.push("/admin/accounting/journal-entries/create");
            });
        }
    }
};
</script>


<style scoped>
.header th {
    background-color: #F4FFF0 !important;
}
</style>
