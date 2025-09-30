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
                <div class="col-12">
                    <h3 class="mb-5">{{ $t('label.new_project') }}</h3>
                </div>

                <!-- Notebook -->
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label class="form-label">{{ $t('label.notebook') }}</label>
                            <input type="text" class="form-control rounded-1" v-model="form.notebook" />
                        </div>
                    </div>
                </div>

                <!-- Invoice No -->
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label class="form-label">{{ $t('label.invoice_no') }}</label>
                            <input type="text" class="form-control rounded-1" v-model="form.invoice_no" />
                        </div>
                    </div>
                </div>

                <!-- Date -->
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label class="form-label">{{ $t('label.date') }}</label>
                            <input type="text" class="form-control rounded-1" v-model="form.date" />
                        </div>
                    </div>
                </div>

                <!-- Hour -->
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label class="form-label">{{ $t('label.hour') }}</label>
                            <input type="text" class="form-control rounded-1" v-model="form.hour" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mb-5">
                <!-- Customer No -->
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label class="form-label">{{ $t('label.customer_no') }}</label>
                            <input type="text" class="form-control rounded-1" v-model="form.customer_no" />
                        </div>
                    </div>
                </div>

                <!-- Name -->
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label class="form-label">{{ $t('label.name') }}</label>
                            <input type="text" class="form-control rounded-1" v-model="form.customer_name" />
                        </div>
                    </div>
                </div>

                <!-- Email -->
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label class="form-label">{{ $t('label.email') }}</label>
                            <input type="text" class="form-control rounded-1" v-model="form.email" />
                        </div>
                    </div>
                </div>

                <!-- Licensed Operator -->
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label class="form-label">{{ $t('label.licensed_operator') }}</label>
                            <input type="text" class="form-control rounded-1" v-model="form.licensed_operator" />
                        </div>
                    </div>
                </div>

                <!-- Currency 1 -->
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label class="form-label">{{ $t('label.currency') }}</label>
                            <input type="text" class="form-control rounded-1" v-model="form.currency1" />
                        </div>
                    </div>
                </div>

                <!-- Currency 2 -->
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label class="form-label">{{ $t('label.currency') }}</label>
                            <input type="text" class="form-control rounded-1" v-model="form.currency2" />
                        </div>
                    </div>
                </div>
            </div>

            <h3 class="mb-5">{{ $t('label.project_information') }}</h3>

            <div class="row mt-5">
                <!-- Project Name -->
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label class="form-label">{{ $t('label.project_name') }}</label>
                            <input type="text" class="form-control rounded-1" v-model="form.project_name" />
                        </div>
                    </div>
                </div>

                <!-- Project Manager -->
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label class="form-label">{{ $t('label.project_manager_name') }}</label>
                            <input type="text" class="form-control rounded-1" v-model="form.project_manager_name" />
                        </div>
                    </div>
                </div>

                <!-- Project Value -->
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label class="form-label">{{ $t('label.project_value') }}</label>
                            <input type="text" class="form-control rounded-1" v-model="form.project_value" />
                        </div>
                    </div>
                </div>

                <!-- Statement -->
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label class="form-label">{{ $t('label.statement') }}</label>
                            <input type="text" class="form-control rounded-1" v-model="form.statement" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <!-- Project Start Date -->
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label class="form-label">{{ $t('label.project_start_date') }}</label>
                            <input type="text" class="form-control rounded-1" v-model="form.project_start_date" />
                        </div>
                    </div>
                </div>

                <!-- Project End Date -->
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label class="form-label">{{ $t('label.project_end_date') }}</label>
                            <input type="text" class="form-control rounded-1" v-model="form.project_end_date" />
                        </div>
                    </div>
                </div>

                <!-- Country -->
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label class="form-label">{{ $t('label.country') }}</label>
                            <select class="form-control rounded-1" v-model="form.country">
                                <option value=""></option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <!-- Project Status -->
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label class="form-label">{{ $t('label.project_status') }}</label>
                            <select class="form-control rounded-1" v-model="form.project_status">
                                <option value="not_started">{{ $t('label.not_started') }}</option>
                                <option value="in_progress">{{ $t('label.in_progress') }}</option>
                                <option value="completed">{{ $t('label.completed') }}</option>
                                <option value="cancelled">{{ $t('label.cancelled') }}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Notes and Attachments -->
            <div class="col-md-9 mt-5">
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="notes" class="form-label">{{ $t('label.notes') }}</label>
                        <textarea name="notes" id="notes" rows="3" class="form-control" v-model="form.notes"></textarea>
                    </div>
                </div>
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="attachments" class="form-label">{{ $t('label.attachments') }}</label>
                        <div class="box-attachments d-flex align-items-center justify-content-center">
                            <div class="text-center">
                                <i class="bi bi-image"></i>
                                <p class="small">{{ $t('label.attachment_note') }}</p>
                                <input type="file" @change="handleAttachments" multiple class="d-none"
                                    ref="attachmentsInput" />
                                <button type="button" class="btn btn-outline-primary btn-sm mt-2"
                                    @click="$refs.attachmentsInput.click()">
                                    Upload
                                </button>
                            </div>
                        </div>
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
            }
        };
    },
    methods: {
        handleAttachments(event) {
            this.form.attachments = Array.from(event.target.files);
        },
        cancelForm() {
            Swal.fire({
                title: this.$t('messages.cancel_title'),
                text: this.$t('messages.cancel_text'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: this.$t('buttons.yes_cancel'),
                cancelButtonText: this.$t('buttons.no')
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$router.push('/admin/projects');
                }
            });
        },
        async saveForm() {
            try {
                const formData = new FormData();
                for (let key in this.form) {
                    if (key === "attachments") {
                        this.form.attachments.forEach(file => formData.append("attachments[]", file));
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
    }
};
</script>

<style>
.header th {
    background-color: #F4FFF0 !important;
}

.btn-action {
    background-color: #F4FFF0 !important;
}
</style>
