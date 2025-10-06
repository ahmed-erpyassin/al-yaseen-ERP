<template>
    <div class="container pe-5 ps-5">
        <!-- Page Title -->
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>

        <!-- Actions: Add & Import/Export -->
        <div class="d-flex align-items-center justify-content-end mb-3">
            <router-link :to="{ name: 'admin.new-account' }" class="btn btn-lg btn-main me-3">
                {{ $t('buttons.add') }}
            </router-link>

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
                    <li>
                        <button class="dropdown-item" @click="exportExcel">{{ $t('buttons.export_excel') }}</button>
                    </li>
                    <li><button class="dropdown-item" @click="exportPDF">{{ $t('buttons.export_pdf') }}</button></li>
                    <li><button class="dropdown-item" @click="printTable">{{ $t('buttons.print') }}</button></li>
                </ul>
            </div>
        </div>

        <!-- Section Title -->
        <div class="row mb-4">
            <div class="col-12">
                <h3>{{ $t('aside.chart_of_accounts') }}</h3>
            </div>
        </div>

        <!-- Actions: Search & Column Toggle -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <!-- Search -->
            <div class="search-bar d-flex align-items-center">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" :placeholder="$t('label.search_account')"
                    v-model="searchQuery" />
            </div>

            <!-- Column Toggle -->
            <div class="dropdown ms-5">
                <i class="bi bi-gear" type="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                <ul class="dropdown-menu align-center rounded-0 p-2" style="width: 250px;">
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
                    <tr v-for="account in paginatedItems" :key="account.id">
                        <td v-for="(field, index) in visibleFields" :key="index">
                            {{ account[field.key] }}
                        </td>
                        <td class="text-center">
                            <i class="bi bi-eye action-icon me-2" :title="$t('buttons.check')"
                                @click="viewItem(account)"></i>
                            <i class="bi bi-pencil action-icon me-2" :title="$t('buttons.edit')"
                                @click="editItem(account)"></i>
                            <i class="bi bi-trash action-icon" :title="$t('buttons.delete')"
                                @click="deleteItem(account)"></i>
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

        <!-- Popup Modal -->
        <div class="modal fade" id="viewItemModal" tabindex="-1" aria-labelledby="viewItemModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title" id="viewItemModalLabel">
                            {{ selectedItem?.account_name || 'تفاصيل الحساب' }}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <th>رقم الحساب:</th>
                                    <td>{{ selectedItem?.account_number }}</td>
                                    <th>الرصيد:</th>
                                    <td>{{ selectedItem?.account_balance }} {{ selectedItem?.balance_currency }}</td>
                                </tr>
                                <tr>
                                    <th>المستوى:</th>
                                    <td>{{ selectedItem?.level }}</td>
                                    <th>نوع الحساب:</th>
                                    <td>{{ selectedItem?.account_type }}</td>
                                </tr>
                                <tr>
                                    <th>التصنيف:</th>
                                    <td>{{ selectedItem?.classification }}</td>
                                    <th>نوع التقرير:</th>
                                    <td>{{ selectedItem?.report_type }}</td>
                                </tr>
                                <tr>
                                    <th>الطبيعة:</th>
                                    <td>{{ selectedItem?.nature }}</td>
                                    <th>الحساب المفتوح:</th>
                                    <td>{{ selectedItem?.account_opened }}</td>
                                </tr>
                                <tr>
                                    <th>الحساب المرتبط:</th>
                                    <td>{{ selectedItem?.related_account }}</td>
                                    <th>الحالة:</th>
                                    <td>{{ selectedItem?.status }}</td>
                                </tr>
                                <tr>
                                    <th>الملاحظات:</th>
                                    <td colspan="3">{{ selectedItem?.notes }}</td>
                                </tr>
                                <tr>
                                    <th>العملة:</th>
                                    <td colspan="3">{{ selectedItem?.currency }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal">
                            {{ $t('buttons.close') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as bootstrap from "bootstrap";

export default {
    name: "AccountsListComponent",
    data() {
        return {
            searchQuery: "",
            currentPage: 1,
            perPage: 10,
            selectedItem: null,
            accounts: Array.from({ length: 20 }, (_, i) => ({
                id: i + 1,
                account_number: `ACC-${i + 1}`,
                account_name: `Account ${i + 1}`,
                account_balance: (Math.random() * 10000).toFixed(2),
                balance_currency: "USD",
                level: (i % 5) + 1,
                account_type: ["Asset", "Liability", "Equity", "Revenue", "Expense"][i % 5],
                classification: ["Current", "Non-Current"][i % 2],
                report_type: ["Balance Sheet", "Income Statement"][i % 2],
                nature: ["Debit", "Credit"][i % 2],
                account_opened: "2023-01-01",
                related_account: `REL-${(i % 10) + 1}`,
                status: ["Active", "Inactive"][i % 2],
                notes: `Notes ${i + 1}`,
                currency: ["USD", "EUR", "ILS"][i % 3],
            })),
            table: {
                fields: [
                    { name: "رقم الحساب", key: "account_number", status: true },
                    { name: "اسم الحساب", key: "account_name", status: true },
                    { name: "رصيد الحساب", key: "account_balance", status: true },
                    { name: "الرصيد (العملة)", key: "balance_currency", status: true },
                    { name: "المستوى", key: "level", status: true },
                    { name: "نوع الحساب", key: "account_type", status: true },
                    { name: "التصنيف", key: "classification", status: true },
                    { name: "نوع التقرير", key: "report_type", status: true },
                    { name: "الطبيعة", key: "nature", status: true },
                    { name: "الحساب المفتوح", key: "account_opened", status: true },
                    { name: "الحساب المرتبط", key: "related_account", status: true },
                    { name: "الحالة", key: "status", status: true },
                    { name: "ملاحظات", key: "notes", status: true },
                    { name: "العملة", key: "currency", status: true },
                ],
            },
        };
    },
    computed: {
        visibleFields() {
            return this.table.fields.filter((field) => field.status);
        },
        filteredItems() {
            if (!this.searchQuery) return this.accounts;
            const query = this.searchQuery.toLowerCase();
            return this.accounts.filter(
                (acc) =>
                    acc.account_number.toLowerCase().includes(query) ||
                    acc.account_name.toLowerCase().includes(query)
            );
        },
        paginatedItems() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredItems.slice(start, start + this.perPage);
        },
        totalPages() {
            return Math.ceil(this.filteredItems.length / this.perPage);
        },
    },
    methods: {
        viewItem(item) {
            this.selectedItem = item;
            const modalEl = document.getElementById("viewItemModal");
            const modal = new bootstrap.Modal(modalEl);
            modal.show();
        },
        closeModal() {
            const modalEl = document.getElementById("viewItemModal");
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
            this.selectedItem = null;
        },
        editItem(item) {
            this.$router.push({
                name: 'admin.account-edit',
                params: { id: item.id }
            });
        },
        deleteItem(item) {
            Swal.fire({
                title: this.$t("messages.confirm_delete"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#dc3545",
                cancelButtonColor: "#6c757d",
                confirmButtonText: this.$t("buttons.delete"),
                cancelButtonText: this.$t("buttons.cancel"),
            }).then((result) => {
                if (result.isConfirmed) {
                    this.accounts = this.accounts.filter((i) => i.id !== item.id);
                    Swal.fire({
                        title: this.$t("messages.item_deleted"),
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                }
            });
        },
        prevPage() {
            if (this.currentPage > 1) this.currentPage--;
        },
        nextPage() {
            if (this.currentPage < this.totalPages) this.currentPage++;
        },
        importExcel(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                jsonData.forEach((acc) => {
                    this.accounts.push({
                        id: this.accounts.length + 1,
                        ...acc,
                    });
                });
            };
            reader.readAsArrayBuffer(file);
        },
        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.accounts);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Accounts");
            const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Accounts.xlsx");
        },
        exportPDF() {
            const doc = new jsPDF();
            const columns = this.visibleFields.map((f) => ({ header: f.name, dataKey: f.key }));
            const rows = this.filteredItems.map((acc) =>
                this.visibleFields.reduce((accum, field) => {
                    accum[field.key] = acc[field.key];
                    return accum;
                }, {})
            );
            autoTable(doc, {
                columns,
                body: rows,
                startY: 20,
                styles: { fontSize: 8 },
                headStyles: { fillColor: [29, 115, 66] },
            });
            doc.save("accounts.pdf");
        },
        printTable() {
            const printContent = this.$el.querySelector(".table-responsive").innerHTML;
            const WinPrint = window.open("", "", "width=900,height=650");
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
