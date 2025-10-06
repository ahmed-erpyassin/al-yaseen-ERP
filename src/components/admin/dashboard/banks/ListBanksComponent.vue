<template>
    <LoadingComponent :isLoading="isLoading" />
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>

        <!-- Buttons -->
        <div class="d-flex align-items-center justify-content-end mb-3">
            <!-- Add Button -->
            <router-link :to="{ name: 'admin.banks.create' }" class="btn btn-lg btn-main me-3">
                {{ $t('buttons.create') }}
            </router-link>

            <!-- Import/Export Dropdown -->
            <div class="dropdown">
                <button class="btn btn-lg btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {{ $t('buttons.import_export') }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end p-2">
                    <li>
                        <label class="dropdown-item mb-0" style="cursor: pointer;">
                            {{ $t('buttons.import_excel') }}
                            <input type="file" @change="importExcel" accept=".xlsx, .xls" class="d-none" />
                        </label>
                    </li>
                    <li><button class="dropdown-item" @click="exportExcel">{{ $t('buttons.export_excel') }}</button>
                    </li>
                    <li><button class="dropdown-item" @click="exportPDF">{{ $t('buttons.export_pdf') }}</button></li>
                    <li><button class="dropdown-item" @click="printTable">{{ $t('buttons.print') }}</button></li>
                </ul>
            </div>
        </div>

        <div class="row mb-4">
            <div class="col-12">
                <h3>{{ $t('label.banks') }}</h3>
            </div>
        </div>

        <!-- Search and Column Toggle -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="search-bar d-flex align-items-center flex-grow-1 me-3">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" :placeholder="$t('label.search_bank')" v-model="searchQuery" />
            </div>

            <div class="dropdown">
                <i class="bi bi-gear" type="button" data-bs-toggle="dropdown" aria-expanded="false"
                    style="font-size:1.5rem;cursor:pointer;"></i>
                <ul class="dropdown-menu align-center rounded-0 p-2" style="width: 250px;">
                    <li v-for="(field, index) in table.fields" :key="index">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="field.status"
                                :id="'col-' + index" />
                            <label class="form-check-label" :for="'col-' + index">{{ field.name }}</label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Banks Table -->
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-for="field in visibleFields" :key="field.key">{{ field.name }}</th>
                        <th>{{ $t('label.actions') }}</th>
                    </tr>
                </thead>
                <tbody class="table-body form">
                    <tr v-if="loading">
                        <td :colspan="visibleFields.length + 1" class="text-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </td>
                    </tr>
                    <tr v-else-if="paginatedItems.length === 0">
                        <td :colspan="visibleFields.length + 1" class="text-center">No items found</td>
                    </tr>
                    <tr v-else v-for="bank in paginatedItems" :key="bank.id">
                        <td v-for="field in visibleFields" :key="field.key">{{ bank[field.key] }}</td>
                        <td class="text-center">
                            <i class="bi bi-pencil action-icon me-2" title="Edit" @click="editItem(bank)"></i>
                            <i class="bi bi-trash action-icon" title="Delete" @click="deleteItem(bank)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-secondary" @click="prevPage" :disabled="currentPage === 1">
                {{ $t('buttons.previous') }}
            </button>
            <span>{{ $t('label.page') }} {{ currentPage }} {{ $t('label.of') }} {{ totalPages }}</span>
            <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">
                {{ $t('buttons.next') }}
            </button>
        </div>
    </div>
</template>

