<template>
  <div class="container pe-5 ps-5">
    <h1><i class="bi bi-file-earmark-plus"></i> إضافة مستند</h1>

    <div class="card p-4 shadow-sm">
      <form @submit.prevent="saveDocument" enctype="multipart/form-data">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label>رقم المستند</label>
            <input type="text" class="form-control" v-model="newDocument.doc_id" required />
          </div>
          <div class="col-md-6 mb-3">
            <label>رقم المشروع</label>
            <input type="text" class="form-control" v-model="newDocument.project_id" required />
          </div>
          <div class="col-md-6 mb-3">
            <label>اسم المشروع</label>
            <input type="text" class="form-control" v-model="newDocument.project_name" required />
          </div>
          <div class="col-md-6 mb-3">
            <label>عنوان المستند</label>
            <input type="text" class="form-control" v-model="newDocument.title" required />
          </div>
          <div class="col-md-12 mb-3">
            <label>ملف المستند</label>
            <input type="file" class="form-control" @change="handleFileUpload" required />
          </div>
        </div>
        <button type="submit" class="btn btn-success">إضافة المستند</button>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: "CreateDocumentsComponent",
  data() {
    return {
      useApi: false,
      newDocument: {
        doc_id: "",
        project_id: "",
        project_name: "",
        title: "",
        file: null,
      },
    };
  },
  methods: {
    handleFileUpload(event) {
      this.newDocument.file = event.target.files[0];
    },
    async saveDocument() {
      if (!this.newDocument.doc_id || !this.newDocument.project_id || !this.newDocument.project_name || !this.newDocument.title || !this.newDocument.file) {
        Swal.fire({ icon: "error", title: "فشل", text: "الرجاء تعبئة جميع الحقول!" });
        return;
      }

      try {
        if (this.useApi) {
          const formData = new FormData();
          formData.append("doc_id", this.newDocument.doc_id);
          formData.append("project_id", this.newDocument.project_id);
          formData.append("project_name", this.newDocument.project_name);
          formData.append("title", this.newDocument.title);
          formData.append("file", this.newDocument.file);

          await axios.post("/api/documents", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        }
        Swal.fire("تمت الإضافة", "تمت إضافة المستند بنجاح!", "success");

        // إعادة تعيين النموذج
        this.newDocument = { doc_id: "", project_id: "", project_name: "", title: "", file: null };
      } catch (err) {
        console.error(err);
        Swal.fire("فشل", "فشل في حفظ المستند!", "error");
      }
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 8px;
  background-color: #fff;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}
</style>
