<template>
  <div class="container pe-5 ps-5">
    <!-- Page Title -->
    <h1><i class="bi bi-journal-text"></i> {{ $t('label.journal_entries') || 'قيود اليومية' }}</h1>

    <!-- Actions: Add & Import/Export -->
    <div class="d-flex align-items-center justify-content-end mb-3">
      <router-link :to="{ name: 'admin.accounting.journal_entries.create' }" class="btn btn-lg btn-main me-3">
        <i class="bi bi-plus-circle me-1"></i>
        {{ $t('buttons.add') || 'إضافة قيد جديد' }}
      </router-link>

      <div class="dropdown">
        <button
          class="btn btn-lg btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ $t('buttons.import_export') || 'استيراد / تصدير' }}
        </button>
        <ul class="dropdown-menu dropdown-menu-end p-2">
          <li>
            <label class="dropdown-item mb-0" style="cursor: pointer;">
              {{ $t('buttons.import_excel') || 'استيراد من Excel' }}
              <input type="file" @change="importExcel" accept=".xlsx, .xls" class="d-none" />
            </label>
          </li>
          <li><button class="dropdown-item" @click="exportExcel">{{ $t('buttons.export_excel') || 'تصدير إلى Excel' }}</button></li>
          <li><button class="dropdown-item" @click="exportPDF">{{ $t('buttons.export_pdf') || 'تصدير PDF' }}</button></li>
          <li><button class="dropdown-item" @click="printTable">{{ $t('buttons.print') || 'طباعة' }}</button></li>
        </ul>
      </div>
    </div>

    <!-- Section Title -->
    <div class="row mb-4">
      <div class="col-12">
        <h3>{{ $t('label.journal_entries_list') || 'سجل قيود اليومية' }}</h3>
      </div>
    </div>

    <!-- Actions: Search & Column Toggle -->
    <div class="d-flex align-items-center justify-content-between mb-3">
      <!-- Search -->
      <div class="search-bar d-flex align-items-center">
        <i class="bi bi-search me-2"></i>
        <input
          type="text"
          class="form-control"
          :placeholder="$t('label.search_journal_entry') || 'ابحث عن قيد...'"
          v-model="searchQuery"
        />
      </div>

      <!-- Column Toggle -->
      <div class="dropdown ms-5">
        <i class="bi bi-gear" type="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
        <ul class="dropdown-menu align-center rounded-0 p-2" style="width: 250px;">
          <li v-for="(th, index) in table.fields" :key="index">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="th.status"
                :id="'col' + index"
              />
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
            <th>{{ $t('label.actions') || 'العمليات' }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in paginatedItems" :key="entry.id">
            <td v-for="(field, index) in visibleFields" :key="index">
              {{ entry[field.key] }}
            </td>
            <td class="text-center">
              <i class="bi bi-eye action-icon me-2 text-success" title="عرض" @click="viewItem(entry)"></i>
              <i class="bi bi-pencil action-icon me-2 text-primary" title="تعديل" @click="editItem(entry)"></i>
              <i class="bi bi-trash action-icon text-danger" title="حذف" @click="deleteItem(entry)"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-content-between align-items-center mt-3">
      <button class="btn btn-secondary" @click="prevPage" :disabled="currentPage === 1">
        {{ $t('buttons.previous') || 'السابق' }}
      </button>
      <span>{{ $t('label.page') || 'الصفحة' }} {{ currentPage }} {{ $t('label.of') || 'من' }} {{ totalPages }}</span>
      <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">
        {{ $t('buttons.next') || 'التالي' }}
      </button>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="viewEntryModal" tabindex="-1" aria-labelledby="viewEntryModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title" id="viewEntryModalLabel">تفاصيل القيد</h5>
            <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <th>رقم القيد:</th>
                  <td>{{ selectedItem?.entry_number }}</td>
                  <th>التاريخ:</th>
                  <td>{{ selectedItem?.entry_date }}</td>
                </tr>
                <tr>
                  <th>الوصف:</th>
                  <td colspan="3">{{ selectedItem?.description }}</td>
                </tr>
                <tr>
                  <th>المبلغ:</th>
                  <td>{{ selectedItem?.amount }}</td>
                  <th>العملة:</th>
                  <td>{{ selectedItem?.currency }}</td>
                </tr>
                <tr>
                  <th>المستخدم:</th>
                  <td colspan="3">{{ selectedItem?.user }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              {{ $t('buttons.close') || 'إغلاق' }}
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
  name: "JournalEntriesListComponent",
  data() {
    return {
      searchQuery: "",
      currentPage: 1,
      perPage: 10,
      selectedItem: null,
      journalEntries: Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        entry_number: `JRN-${i + 100}`,
        entry_date: `2025-10-${(i % 30) + 1}`,
        description: `قيد محاسبي رقم ${i + 1}`,
        amount: (Math.random() * 10000).toFixed(2),
        currency: "ILS",
        user: ["محمد", "أحمد", "سارة", "ليلى", "يوسف"][i % 5],
      })),
      table: {
        fields: [
          { name: "رقم القيد", key: "entry_number", status: true },
          { name: "تاريخ القيد", key: "entry_date", status: true },
          { name: "الوصف", key: "description", status: true },
          { name: "المبلغ", key: "amount", status: true },
          { name: "العملة", key: "currency", status: true },
          { name: "المستخدم", key: "user", status: true },
        ],
      },
    };
  },
  computed: {
    visibleFields() {
      return this.table.fields.filter((f) => f.status);
    },
    filteredItems() {
      if (!this.searchQuery) return this.journalEntries;
      const q = this.searchQuery.toLowerCase();
      return this.journalEntries.filter(
        (e) =>
          e.entry_number.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.user.toLowerCase().includes(q)
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
      const modalEl = document.getElementById("viewEntryModal");
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    },
    closeModal() {
      const modalEl = document.getElementById("viewEntryModal");
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) modal.hide();
      this.selectedItem = null;
    },
    deleteItem(item) {
      Swal.fire({
        title: "هل أنت متأكد من الحذف؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "حذف",
        cancelButtonText: "إلغاء",
      }).then((result) => {
        if (result.isConfirmed) {
          this.journalEntries = this.journalEntries.filter((i) => i.id !== item.id);
          Swal.fire("تم الحذف!", "", "success");
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
        const firstSheet = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheet];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        jsonData.forEach((row) => {
          this.journalEntries.push({ id: this.journalEntries.length + 1, ...row });
        });
      };
      reader.readAsArrayBuffer(file);
    },
    exportExcel() {
      const ws = XLSX.utils.json_to_sheet(this.journalEntries);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "JournalEntries");
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      saveAs(new Blob([wbout], { type: "application/octet-stream" }), "JournalEntries.xlsx");
    },
    exportPDF() {
      const doc = new jsPDF();
      const columns = this.visibleFields.map((f) => ({ header: f.name, dataKey: f.key }));
      const rows = this.filteredItems.map((r) =>
        this.visibleFields.reduce((acc, field) => {
          acc[field.key] = r[field.key];
          return acc;
        }, {})
      );
      autoTable(doc, {
        columns,
        body: rows,
        startY: 20,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [29, 115, 66] },
      });
      doc.save("JournalEntries.pdf");
    },
    printTable() {
      const content = this.$el.querySelector(".table-responsive").innerHTML;
      const printWin = window.open("", "", "width=900,height=650");
      printWin.document.write(content);
      printWin.document.close();
      printWin.print();
    },
  },
};
</script>

<style scoped>
.header th {
  background-color: #F4FFF0 !important;
}
.action-icon {
  cursor: pointer;
  font-size: 1.1rem;
  transition: 0.2s;
}
.action-icon:hover {
  transform: scale(1.2);
}
.btn-main {
  background-color: #1D7342;
  border-color: #1D7342;
  color: #fff;
}
.btn-main:hover {
  background-color: #155b32;
}
.search-bar input {
  max-width: 300px;
}
</style>
