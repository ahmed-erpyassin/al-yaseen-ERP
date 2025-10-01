<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>

        <!-- Action Buttons -->
        <div class="d-flex align-items-center justify-content-end mb-4">
            <button type="button" class="btn btn-lg btn-outline-secondary me-3" @click="cancelForm">
                {{ $t('buttons.cancel') }}
            </button>
            <button type="button" class="btn btn-lg btn-success" @click="saveForm">
                {{ $t('buttons.save') }}
            </button>
        </div>

        <form class="form">
            <div class="row">
                <div class="col-12 mb-4">
                    <h3>{{ $t('label.new_project') }}</h3>
                </div>

                <!-- Notebook -->
                <div class="col-md-2 mb-3">
                    <label class="form-label">{{ $t('label.notebook') }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.notebook" />
                </div>

                <!-- Invoice No -->
                <div class="col-md-2 mb-3">
                    <label class="form-label">{{ $t('label.invoice_no') }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.invoice_no" />
                </div>

                <!-- Date -->
                <div class="col-md-2 mb-3">
                    <label class="form-label">{{ $t('label.date') }}</label>
                    <input type="date" class="form-control rounded-1" v-model="form.date" />
                </div>

                <!-- Hour -->
                <div class="col-md-2 mb-3">
                    <label class="form-label">{{ $t('label.hour') }}</label>
                    <input type="time" class="form-control rounded-1" v-model="form.hour" />
                </div>
            </div>

            <div class="row mb-5">
                <!-- Customer Info -->
                <div class="col-md-2 mb-3">
                    <label class="form-label">{{ $t('label.customer_no') }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.customer_no" />
                </div>

                <div class="col-md-4 mb-3">
                    <label class="form-label">{{ $t('label.name') }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.customer_name" />
                </div>

                <div class="col-md-3 mb-3">
                    <label class="form-label">{{ $t('label.email') }}</label>
                    <input type="email" class="form-control rounded-1" v-model="form.email" />
                </div>

                <div class="col-md-4 mb-3">
                    <label class="form-label">{{ $t('label.licensed_operator') }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.licensed_operator" />
                </div>

                <div class="col-md-2 mb-3">
                    <label class="form-label">{{ $t('label.currency') }} 1</label>
                    <input type="text" class="form-control rounded-1" v-model="form.currency1" />
                </div>

                <div class="col-md-2 mb-3">
                    <label class="form-label">{{ $t('label.currency') }} 2</label>
                    <input type="text" class="form-control rounded-1" v-model="form.currency2" />
                </div>
            </div>

            <h3 class="mb-3">{{ $t('label.project_information') }}</h3>

            <div class="row mb-4">
                <div class="col-md-3 mb-3">
                    <label class="form-label">{{ $t('label.project_name') }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.project_name" />
                </div>

                <div class="col-md-3 mb-3">
                    <label class="form-label">{{ $t('label.project_manager_name') }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.project_manager_name" />
                </div>

                <div class="col-md-2 mb-3">
                    <label class="form-label">{{ $t('label.project_value') }}</label>
                    <input type="number" class="form-control rounded-1" v-model="form.project_value" />
                </div>

                <div class="col-md-3 mb-3">
                    <label class="form-label">{{ $t('label.statement') }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.statement" />
                </div>
            </div>

            <div class="row mb-4">
                <div class="col-md-3 mb-3">
                    <label class="form-label">{{ $t('label.project_start_date') }}</label>
                    <input type="date" class="form-control rounded-1" v-model="form.project_start_date" />
                </div>

                <div class="col-md-3 mb-3">
                    <label class="form-label">{{ $t('label.project_end_date') }}</label>
                    <input type="date" class="form-control rounded-1" v-model="form.project_end_date" />
                </div>

                <div class="col-md-3 mb-3">
                    <label class="form-label">{{ $t('label.country') }}</label>
                    <select class="form-control rounded-1" v-model="form.country">
                        <option value="">-- Select Country --</option>
                        <option v-for="c in countries" :key="c.code" :value="c.name">{{ c.name }}</option>
                    </select>
                </div>

                <div class="col-md-3 mb-3">
                    <label class="form-label">{{ $t('label.project_status') }}</label>
                    <select class="form-control rounded-1" v-model="form.project_status">
                        <option value="not_started">{{ $t('label.not_started') }}</option>
                        <option value="in_progress">{{ $t('label.in_progress') }}</option>
                        <option value="completed">{{ $t('label.completed') }}</option>
                        <option value="cancelled">{{ $t('label.cancelled') }}</option>
                    </select>
                </div>
            </div>

            <!-- Notes and Attachments -->
            <div class="row mt-4">
                <div class="col-md-9 mb-3">
                    <label class="form-label">{{ $t('label.notes') }}</label>
                    <textarea class="form-control" rows="3" v-model="form.notes"></textarea>
                </div>

                <div class="col-md-9 mb-3">
                    <label class="form-label">{{ $t('label.attachments') }}</label>
                    <div class="box-attachments d-flex flex-column align-items-start border p-3 rounded">
                        <button type="button" class="btn btn-outline-primary btn-sm mb-2"
                            @click="$refs.attachmentsInput.click()">
                            Upload Files
                        </button>
                        <input type="file" @change="handleAttachments" multiple class="d-none" ref="attachmentsInput" />
                        <ul>
                            <li v-for="(file, index) in form.attachments" :key="index">{{ file.name }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
    name: "ProjectCreate",
    data() {
        return {
            countries: [
                { code: "US", name: "United States" },
                { code: "GB", name: "United Kingdom" },
                { code: "FR", name: "France" },
                { code: "DE", name: "Germany" },
                { code: "AE", name: "UAE" },
                { code: "EG", name: "Egypt" },
                // أضف بقية الدول حسب الحاجة
            ],
            form: {
                notebook: "",
                invoice_no: "",
                date: "",
                hour: "",
                customer_no: "",
                customer_name: "",
                email: "",
                licensed_operator: "",
                currency1: "",
                currency2: "",
                project_name: "",
                project_manager_name: "",
                project_value: "",
                statement: "",
                project_start_date: "",
                project_end_date: "",
                country: "",
                project_status: "",
                notes: "",
                attachments: [],
            },
        };
    },
    methods: {
        handleAttachments(event) {
            this.form.attachments = Array.from(event.target.files);
        },
        cancelForm() {
            Swal.fire({
                title: this.$t("messages.cancel_title"),
                text: this.$t("messages.cancel_text"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: this.$t("buttons.yes_cancel"),
                cancelButtonText: this.$t("buttons.no"),
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$router.push("/admin/projects");
                }
            });
        },
        async saveForm() {
            try {
                const formData = new FormData();
                for (let key in this.form) {
                    if (key === "attachments") {
                        this.form.attachments.forEach((file) => formData.append("attachments[]", file));
                    } else {
                        formData.append(key, this.form[key]);
                    }
                }

                await axios.post("/api/projects", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                Swal.fire("Success", "Project created successfully", "success");
                this.$router.push({ name: "admin.projects.index" });
            } catch (error) {
                console.error(error);
                Swal.fire("Error", "Failed to create project", "error");
            }
        },
    },
};
</script>

<style>
.header th {
    background-color: #F4FFF0 !important;
}

.btn-action {
    background-color: #F4FFF0 !important;
}

.box-attachments {
    background-color: #f8f9fa;
}
</style>
