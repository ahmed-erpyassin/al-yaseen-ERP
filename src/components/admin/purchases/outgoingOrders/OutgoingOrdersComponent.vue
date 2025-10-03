<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>

        <div class="d-flex align-items-center justify-content-end mb-4">
            <router-link :to="{ name: 'admin.outgoing-offers.create' }" class="btn btn-lg btn-main me-3">
                {{ $t('buttons.create') }}
            </router-link>
        </div>

        <div class="d-flex align-items-center actions mb-3">
            <div class="search me-2 mb-3">
                <i class="bi bi-search me-2"></i>
                <input type="text" v-model="searchQuery" placeholder="Search supplier..."
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

        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-for="col in visibleColumns" :key="col.key">{{ col.label }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="offers.length === 0">
                        <td :colspan="visibleColumns.length" class="text-center">No offers found</td>
                    </tr>
                    <tr v-else v-for="offer in filteredOffers" :key="offer.id">
                        <td v-for="col in visibleColumns" :key="col.key">{{ offer[col.key] }}</td>
                    </tr>
                </tbody>

            </table>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
    name: "OutgoingOffersComponent",
    data() {
        return {
            useApi: true, // false = بيانات وهمية
            offers: [],
            searchQuery: "",
            columns: [
                { key: "offer_number", label: "Offer Number", visible: true },
                { key: "supplier_name", label: "Supplier Name", visible: true },
                { key: "licensed_operator", label: "Licensed Operator", visible: true },
                { key: "amount", label: "Amount", visible: true },
                { key: "currency", label: "Currency", visible: true },
                { key: "date", label: "Date", visible: true },
                { key: "mobile", label: "Mobile", visible: true },
            ],
        };
    },
    computed: {
        visibleColumns() {
            return this.columns.filter((col) => col.visible);
        },
        filteredOffers() {
            if (!this.searchQuery) return this.offers;
            return this.offers.filter(
                (o) =>
                    o.supplier_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    o.offer_number.toString().includes(this.searchQuery)
            );
        },
    },
    mounted() {
        this.fetchOffers();
    },
    methods: {
        async fetchOffers() {
            if (this.useApi) {
                try {
                    let url = '';
                    if (process.env.NODE_ENV === 'development') {
                        url = `/sales-management/outgoing-offers/list-all`; // صحح المسار
                    } else {
                        url = `${process.env.VUE_APP_API_BASE_URL}/sales-management/outgoing-offers/list-all`;
                    }

                    const response = await axios.get(
                        url,
                        process.env.NODE_ENV === 'production' ? { withCredentials: true } : {}
                    );
                    this.offers = response.data;

                } catch (error) {
                    console.error(error);
                    Swal.fire("Error", "Failed to fetch data from server", "error");
                }
            } else {
                // بيانات وهمية
                this.offers = [
                    { id: 1, offer_number: "OF-1001", supplier_name: "Supplier A", licensed_operator: "Operator 1", amount: 5000, currency: "USD", date: "2025-09-01", mobile: "1234567890" },
                    { id: 2, offer_number: "OF-1002", supplier_name: "Supplier B", licensed_operator: "Operator 2", amount: 3000, currency: "USD", date: "2025-09-03", mobile: "0987654321" },
                ];
            }
        },

        async deleteSelected() {
            // مثال: حذف جميع العروض المحددة
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
            });
            if (result.isConfirmed) {
                Swal.fire("Deleted!", "Offers have been deleted.", "success");
                // يمكن إضافة حذف حقيقي عبر API هنا
            }
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
