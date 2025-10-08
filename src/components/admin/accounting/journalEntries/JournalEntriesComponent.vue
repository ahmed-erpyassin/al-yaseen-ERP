<template>
    <div class="container pe-5 ps-5">
        <!-- Title -->
        <h1><i class="bi bi-currency-dollar"></i> {{ $t('label.journal_entries') }}</h1>

        <!-- Action Buttons -->
        <div class="d-flex align-items-center justify-content-end mb-4">
            <router-link :to="{ name: 'admin.accounting.journal_entries.create' }" class="btn btn-success text-white">
                <i class="bi bi-plus me-2"></i>{{ $t('buttons.create') }}
            </router-link>

            <button class="btn btn-primary ms-2" @click="exportOptions">
                <i class="bi bi-file-earmark-arrow-down me-2"></i>تصدير
            </button>
        </div>

        <!-- Search & Filter -->
        <div class="d-flex align-items-center actions mb-3 flex-wrap">
            <div class="search me-2 mb-3 d-flex align-items-center">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control d-inline-block w-auto" v-model="searchQuery"
                    :placeholder="$t('label.search_journal_entry')" />
            </div>
            <div class="dropdown me-4 mb-3">
                <i class="bi bi-gear" type="button" data-bs-toggle="dropdown"></i>
                <ul class="dropdown-menu align-center rounded-0 p-2" style="width: 250px;">
                    <li v-for="(th, index) in table.fields" :key="index" @click="th.status = !th.status">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" :checked="th.status" :id="'col' + index">
                            <label class="form-check-label" :for="'col' + index">{{ th.name }}</label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Journal Entries Table -->
        <div class="table-responsive mb-4">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-for="(th, index) in visibleFields" :key="index">{{ th.name }}</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="entry in filteredEntries" :key="entry.id">
                        <td v-for="field in visibleFields" :key="field.key">{{ entry[field.key] }}</td>
                        <td>
                            <i class="bi bi-pencil action-icon text-warning me-2" @click="editEntry(entry)"
                                title="تعديل"></i>
                            <i class="bi bi-trash action-icon text-danger" @click="deleteEntry(entry)" title="حذف"></i>
                        </td>
                    </tr>
                    <tr v-if="filteredEntries.length === 0">
                        <td :colspan="visibleFields.length + 1" class="text-center">لا توجد قيود</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Add/Edit Entry Modal -->
        <div class="modal fade" id="entryModal" tabindex="-1" aria-hidden="true" ref="entryModal">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div
                        :class="['modal-header', modalType === 'add' ? 'bg-success text-white' : 'bg-warning text-dark']">
                        <h5 class="modal-title">{{ modalTitle }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="saveEntry">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label>{{ $t('label.entry_date') }}</label>
                                    <input type="date" class="form-control" v-model="modalEntry.date" required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>{{ $t('label.entry_time') }}</label>
                                    <input type="time" class="form-control" v-model="modalEntry.time" required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>{{ $t('label.entry_amount') }}</label>
                                    <input type="number" class="form-control" v-model="modalEntry.amount" required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>{{ $t('label.entry_currency') }}</label>
                                    <input type="text" class="form-control" v-model="modalEntry.currency" required />
                                </div>
                                <div class="col-12 mb-3">
                                    <label>{{ $t('label.entry_description') }}</label>
                                    <textarea class="form-control" v-model="modalEntry.description" rows="3"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                        <button type="button" :class="['btn', modalType === 'add' ? 'btn-success' : 'btn-warning']"
                            @click="saveEntry">حفظ</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default {
    name: "JournalEntriesComponent",
    data() {
        return {
            useApi: true, // غيرها ل true لو عندك API جاهز
            searchQuery: "",
            entries: [],
            modalEntry: {},
            modalType: "",
            modalTitle: "",
            bsModal: null,
            table: {
                fields: [
                    { name: this.$t('label.entry_number'), key: 'number', status: true },
                    { name: this.$t('label.entry_date'), key: 'date', status: true },
                    { name: this.$t('label.entry_time'), key: 'time', status: true },
                    { name: this.$t('label.entry_amount'), key: 'amount', status: true },
                    { name: this.$t('label.entry_currency'), key: 'currency', status: true },
                    { name: this.$t('label.entry_description'), key: 'description', status: true },
                    { name: this.$t('label.user'), key: 'user', status: true }
                ]
            }
        };
    },
    computed: {
        visibleFields() {
            return this.table.fields.filter(f => f.status);
        },
        filteredEntries() {
            if (!this.searchQuery) return this.entries;
            const q = this.searchQuery.toLowerCase();
            return this.entries.filter(e =>
                e.number.toLowerCase().includes(q) ||
                e.description.toLowerCase().includes(q) ||
                e.user.toLowerCase().includes(q)
            );
        }
    },
    mounted() {
        this.bsModal = new bootstrap.Modal(this.$refs.entryModal);
        this.fetchEntries();
    },
    methods: {
        async fetchEntries() {
            if (this.useApi) {
                try {
                    const res = await axios.get("/api/journal-entries");
                    this.entries = res.data;
                } catch (e) {
                    Swal.fire("خطأ", "فشل في جلب البيانات من السيرفر", "error");
                }
            } else {
                this.entries = [
                    { id: 1, number: "JE001", date: "2025-09-01", time: "09:00", amount: 1000, currency: "USD", description: "دفعة أولى", user: "أحمد" },
                    { id: 2, number: "JE002", date: "2025-09-03", time: "11:00", amount: 500, currency: "USD", description: "مصاريف", user: "ليلى" }
                ];
            }
        },
        openAddEntryModal() {
            this.modalEntry = { date: "", time: "", amount: 0, currency: "USD", description: "", user: "" };
            this.modalType = "add";
            this.modalTitle = "إضافة قيد";
            this.bsModal.show();
        },
        editEntry(entry) {
            this.modalEntry = { ...entry };
            this.modalType = "edit";
            this.modalTitle = "تعديل القيد";
            this.bsModal.show();
        },
        async saveEntry() {
            if (this.useApi) {
                try {
                    if (this.modalType === "add") {
                        const res = await axios.post("/api/journal-entries", this.modalEntry);
                        this.entries.push(res.data);
                    } else {
                        const res = await axios.put(`/api/journal-entries/${this.modalEntry.id}`, this.modalEntry);
                        const idx = this.entries.findIndex(e => e.id === this.modalEntry.id);
                        if (idx !== -1) this.entries.splice(idx, 1, res.data);
                    }
                    Swal.fire("نجاح", "تم حفظ القيد بنجاح", "success");
                } catch (e) {
                    Swal.fire("خطأ", "فشل في حفظ البيانات", "error");
                }
            } else {
                if (this.modalType === "add") {
                    this.modalEntry.id = Date.now();
                    this.entries.push({ ...this.modalEntry });
                } else {
                    const idx = this.entries.findIndex(e => e.id === this.modalEntry.id);
                    if (idx !== -1) this.entries.splice(idx, 1, { ...this.modalEntry });
                }
            }
            this.bsModal.hide();
        },
        async deleteEntry(entry) {
            const result = await Swal.fire({
                title: "هل أنت متأكد من الحذف؟",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "حذف",
                cancelButtonText: "إلغاء"
            });
            if (!result.isConfirmed) return;

            if (this.useApi) {
                try { await axios.delete(`/api/journal-entries/${entry.id}`); }
                catch { Swal.fire("خطأ", "فشل الحذف", "error"); return; }
            }
            this.entries = this.entries.filter(e => e.id !== entry.id);
            Swal.fire("تم", "تم حذف القيد بنجاح", "success");
        },
        exportOptions() {
            Swal.fire({
                title: 'اختر نوع التصدير',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Excel`,
                denyButtonText: `PDF`,
            }).then((result) => {
                if (result.isConfirmed) this.exportExcel();
                else if (result.isDenied) this.exportPDF();
            });
        },
        exportExcel() {
            const data = this.entries.map(e => ({
                الرقم: e.number, التاريخ: e.date, الوقت: e.time,
                المبلغ: e.amount, العملة: e.currency, الوصف: e.description, المستخدم: e.user
            }));
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "JournalEntries");
            const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            saveAs(new Blob([wbout], { type: "application/octet-stream" }), "JournalEntries.xlsx");
        },
        exportPDF() {
            const pdf = new jsPDF();
            const columns = ["الرقم", "التاريخ", "الوقت", "المبلغ", "العملة", "الوصف", "المستخدم"];
            const rows = this.entries.map(e => [e.number, e.date, e.time, e.amount, e.currency, e.description, e.user]);
            autoTable(pdf, { head: [columns], body: rows });
            pdf.save("JournalEntries.pdf");
        }
    }
};
</script>

<style scoped>
.header th {
    background-color: #F4FFF0 !important;
}

.action-icon {
    font-size: 1.3rem;
    cursor: pointer;
    transition: transform 0.2s;
}

.action-icon:hover {
    transform: scale(1.2);
}

.table-responsive {
    max-height: 500px;
    overflow-y: auto;
}
</style>
