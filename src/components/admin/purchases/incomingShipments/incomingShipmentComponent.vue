<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-box-seam"></i> {{ $t('label.shipments_incoming') }}</h1>

        <!-- أزرار إنشاء وحذف -->
        <div class="d-flex align-items-center justify-content-end mb-4">
            <router-link :to="{ name: 'admin.new-income-shipment' }" class="btn btn-lg btn-main me-3">
                {{ $t('buttons.create') }}
            </router-link>
        </div>

        <!-- أزرار البحث والتحكم -->
        <div class="d-flex align-items-center actions mb-3">
            <div class="search me-2 mb-3">
                <i class="bi bi-search me-2"></i>
                <input type="text" v-model="searchQuery" placeholder="Search shipment..."
                    class="border rounded px-2 py-1" />
            </div>

            <div class="dropdown mb-3">
                <i class="bi bi-gear" type="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                <ul class="dropdown-menu align-center rounded-0 p-2" style="width: 250px;">
                    <li v-for="(col, index) in columns" :key="index">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="col.visible" :id="'col' + index" />
                            <label class="form-check-label" :for="'col' + index">{{ col.label }}</label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- جدول الشحنات -->
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-for="col in visibleColumns" :key="col.key">{{ col.label }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="shipments.length === 0">
                        <td :colspan="visibleColumns.length" class="text-center">No shipments found</td>
                    </tr>
                    <tr v-else v-for="shipment in filteredShipments" :key="shipment.id">
                        <td v-for="col in visibleColumns" :key="col.key">{{ shipment[col.key] }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
    name: "IncomingShipmentsComponent",
    data() {
        return {
            searchQuery: "",
            shipments: [],
            columns: [
                { key: "shipment_number", label: this.$t("fields.shipment_number"), visible: true },
                { key: "customer_name", label: this.$t("fields.customer_name"), visible: true },
                { key: "licensed_operator", label: this.$t("fields.licensed_operator"), visible: true },
                { key: "invoice_no", label: this.$t("fields.invoice_no"), visible: true },
                { key: "date", label: this.$t("fields.date"), visible: true },
                { key: "mobile", label: this.$t("fields.mobile"), visible: true },
            ],
        };
    },
    computed: {
        visibleColumns() {
            return this.columns.filter((col) => col.visible);
        },
        filteredShipments() {
            if (!this.searchQuery) return this.shipments;
            return this.shipments.filter(
                (s) =>
                    s.customer_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    s.shipment_number.toString().includes(this.searchQuery)
            );
        },
    },
    mounted() {
        this.fetchShipments();
    },
    methods: {
        fetchShipments() {
            // بيانات وهمية كمثال
            this.shipments = [
                {
                    id: 1,
                    shipment_number: "SH-1001",
                    customer_name: "Customer A",
                    licensed_operator: "Operator 1",
                    invoice_no: "INV-5001",
                    date: "2025-09-01",
                    mobile: "1234567890",
                },
                {
                    id: 2,
                    shipment_number: "SH-1002",
                    customer_name: "Customer B",
                    licensed_operator: "Operator 2",
                    invoice_no: "INV-5002",
                    date: "2025-09-03",
                    mobile: "0987654321",
                },
            ];
        },
        deleteSelected() {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire("Deleted!", "Shipments have been deleted.", "success");
                    // هنا يمكنك ربط حذف حقيقي عبر API
                }
            });
        },
    },
};
</script>

<style scoped>
.header th {
    background-color: #f4fff0 !important;
}

.actions i {
    font-size: 30px;
}

.actions span {
    font-size: 24px;
}

.dropdown .show {
    color: #1d7342;
}

.form-check-input:checked[type="checkbox"] {
    border-radius: 50%;
    background-color: #1d7342 !important;
}
</style>
