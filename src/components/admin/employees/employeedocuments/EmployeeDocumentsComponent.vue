<template>
    <LoadingComponent :isLoading="isLoading" />

    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-file-earmark-text"></i> {{ $t('label.documents') }}</h1>

        <!-- زر إضافة وثيقة -->
        <div class="d-flex align-items-center justify-content-end mb-3">
            <button class="btn btn-lg btn-main me-3" @click="openDocumentModal">
                {{ $t('buttons.add_document') }}
            </button>

            <!-- تصدير -->
            <div class="dropdown">
                <button class="btn btn-lg btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    {{ $t('buttons.import_export') }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end p-2">
                    <li><button class="dropdown-item" @click="exportExcel">{{ $t('buttons.export_excel') }}</button>
                    </li>
                    <li><button class="dropdown-item" @click="exportPDF">{{ $t('buttons.export_pdf') }}</button></li>
                    <li><button class="dropdown-item" @click="printTable">{{ $t('buttons.print') }}</button></li>
                </ul>
            </div>
        </div>

        <!-- بحث -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="search-bar d-flex align-items-center flex-grow-1 me-3">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" :placeholder="$t('label.search')" v-model="searchQuery" />
            </div>
        </div>

        <!-- جدول الوثائق -->
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-for="field in visibleFields" :key="field.key">{{ field.name }}</th>
                        <th>{{ $t('label.actions') }}</th>
                    </tr>
                </thead>
                <tbody class="table-body form">
                    <tr v-if="isLoading">
                        <td :colspan="visibleFields.length + 1" class="text-center">
                            <div class="spinner-border" role="status"></div>
                        </td>
                    </tr>
                    <tr v-else-if="paginatedDocuments.length === 0">
                        <td :colspan="visibleFields.length + 1" class="text-center">No documents found</td>
                    </tr>
                    <tr v-else v-for="doc in paginatedDocuments" :key="doc.id"
                        :class="{ 'table-warning': isNearExpiry(doc.expiry_date) }">
                        <td v-for="field in visibleFields" :key="field.key">
                            <span v-if="field.key !== 'file'">{{ doc[field.key] }}</span>
                            <a v-else :href="doc.file" target="_blank">Download</a>
                        </td>
                        <td class="text-center">
                            <i class="bi bi-eye action-icon me-2" title="View" @click="viewDocument(doc)"></i>
                            <i class="bi bi-pencil action-icon me-2" title="Edit" @click="editDocument(doc)"></i>
                            <i class="bi bi-trash action-icon" title="Delete" @click="deleteDocument(doc)"></i>
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

        <!-- Modal: Add/Edit Document -->
        <div class="modal fade" id="documentModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-md">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">{{ documentModalTitle }}</h5>
                        <button type="button" class="btn-close btn-close-white" @click="closeDocumentModal"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label>{{ $t('label.employee') }}</label>
                                <input v-model="editDocumentData.employee_name" type="text" class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label>{{ $t('label.document_name') }}</label>
                                <input v-model="editDocumentData.document_name" type="text" class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label>{{ $t('label.document_type') }}</label>
                                <input v-model="editDocumentData.document_type" type="text" class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label>{{ $t('label.expiry_date') }}</label>
                                <input v-model="editDocumentData.expiry_date" type="date" class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label>{{ $t('label.file') }}</label>
                                <input type="file" class="form-control" @change="handleFileUpload" />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" @click="closeDocumentModal">{{ $t('buttons.close') }}</button>
                        <button class="btn btn-main" @click="saveDocument">{{ $t('buttons.save') }}</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import Swal from 'sweetalert2';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as bootstrap from 'bootstrap';

