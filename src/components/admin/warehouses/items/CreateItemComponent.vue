<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-box-seam"></i> {{ $t('label.new_item') }}</h1>

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
                <!-- Basic Info -->
                <div class="col-md-3 mb-3">
                    <label class="form-label">{{ $t('label.name') }}</label>
                    <input type="text" class="form-control" v-model="form.name" />
                </div>

                <div class="col-md-2 mb-3">
                    <label class="form-label">{{ $t('label.quantity') }}</label>
                    <input type="number" class="form-control" v-model="form.quantity" />
                </div>

                <div class="col-md-2 mb-3">
                    <label class="form-label">{{ $t('label.unit') }}</label>
                    <input type="text" class="form-control" v-model="form.unit_name" />
                </div>

                <div class="col-md-3 mb-3">
                    <label class="form-label">{{ $t('label.category') }}</label>
                    <input type="text" class="form-control" v-model="form.category_name" />
                </div>

                <div class="col-md-2 mb-3 d-flex align-items-center">
                    <div class="form-check mt-4">
                        <input class="form-check-input" type="checkbox" v-model="form.stock_tracking"
                            id="stockTracking" />
                        <label class="form-check-label" for="stockTracking">{{ $t('label.stock_tracking') }}</label>
                    </div>
                </div>
            </div>

            <!-- Notebook, Invoice, Date, Hour -->
            <div class="row mb-4">
                <div class="col-md-3 mb-3">
                    <label class="form-label">{{ $t('label.notebook') }}</label>
                    <input type="text" class="form-control" v-model="form.notebook" />
                </div>
                <div class="col-md-3 mb-3">
                    <label class="form-label">{{ $t('label.invoice_no') }}</label>
                    <input type="text" class="form-control" v-model="form.invoice_no" />
                </div>
                <div class="col-md-3 mb-3">
                    <label class="form-label">{{ $t('label.date') }}</label>
                    <input type="date" class="form-control" v-model="form.date" />
                </div>
                <div class="col-md-3 mb-3">
                    <label class="form-label">{{ $t('label.hour') }}</label>
                    <input type="time" class="form-control" v-model="form.hour" />
                </div>
            </div>

            <!-- Customer Info -->
            <div class="row mb-4">
                <div class="col-md-3 mb-3">
                    <label class="form-label">{{ $t('label.customer_no') }}</label>
                    <input type="text" class="form-control" v-model="form.customer_no" />
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">{{ $t('label.customer_name') }}</label>
                    <input type="text" class="form-control" v-model="form.customer_name" />
                </div>
                <div class="col-md-5 mb-3">
                    <label class="form-label">{{ $t('label.email') }}</label>
                    <input type="email" class="form-control" v-model="form.email" />
                </div>
            </div>

            <!-- Operator & Currency -->
            <div class="row mb-4">
                <div class="col-md-4 mb-3">
                    <label class="form-label">{{ $t('label.licensed_operator') }}</label>
                    <input type="text" class="form-control" v-model="form.licensed_operator" />
                </div>
                <div class="col-md-2 mb-3">
                    <label class="form-label">{{ $t('label.currency') }} 1</label>
                    <input type="text" class="form-control" v-model="form.currency1" />
                </div>
                <div class="col-md-2 mb-3">
                    <label class="form-label">{{ $t('label.currency') }} 2</label>
                    <input type="text" class="form-control" v-model="form.currency2" />
                </div>
            </div>

            <!-- Notes and Attachments -->
            <div class="row mb-4">
                <div class="col-md-12 mb-3">
                    <label class="form-label">{{ $t('label.notes') }}</label>
                    <textarea class="form-control" rows="3" v-model="form.notes"></textarea>
                </div>

                <div class="col-md-12 mb-3">
                    <label class="form-label">{{ $t('label.attachments') }}</label>
                    <div class="d-flex align-items-center">
                        <input type="file" @change="handleAttachments" multiple class="d-none" ref="attachmentsInput" />
                        <button type="button" class="btn btn-outline-primary" @click="$refs.attachmentsInput.click()">
                            Upload Files
                        </button>
                        <div class="ms-3">
                            <small>{{ form.attachments.length }} {{ $t('label.files_selected') }}</small>
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
    name: "ItemCreate",
    data() {
        return {
            form: {
                name: "",
                quantity: 0,
                unit_name: "",
                category_name: "",
                stock_tracking: false,
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
                    this.$router.push("/admin/warehouses/items");
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

                await axios.post("{{baseUrl}}/api/v1/items/register-item", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                Swal.fire("Success", "Item created successfully", "success");
                this.$router.push({ name: "admin.warehouses.items" });
            } catch (error) {
                console.error(error);
                Swal.fire("Error", "Failed to create item", "error");
            }
        },
    },
};
</script>

<style scoped>
.header th {
    background-color: #F4FFF0 !important;
}

.btn-action {
    background-color: #F4FFF0 !important;
}
</style>
