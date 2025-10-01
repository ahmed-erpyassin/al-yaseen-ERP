<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-file-earmark-text"></i> المستندات</h1>

        <div class="action-buttons mb-4">
            <router-link :to="{ name: 'admin.documents.create' }" class="btn btn-success">
                إضافة مستند جديد
            </router-link>
        </div>

        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th>#</th>
                        <th>رقم المستند</th>
                        <th>رقم المشروع</th>
                        <th>اسم المشروع</th>
                        <th>عنوان المستند</th>
                        <th>الملف</th>
                        <th>إجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(doc, index) in documents" :key="doc.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ doc.doc_id }}</td>
                        <td>{{ doc.project_id }}</td>
                        <td>{{ doc.project_name }}</td>
                        <td>{{ doc.title }}</td>
                        <td>
                            <button class="btn btn-sm" @click="downloadDocument(doc)">تحميل</button>
                        </td>

                        <td>
                            <i class="bi bi-pencil action-icon text-warning" @click="editDocument(doc)"></i>
                            <i class="bi bi-trash action-icon text-danger" @click="deleteDocument(doc)"></i>
                        </td>
                    </tr>
                    <tr v-if="documents.length === 0">
                        <td colspan="7">لا توجد مستندات لعرضها</td>
                    </tr>
                </tbody>
            </table>
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
            useApi: false, // true = استخدام API
            documents: [],
        };
    },
    mounted() {
        if (this.useApi) this.fetchDocuments();
        else {
            // بيانات وهمية
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
            // يمكن فتح صفحة تعديل المستند أو modal
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
        }

    }
};
</script>

<style scoped>
.action-icon {
    cursor: pointer;
    font-size: 1.2rem;
    margin: 0 5px;
}

.text-warning {
    color: #ffc107;
}

.text-danger {
    color: #dc3545;
}
</style>