export default {
    name: 'DocumentsComponent',
    components: { LoadingComponent },
    data() {
        return {
            isLoading: true,
            useApi: false, // <-- ضع true لاستخدام API
            searchQuery: '',
            currentPage: 1,
            perPage: 10,
            selectedDocument: null,
            documents: [],
            editDocumentData: {},
            documentModalTitle: 'Add Document',
            table: {
                fields: [
                    { name: 'Employee', key: 'employee_name', status: true },
                    { name: 'Document Name', key: 'document_name', status: true },
                    { name: 'Type', key: 'document_type', status: true },
                    { name: 'Expiry Date', key: 'expiry_date', status: true },
                    { name: 'File', key: 'file', status: true },
                ]
            }
        };
    },
    computed: {
        visibleFields() { return this.table.fields.filter(f => f.status); },
        filteredDocuments() {
            if (!this.searchQuery) return this.documents;
            const q = this.searchQuery.toLowerCase();
            return this.documents.filter(d =>
                (d.employee_name || '').toLowerCase().includes(q) ||
                (d.document_name || '').toLowerCase().includes(q) ||
                (d.document_type || '').toLowerCase().includes(q)
            );
        },
        paginatedDocuments() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredDocuments.slice(start, start + this.perPage);
        },
        totalPages() {
            return Math.ceil(this.filteredDocuments.length / this.perPage);
        }
    },
    methods: {
        async fetchDocuments() {
            this.isLoading = true;
            if (this.useApi) {
                try {
                    const res = await axios.get('{{baseUrl}}/api/v1/documents');
                    this.documents = res.data.data || res.data;
                } catch (err) {
                    console.error(err);
                    Swal.fire('Error', 'Failed to fetch documents', 'error');
                } finally {
                    this.isLoading = false;
                }
            } else {
                // بيانات وهمية عند useApi=false
                this.documents = [
                    { id: 1, employee_name: 'Ali', document_name: 'ID Card', document_type: 'Identity', expiry_date: '2025-12-01', file: '#' },
                    { id: 2, employee_name: 'Sara', document_name: 'Passport', document_type: 'Travel', expiry_date: '2025-11-15', file: '#' },
                ];
                this.isLoading = false;
            }
        },
        isNearExpiry(expiryDate) {
            if (!expiryDate) return false;
            const today = new Date();
            const expiry = new Date(expiryDate);
            const diff = (expiry - today) / (1000 * 60 * 60 * 24);
            return diff <= 30; // أقل من 30 يوم
        },
        openDocumentModal() {
            this.editDocumentData = { employee_name: '', document_name: '', document_type: '', expiry_date: '', file: '' };
            this.documentModalTitle = 'Add Document';
            new bootstrap.Modal(document.getElementById('documentModal')).show();
        },
        editDocument(doc) {
            this.editDocumentData = { ...doc };
            this.documentModalTitle = 'Edit Document';
            new bootstrap.Modal(document.getElementById('documentModal')).show();
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                // يمكن استخدام FormData للرفع على API لاحقًا
                this.editDocumentData.file = URL.createObjectURL(file);
            }
        },
        saveDocument() {
            if (this.useApi) {
                if (this.editDocumentData.id) {
                    axios.put(`{{baseUrl}}/api/v1/documents/${this.editDocumentData.id}`, this.editDocumentData)
                        .then(() => { Swal.fire('Success', 'Updated', 'success'); this.fetchDocuments(); this.closeDocumentModal(); })
                        .catch(() => Swal.fire('Error', 'Failed to update', 'error'));
                } else {
                    axios.post(`{{baseUrl}}/api/v1/documents`, this.editDocumentData)
                        .then(() => { Swal.fire('Success', 'Added', 'success'); this.fetchDocuments(); this.closeDocumentModal(); })
                        .catch(() => Swal.fire('Error', 'Failed to add', 'error'));
                }
            } else {
                if (this.editDocumentData.id) {
                    const idx = this.documents.findIndex(d => d.id === this.editDocumentData.id);
                    if (idx !== -1) this.documents.splice(idx, 1, { ...this.editDocumentData });
                } else {
                    this.editDocumentData.id = this.documents.length + 1;
                    this.documents.push({ ...this.editDocumentData });
                }
                this.closeDocumentModal();
                Swal.fire('Success', 'Saved locally', 'success');
            }
        },
        deleteDocument(doc) {
            Swal.fire({ title: 'Confirm Delete?', icon: 'warning', showCancelButton: true })
                .then(res => {
                    if (res.isConfirmed) {
                        if (this.useApi) {
                            axios.delete(`{{baseUrl}}/api/v1/documents/${doc.id}`)
                                .then(() => this.fetchDocuments())
                                .catch(() => Swal.fire('Error', 'Failed to delete', 'error'));
                        } else {
                            const idx = this.documents.findIndex(d => d.id === doc.id);
                            if (idx !== -1) this.documents.splice(idx, 1);
                        }
                    }
                });
        },
        viewDocument(doc) {
            this.selectedDocument = doc;
            Swal.fire({
                title: doc.document_name,
                html: `<p>Employee: ${doc.employee_name}</p>
                       <p>Type: ${doc.document_type}</p>
                       <p>Expiry Date: ${doc.expiry_date}</p>
                       <p><a href="${doc.file}" target="_blank">Download File</a></p>`
            });
        },
        closeDocumentModal() {
            const modal = bootstrap.Modal.getInstance(document.getElementById('documentModal'));
            if (modal) modal.hide();
        },
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },
        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.documents);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Documents');
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Documents.xlsx');
        },
        exportPDF() {
            const doc = new jsPDF();
            const columns = this.visibleFields.map(f => ({ header: f.name, dataKey: f.key }));
            const rows = this.documents.map(d => {
                const row = {};
                this.visibleFields.forEach(f => { row[f.key] = d[f.key]; });
                return row;
            });
            autoTable(doc, { head: [columns.map(c => c.header)], body: rows.map(r => columns.map(c => r[c.dataKey])) });
            doc.save('Documents.pdf');
        },
        printTable() {
            const printContent = document.createElement('div');
            const tableClone = document.querySelector('.table-responsive table').cloneNode(true);
            printContent.appendChild(tableClone);
            const newWin = window.open('', '', 'width=900,height=700');
            newWin.document.write('<html><head><title>Print</title>');
            newWin.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">');
            newWin.document.write('</head><body>');
            newWin.document.write(printContent.innerHTML);
            newWin.document.write('</body></html>');
            newWin.document.close();
            newWin.focus();
            newWin.print();
            newWin.close();
        }
    },
    mounted() {
        this.fetchDocuments();
    }
};
</script>


<style scoped>
.action-icon {
    cursor: pointer;
    font-size: 1.2rem;
}

.table-warning {
    background-color: #fff3cd !important;
}
</style>