<script>
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default {
    name: 'BanksComponent',
    components: { LoadingComponent },
    data() {
        return {
            isLoading: false,
            searchQuery: "",
            currentPage: 1,
            perPage: 10,
            loading: false,
            table: {
                fields: [
                    { name: this.$t('label.bank_number'), key: 'bank_number', status: true },
                    { name: this.$t('label.bank_name'), key: 'bank_name', status: true },
                    { name: this.$t('label.account_number'), key: 'account_number', status: true },
                    { name: this.$t('label.account_name'), key: 'account_name', status: true },
                    { name: this.$t('label.branch_number'), key: 'branch_number', status: true },
                    { name: this.$t('label.branch_name'), key: 'branch_name', status: true },
                    { name: this.$t('label.phone'), key: 'phone', status: true },
                    { name: this.$t('label.fax_number'), key: 'fax_number', status: false },
                    { name: this.$t('label.notes'), key: 'notes', status: false },
                    { name: this.$t('label.email'), key: 'email', status: false }
                ]
            },
            banks: Array.from({ length: 20 }, (_, i) => ({
                id: i + 1,
                bank_number: `BNK-${1000 + i}`,
                bank_name: `البنك ${i + 1}`,
                account_number: `ACC-${2000 + i}`,
                account_name: `الحساب ${i + 1}`,
                branch_number: `BR-${i + 1}`,
                branch_name: `فرع ${i + 1}`,
                phone: `059${1000000 + i}`,
                fax_number: `08${2000 + i}`,
                notes: `ملاحظة ${i + 1}`,
                email: `bank${i + 1}@mail.com`
            }))
        };
    },
    computed: {
        visibleFields() { return this.table.fields.filter(f => f.status); },
        filteredBanks() {
            if (!this.searchQuery) return this.banks;
            const q = this.searchQuery.toLowerCase();
            return this.banks.filter(b =>
                b.bank_name.toLowerCase().includes(q) ||
                b.bank_number.toLowerCase().includes(q) ||
                b.phone.includes(q)
            );
        },
        paginatedItems() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredBanks.slice(start, start + this.perPage);
        },
        totalPages() { return Math.ceil(this.filteredBanks.length / this.perPage); }
    },
    methods: {
        editItem(bank) {
            this.$router.push({
                name: 'admin.banks.edit',
                params: { id: bank.id }
            });
        },
        deleteItem(bank) {
            Swal.fire({
                title: 'هل أنت متأكد من الحذف؟',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'حذف',
                cancelButtonText: 'إلغاء'
            }).then(result => {
                if (result.isConfirmed) {
                    this.banks = this.banks.filter(b => b.id !== bank.id);
                }
            });
        },
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },

        // Import/Export/Print logic
        importExcel(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                jsonData.forEach(item => {
                    this.banks.push({
                        id: this.banks.length + 1,
                        bank_number: item.bank_number || `BNK-${this.banks.length + 1}`,
                        bank_name: item.bank_name || 'No Name',
                        account_number: item.account_number || '-',
                        account_name: item.account_name || '-',
                        branch_number: item.branch_number || '-',
                        branch_name: item.branch_name || '-',
                        phone: item.phone || '-',
                        fax_number: item.fax_number || '-',
                        notes: item.notes || '-',
                        email: item.email || '-'
                    });
                });
            };
            reader.readAsArrayBuffer(file);
        },
        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.banks);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Banks");
            const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Banks.xlsx");
        },
        exportPDF() {
            const doc = new jsPDF();
            const columns = this.visibleFields.map(f => ({ header: f.name, dataKey: f.key }));
            const rows = this.banks.map(bank =>
                this.visibleFields.reduce((acc, f) => { acc[f.key] = bank[f.key]; return acc; }, {})
            );
            autoTable(doc, { columns, body: rows, startY: 20, styles: { fontSize: 8 }, headStyles: { fillColor: [29, 115, 66] } });
            doc.save("Banks.pdf");
        },
        printTable() {
            const printContent = this.$el.querySelector('.table-responsive').innerHTML;
            const WinPrint = window.open('', '', 'width=900,height=650');
            WinPrint.document.write('<html><head><title>Print</title></head><body>');
            WinPrint.document.write(printContent);
            WinPrint.document.write('</body></html>');
            WinPrint.document.close();
            WinPrint.focus();
            WinPrint.print();
            WinPrint.close();
        }
    }
};
</script>

<style>
.header th {
    background-color: #F4FFF0 !important;
}

.btn-main {
    background-color: #28a745;
    border-color: #28a745;
    border-radius: 4px;
    font-weight: 500;
}

.btn-main:hover {
    background-color: #218838;
    border-color: #1e7e34;
}

.action-icon {
    font-size: 1.3rem;
    cursor: pointer;
    margin: 0 5px;
}

.action-icon.bi-pencil {
    color: #ffc107;
}

.action-icon.bi-trash {
    color: #dc3545;
}

.action-icon:hover {
    transform: scale(1.2);
    opacity: 0.8;
}

.header th {
    background-color: #F4FFF0 !important;
}

.btn-main {
    background-color: #28a745;
    border-color: #28a745;
    border-radius: 4px;
    font-weight: 500;
}

.btn-main:hover {
    background-color: #218838;
    border-color: #1e7e34;
}

.action-icon {
    font-size: 1.3rem;
    cursor: pointer;
    margin: 0 5px;
    transition: transform 0.2s, opacity 0.3s;
}

.action-icon.bi-pencil {
    color: #ffc107;
}

.action-icon.bi-trash {
    color: #dc3545;
}

.action-icon:hover {
    transform: scale(1.2);
    opacity: 0.8;
}

.table-responsive {
    overflow-x: auto;
}

.search-bar input {
    max-width: 300px;
}

.dropdown-menu {
    min-width: 200px;
}
</style>