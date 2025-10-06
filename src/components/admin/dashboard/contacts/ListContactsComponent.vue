<template>
    <LoadingComponent :isLoading="isLoading" />
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>

        <!-- Buttons -->
        <div class="d-flex align-items-center justify-content-end mb-3">
            <router-link :to="{ name: 'admin.contacts.create' }" class="btn btn-lg btn-main me-3">
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

        <!-- Search and Column Toggle -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="search-bar d-flex align-items-center flex-grow-1 me-3">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" :placeholder="$t('label.search_contact')"
                    v-model="searchQuery" />
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

        <!-- Contacts Table -->
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
                    <tr v-else v-for="contact in paginatedItems" :key="contact.id">
                        <td v-for="field in visibleFields" :key="field.key">{{ contact[field.key] }}</td>
                        <td class="text-center">
                            <i class="bi bi-pencil action-icon me-2" title="Edit" @click="editItem(contact)"></i>
                            <i class="bi bi-trash action-icon" title="Delete" @click="deleteItem(contact)"></i>
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
    name: 'ContactsComponent',
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
                    { name: this.$t('label.name'), key: 'name', status: true },
                    { name: this.$t('label.statement'), key: 'statement', status: true },
                    { name: this.$t('label.address'), key: 'address', status: true },
                    { name: this.$t('label.phone'), key: 'phone', status: true },
                    { name: this.$t('label.mobile'), key: 'mobile', status: true },
                    { name: this.$t('label.fax_number'), key: 'fax_number', status: false },
                    { name: this.$t('label.notes'), key: 'notes', status: false },
                    { name: this.$t('label.email'), key: 'email', status: false }
                ]
            },
            contacts: Array.from({ length: 20 }, (_, i) => ({
                id: i + 1,
                name: `Contact ${i + 1}`,
                statement: i % 2 === 0 ? 'Active' : 'Inactive',
                address: `Street ${i + 1}`,
                phone: `059${1000000 + i}`,
                mobile: `059${2000000 + i}`,
                fax_number: `08${2000 + i}`,
                notes: `Note ${i + 1}`,
                email: `contact${i + 1}@mail.com`
            }))
        };
    },
    computed: {
        visibleFields() { return this.table.fields.filter(f => f.status); },
        filteredContacts() {
            if (!this.searchQuery) return this.contacts;
            const q = this.searchQuery.toLowerCase();
            return this.contacts.filter(c =>
                c.name.toLowerCase().includes(q) ||
                c.phone.includes(q) ||
                c.mobile.includes(q)
            );
        },
        paginatedItems() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredContacts.slice(start, start + this.perPage);
        },
        totalPages() { return Math.ceil(this.filteredContacts.length / this.perPage); }
    },
    methods: {
        editItem(contact) {
            this.$router.push({
                name: 'admin.contacts.edit',
                params: { id: contact.id }
            });
        },
        deleteItem(contact) {
            Swal.fire({
                title: 'هل أنت متأكد من الحذف؟',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'حذف',
                cancelButtonText: 'إلغاء'
            }).then(result => {
                if (result.isConfirmed) {
                    this.contacts = this.contacts.filter(c => c.id !== contact.id);
                }
            });
        },
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },

        // Import/Export/Print
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
                    this.contacts.push({
                        id: this.contacts.length + 1,
                        name: item.name || 'No Name',
                        statement: item.statement || 'Active',
                        address: item.address || '-',
                        phone: item.phone || '-',
                        mobile: item.mobile || '-',
                        fax_number: item.fax_number || '-',
                        notes: item.notes || '-',
                        email: item.email || '-'
                    });
                });
            };
            reader.readAsArrayBuffer(file);
        },
        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.contacts);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Contacts");
            const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Contacts.xlsx");
        },
        exportPDF() {
            const doc = new jsPDF();
            const columns = this.visibleFields.map(f => ({ header: f.name, dataKey: f.key }));
            const rows = this.contacts.map(contact =>
                this.visibleFields.reduce((acc, f) => { acc[f.key] = contact[f.key]; return acc; }, {})
            );
            autoTable(doc, { columns, body: rows, startY: 20, styles: { fontSize: 8 }, headStyles: { fillColor: [29, 115, 66] } });
            doc.save("Contacts.pdf");
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
