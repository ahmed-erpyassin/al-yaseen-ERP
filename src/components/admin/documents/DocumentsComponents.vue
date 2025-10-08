<template>
    <div class="container pe-5 ps-5">
        <!-- العنوان -->
        <h1><i class="bi bi-file-earmark-text-fill me-2"></i> المستندات</h1>

        <!-- أزرار التحكم -->
        <div class="d-flex align-items-center justify-content-end mb-4">
            <router-link :to="{ name: 'admin.documents.create' }" class="btn btn-lg btn-main me-3">
                <i class="bi bi-plus-lg me-2"></i>إضافة مستند جديد
            </router-link>

            <div class="dropdown">
                <button class="btn btn-lg btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    استيراد / تصدير
                </button>
                <ul class="dropdown-menu dropdown-menu-end p-2">
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
                <input type="text" class="form-control" placeholder="ابحث عن مستند أو مشروع..." v-model="searchQuery" />
            </div>

            <div class="dropdown">
                <i class="bi bi-gear" type="button" data-bs-toggle="dropdown" aria-expanded="false"
                    style="font-size:1.5rem;cursor:pointer;"></i>
                <ul class="dropdown-menu rounded-0 p-2" style="width: 250px;">
                    <li v-for="(field, index) in table.fields" :key="field.key">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="field.status"
                                :id="'col-' + index" />
                            <label class="form-check-label" :for="'col-' + index">{{ field.name }}</label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- الجدول -->
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-for="field in visibleFields" :key="field.key">{{ field.name }}</th>
                        <th>إجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="paginatedDocuments.length === 0">
                        <td :colspan="visibleFields.length + 1" class="text-center">لا توجد مستندات لعرضها</td>
                    </tr>
                    <tr v-for="(doc) in paginatedDocuments" :key="doc.id">
                        <td v-for="field in visibleFields" :key="field.key">{{ doc[field.key] }}</td>
                        <td>
                            <i class="bi bi-download action-icon text-primary me-2" @click="downloadDocument(doc)"
                                title="تحميل"></i>
                            <i class="bi bi-pencil action-icon text-warning me-2" @click="editDocument(doc)"
                                title="تعديل"></i>
                            <i class="bi bi-trash action-icon text-danger" @click="deleteDocument(doc)" title="حذف"></i>
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
import Swal from "sweetalert2";
import axios from "axios";

export default {
    name: "DocumentsComponent",
    data() {
        return {
            useApi: false,
            searchQuery: "",
            currentPage: 1,
            perPage: 8,
            documents: [],
            table: {
                fields: [
                    { name: "#", key: "id", status: true },
                    { name: "رقم المستند", key: "doc_id", status: true },
                    { name: "رقم المشروع", key: "project_id", status: true },
                    { name: "اسم المشروع", key: "project_name", status: true },
                    { name: "عنوان المستند", key: "title", status: true }
                ]
            }
        };
    },
    computed: {
        visibleFields() {
            return this.table.fields.filter(f => f.status);
        },
        filteredDocuments() {
            if (!this.searchQuery) return this.documents;
            const query = this.searchQuery.toLowerCase();
            return this.documents.filter(d =>
                Object.values(d).some(val => val?.toString().toLowerCase().includes(query))
            );
        },
        paginatedDocuments() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredDocuments.slice(start, start + this.perPage);
        },
        totalPages() {
            return Math.ceil(this.filteredDocuments.length / this.perPage) || 1;
        }
    },
    mounted() {
        if (this.useApi) this.fetchDocuments();
        else {
            this.documents = [
                { id: 1, doc_id: "D-100", project_id: "P-001", project_name: "مشروع البحر", title: "خطة المشروع", file_url: "#" },
                { id: 2, doc_id: "D-101", project_id: "P-002", project_name: "مشروع البرج", title: "مواصفات التصميم", file_url: "#" }
            ];
        }
    },
    methods: {
        async fetchDocuments() {
            try {
                const res = await axios.get("/api/documents");
                this.documents = res.data;
            } catch (err) {
                console.error(err);
                Swal.fire({ icon: "error", title: "فشل", text: "فشل في جلب المستندات!" });
            }
        },
        editDocument(doc) {
            console.log("Edit:", doc);
        },
        async deleteDocument(doc) {
            const result = await Swal.fire({
                title: "هل أنت متأكد من حذف المستند؟",
                text: `سيتم حذف المستند: ${doc.title}`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "نعم، احذف!",
                cancelButtonText: "إلغاء",
            });
            if (result.isConfirmed) {
                if (!this.useApi) {
                    this.documents = this.documents.filter(d => d.id !== doc.id);
                    Swal.fire("تم الحذف", "تم حذف المستند محلياً", "success");
                    return;
                }
                try {
                    await axios.delete(`/api/documents/${doc.id}`);
                    this.documents = this.documents.filter(d => d.id !== doc.id);
                    Swal.fire("تم الحذف", "تم حذف المستند بنجاح", "success");
                } catch (err) {
                    console.error(err);
                    Swal.fire("فشل", "فشل في حذف المستند من السيرفر", "error");
                }
            }
        },
        async downloadDocument(doc) {
            try {
                const res = await axios.get(`/api/documents/${doc.id}/download`, { responseType: 'blob' });
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', doc.title);
                document.body.appendChild(link);
                link.click();
                link.remove();
            } catch (err) {
                console.error(err);
                Swal.fire("فشل", "فشل في تحميل المستند!", "error");
            }
        },
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; }
    }
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

.action-icon {
    font-size: 1.3rem;
    cursor: pointer;
    transition: transform 0.2s, opacity 0.2s;
}

.action-icon:hover {
    transform: scale(1.2);
    opacity: 0.8;
}

.search-bar input {
    border-radius: 4px;
    padding: 0.5rem 1rem;
}
</style>
