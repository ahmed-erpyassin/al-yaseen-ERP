<template>
    <div class="container pe-5 ps-5">
        <!-- Page Title -->
        <h1><i class="bi bi-currency-exchange"></i> {{ $t('label.exchange_rates') }}</h1>

        <!-- Actions: Create & Import/Export -->
        <div class="d-flex align-items-center justify-content-end mb-3">
            <router-link :to="{ name: 'admin.currency-rates.manage' }" class="btn btn-lg btn-main me-3">
                {{ $t('buttons.create') }}
            </router-link>
            <div class="dropdown">
                <button class="btn btn-lg btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {{ $t('buttons.import_export') }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end p-2">
                    <li>
                        <label class="dropdown-item mb-0" style="cursor:pointer">
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

        <!-- Actions: Search & Column Toggle -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="search-bar d-flex align-items-center">
                <i class="bi bi-search me-2"></i>
                <input type="date" class="form-control" v-model="searchDate"
                    :placeholder="$t('label.search_by_date')" />
            </div>

            <!-- Column Toggle -->
            <div class="dropdown ms-5">
                <i class="bi bi-gear" type="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                <ul class="dropdown-menu align-center rounded-0 p-2" style="width:250px">
                    <li v-for="(th, index) in table.fields" :key="index">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="th.status" :id="'col' + index" />
                            <label class="form-check-label" :for="'col' + index">{{ th.name }}</label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Table -->
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-for="(th, index) in visibleFields" :key="index">{{ th.name }}</th>
                        <th>{{ $t('label.actions') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(rate, index) in paginatedItems" :key="index">
                        <td v-for="(field, findex) in visibleFields" :key="findex">
                            {{ rate[field.key] }}
                        </td>
                        <td class="text-center">
                            <i class="bi bi-pencil action-icon me-2" title="Edit" @click="editRate(rate)"></i>
                            <i class="bi bi-trash action-icon" title="Delete" @click="deleteRate(rate)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-secondary" @click="prevPage" :disabled="currentPage === 1">{{ $t('buttons.previous')
            }}</button>
            <span>{{ $t('label.page') }} {{ currentPage }} {{ $t('label.of') }} {{ totalPages }}</span>
            <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">{{
                $t('buttons.next') }}</button>
        </div>
    </div>
</template>

<script>
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default {
    name: "CurrencyRatesComponent",
    data() {
        return {
            searchDate: "",
            currentPage: 1,
            perPage: 10,
            table: {
                fields: [
                    { name: "Date", key: "date", status: true },
                    { name: "Time", key: "time", status: true },
                    { name: "USD", key: "USD", status: true },
                    { name: "EUR", key: "EUR", status: true },
                    { name: "CAD", key: "CAD", status: true },
                    { name: "TRY", key: "TRY", status: true },
                    { name: "JOD", key: "JOD", status: true },
                    { name: "OMR", key: "OMR", status: true },
                    { name: "SAR", key: "SAR", status: true },
                    { name: "QAR", key: "QAR", status: true },
                    { name: "AED", key: "AED", status: true },
                    { name: "KWD", key: "KWD", status: false },
                    { name: "EGP", key: "EGP", status: false },
                ]
            },
            rates: []
        }
    },
    computed: {
        visibleFields() { return this.table.fields.filter(f => f.status); },
        filteredItems() {
            if (!this.searchDate) return this.rates;
            return this.rates.filter(r => r.date === this.searchDate);
        },
        paginatedItems() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredItems.slice(start, start + this.perPage);
        },
        totalPages() { return Math.ceil(this.filteredItems.length / this.perPage); }
    },
    mounted() { this.fetchRates(); },
    methods: {
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },
        editRate(rate) { console.log("Edit rate:", rate); },
        deleteRate(rate) { this.rates = this.rates.filter(r => r !== rate); },
        importExcel(event) {
            const file = event.target.files[0]; if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const ws = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
                this.rates.push(...ws);
            };
            reader.readAsArrayBuffer(file);
        },
        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.rates);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Rates");
            saveAs(new Blob([XLSX.write(wb, { bookType: "xlsx", type: "array" })]), "Rates.xlsx");
        },
        exportPDF() {
            const doc = new jsPDF();
            const columns = this.visibleFields.map(f => ({ header: f.name, dataKey: f.key }));
            autoTable(doc, { columns, body: this.filteredItems });
            doc.save("Rates.pdf");
        },
        printTable() {
            const printContent = this.$el.querySelector(".table-responsive").innerHTML;
            const WinPrint = window.open("", "Print", "width=900,height=650");
            WinPrint.document.write('<html><head><title>Print</title></head><body>' + printContent + '</body></html>');
            WinPrint.document.close(); WinPrint.focus(); WinPrint.print(); WinPrint.close();
        },
        async fetchRates() {
            try {
                const res = await fetch("https://api.exchangerate.host/latest?base=USD");
                const data = await res.json();

                // تحقق من وجود data.rates
                if (!data || !data.rates) {
                    console.error("Rates data not found in API response", data);
                    return;
                }

                const now = new Date();
                this.rates = [{
                    date: now.toISOString().split('T')[0],
                    time: now.toTimeString().split(' ')[0],
                    USD: 1,
                    EUR: data.rates.EUR ?? 0,
                    CAD: data.rates.CAD ?? 0,
                    TRY: data.rates.TRY ?? 0,
                    JOD: data.rates.JOD ?? 0,
                    OMR: data.rates.OMR ?? 0,
                    SAR: data.rates.SAR ?? 0,
                    QAR: data.rates.QAR ?? 0,
                    AED: data.rates.AED ?? 0,
                    KWD: data.rates.KWD ?? 0,
                    EGP: data.rates.EGP ?? 0
                }];
            } catch (err) {
                console.error("Failed to fetch rates:", err);
            }
        }

    }
}
</script>

<style>
.header th {
    background-color: #F4FFF0 !important;
}

.action-icon {
    cursor: pointer;
    font-size: 1.3rem;
    transition: 0.2s;
    margin-right: 10px;
}

.action-icon:hover {
    transform: scale(1.2);
    opacity: 0.8;
}

.btn-main {
    background-color: #28a745;
    color: white;
}

.search-bar input {
    min-width: 180px;
}
</style>
