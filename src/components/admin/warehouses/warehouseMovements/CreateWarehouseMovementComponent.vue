<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>

        <!-- Save & Cancel Buttons -->
        <div class="d-flex align-items-center justify-content-end mb-3">
            <button type="button" class="btn btn-lg btn-outline-secondary me-3" @click="confirmCancel">
                {{ $t('buttons.cancel') }}
            </button>
            <button type="button" class="btn btn-lg btn-success" @click="saveMovement">
                {{ $t('buttons.save') }}
            </button>
        </div>

        <form class="form">
            <h3>{{ $t('label.add_cash_movement') }}</h3>

            <!-- Movement Info -->
            <div class="row mt-5">
                <div class="col-md-3">
                    <div class="mb-3 position-relative">
                        <label for="warehouse_number" class="form-label">{{ $t('label.movement_number') }}</label>
                        <input type="text" id="warehouse_number" class="form-control rounded-1"
                            v-model="newMovement.movement_number" />
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3 position-relative">
                        <label for="information" class="form-label">{{ $t('label.movement_date') }}</label>
                        <input type="text" id="information" class="form-control rounded-1"
                            v-model="newMovement.movement_date" />
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3 position-relative">
                        <label for="warehousekeeper" class="form-label">{{ $t('label.movement_time') }}</label>
                        <input type="text" id="warehousekeeper" class="form-control rounded-1"
                            v-model="newMovement.movement_time" />
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="mb-3 position-relative">
                        <label for="movement_type" class="form-label">{{ $t('label.movement_type') }}</label>
                        <select name="movement_type" id="movement_type" class="form-control"
                            v-model="newMovement.movement_type">
                            <option value="">{{ $t('label.movement_type_outgoing') }}</option>
                            <option value="">{{ $t('label.movement_type_incoming') }}</option>
                            <option value="">{{ $t('label.movement_type_transfer') }}</option>
                            <option value="">{{ $t('label.movement_type_manufacturing') }}</option>
                            <option value="">{{ $t('label.movement_type_adjustment') }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Supplier & Description -->
            <div class="row">
                <div class="col-md-3">
                    <div class="mb-3 position-relative">
                        <label for="mobile_number" class="form-label">{{ $t('label.supplier_name') }}</label>
                        <input type="text" id="mobile_number" class="form-control rounded-1"
                            v-model="newMovement.supplier_name" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3 position-relative">
                        <label for="fax_number" class="form-label">{{ $t('label.movement_description') }}</label>
                        <input type="text" id="fax_number" class="form-control rounded-1"
                            v-model="newMovement.movement_description" />
                    </div>
                </div>
            </div>

            <!-- Invoice & Dispatch & Reference -->
            <div class="row">
                <div class="col-md-3">
                    <div class="mb-3 position-relative">
                        <label for="address" class="form-label">{{ $t('label.invoice_number') }}</label>
                        <input type="text" id="address" class="form-control rounded-1"
                            v-model="newMovement.invoice_number" />
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3 position-relative">
                        <label for="category_number" class="form-label">{{ $t('label.dispatch_number') }}</label>
                        <input type="text" id="category_number" class="form-control rounded-1"
                            v-model="newMovement.dispatch_number" />
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3 position-relative">
                        <label for="category_name" class="form-label">{{ $t('label.reference_number') }}</label>
                        <input type="text" id="category_name" class="form-control rounded-1"
                            v-model="newMovement.reference_number" />
                    </div>
                </div>
            </div>

            <!-- Movement Details Table -->
            <h3 class="mb-3">{{ $t('label.movement_details') }}</h3>
            <div class="table-responsive">
                <table class="table table-bordered text-center align-middle">
                    <thead class="header">
                        <tr>
                            <th>#</th>
                            <th>{{ $t('label.item_number') }}</th>
                            <th>{{ $t('label.item_name') }}</th>
                            <th>{{ $t('label.item_description') }}</th>
                            <th>{{ $t('label.unit_name') }}</th>
                            <th>{{ $t('label.quantity') }}</th>
                            <th>{{ $t('label.inventory_balance') }}</th>
                            <th>{{ $t('label.warehouse_number') }}</th>
                            <th>{{ $t('label.warehouse_name') }}</th>
                            <th>{{ $t('label.unit_price') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(detail, index) in newMovement.details" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td><input type="number" class="form-control border-0 rounded-0"
                                    v-model="detail.item_number" /></td>
                            <td><input type="text" class="form-control border-0 rounded-0" v-model="detail.item_name" />
                            </td>
                            <td><input type="text" class="form-control border-0 rounded-0"
                                    v-model="detail.item_description" /></td>
                            <td><input type="text" class="form-control border-0 rounded-0" v-model="detail.unit_name" />
                            </td>
                            <td><input type="number" class="form-control border-0 rounded-0"
                                    v-model="detail.quantity" /></td>
                            <td><input type="number" class="form-control border-0 rounded-0"
                                    v-model="detail.inventory_balance" readonly /></td>
                            <td><input type="number" class="form-control border-0 rounded-0"
                                    v-model="detail.warehouse_number" readonly /></td>
                            <td><input type="number" class="form-control border-0 rounded-0"
                                    v-model="detail.warehouse_name" readonly /></td>
                            <td><input type="number" class="form-control border-0 rounded-0" v-model="detail.unit_price"
                                    readonly /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Add/Remove Row Buttons -->
            <div class="d-flex gap-2 justify-content-end mb-4">
                <button type="button" class="btn btn-action" @click="addRow">{{ $t('actions.add_row') }}</button>
                <button type="button" class="btn btn-action" @click="removeRow">{{ $t('actions.remove_row') }}</button>
            </div>

            <!-- Notes & Attachments -->
            <div class="row">
                <div class="col-md-9">
                    <div class="mb-4">
                        <label for="notes" class="form-label">{{ $t('label.notes') }}</label>
                        <textarea id="notes" rows="3" class="form-control" v-model="newMovement.notes"></textarea>
                    </div>

                    <div class="mb-4 mt-3">
                        <label for="attachments" class="form-label">{{ $t('label.attachments') }}</label>
                        <div class="box-attachments d-flex align-items-center justify-content-center">
                            <div class="text-center">
                                <i class="bi bi-image"></i>
                                <p class="small">{{ $t('label.attachment_note') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </form>
    </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
    name: "AddCashMovement",
    data() {
        return {
            newMovement: {
                movement_number: '',
                movement_date: '',
                movement_time: '',
                movement_type: '',
                supplier_name: '',
                movement_description: '',
                invoice_number: '',
                dispatch_number: '',
                reference_number: '',
                notes: '',
                details: [
                    {
                        item_number: '',
                        item_name: '',
                        item_description: '',
                        unit_name: '',
                        quantity: 0,
                        inventory_balance: 0,
                        warehouse_number: 0,
                        warehouse_name: 0,
                        unit_price: 0
                    }
                ]
            }
        };
    },
    methods: {
        async saveMovement() {
            try {
                await axios.post('/api/warehouse-movements', this.newMovement);
                Swal.fire({
                    title: this.$t('messages.saved_text'),
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
                this.resetForm();
            } catch (error) {
                Swal.fire({
                    title: this.$t('messages.error_text'),
                    text: error.response?.data?.message || error.message,
                    icon: "error"
                });
            }
        },
        confirmCancel() {
            Swal.fire({
                title: this.$t('messages.cancel_title'),
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#6c757d",
                cancelButtonColor: "#198754",
                confirmButtonText: this.$t('buttons.cancel'),
                cancelButtonText: this.$t('buttons.no')
            }).then(result => {
                if (result.isConfirmed) {
                    this.resetForm();
                    this.$router.push('/admin/warehouses/warehouse-movements/');
                }
            });
        },
        resetForm() {
            this.newMovement = {
                movement_number: '',
                movement_date: '',
                movement_time: '',
                movement_type: '',
                supplier_name: '',
                movement_description: '',
                invoice_number: '',
                dispatch_number: '',
                reference_number: '',
                notes: '',
                details: [
                    {
                        item_number: '',
                        item_name: '',
                        item_description: '',
                        unit_name: '',
                        quantity: 0,
                        inventory_balance: 0,
                        warehouse_number: 0,
                        warehouse_name: 0,
                        unit_price: 0
                    }
                ]
            };
        },
        addRow() {
            this.newMovement.details.push({
                item_number: '',
                item_name: '',
                item_description: '',
                unit_name: '',
                quantity: 0,
                inventory_balance: 0,
                warehouse_number: 0,
                warehouse_name: 0,
                unit_price: 0
            });
        },
        removeRow() {
            if (this.newMovement.details.length > 1) {
                this.newMovement.details.pop();
            }
        }
    }
};
</script>
