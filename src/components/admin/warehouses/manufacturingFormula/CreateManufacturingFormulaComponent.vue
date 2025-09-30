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
                    <h3 class="mb-5">{{ $t('label.add_manufacturing_formula') }}</h3>
                </div>
                <div class="col-md-2 mb-4">
                    <label class="form-label">{{ $t('label.item_no') }}</label>
                    <select class="form-control" v-model="selectedItem.item_no">
                        <option v-for="item in items" :key="item.id" :value="item.item_number">
                            {{ item.item_number }}
                        </option>
                    </select>
                </div>
                <div class="col-md-6 mb-4">
                    <label class="form-label">{{ $t('label.item_name') }}</label>
                    <select class="form-control" v-model="selectedItem.item_name">
                        <option v-for="item in items" :key="item.id" :value="item.item_name">
                            {{ item.item_name }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4 mb-4">
                    <label class="form-label">{{ $t('label.date') }}</label>
                    <input type="date" class="form-control rounded-1" v-model="formula.date" />
                </div>
                <div class="col-md-4 mb-4">
                    <label class="form-label">{{ $t('label.hour') }}</label>
                    <input type="time" class="form-control rounded-1" v-model="formula.hour" />
                </div>
            </div>

            <div class="col-12">
                <h3 class="mb-5">{{ $t('label.manufacturing_formula') }}</h3>
            </div>

            <div class="table-responsive">
                <table class="table table-bordered text-center align-middle">
                    <thead class="header">
                        <tr>
                            <th>#</th>
                            <th>{{ $t('label.item_no') }}</th>
                            <th>{{ $t('label.item_name') }}</th>
                            <th>{{ $t('label.consumed_quantity') }}</th>
                            <th>{{ $t('label.produced_quantity') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in formula.rows" :key="index">
                            <td><input type="number" class="form-control border-0 rounded-0" v-model="row.index" /></td>
                            <td>
                                <select class="form-control" v-model="row.item_no">
                                    <option v-for="item in items" :key="item.id" :value="item.item_number">{{
                                        item.item_number }}</option>
                                </select>
                            </td>
                            <td>
                                <select class="form-control" v-model="row.item_name">
                                    <option v-for="item in items" :key="item.id" :value="item.item_name">{{
                                        item.item_name }}</option>
                                </select>
                            </td>
                            <td><input type="text" class="form-control border-0 rounded-0"
                                    v-model="row.consumed_quantity" /></td>
                            <td><input type="text" class="form-control border-0 rounded-0"
                                    v-model="row.produced_quantity" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="d-flex gap-2 justify-content-end">
                <button type="button" class="btn btn-action" @click.prevent="addRow">{{ $t('actions.add_row')
                    }}</button>
                <button type="button" class="btn btn-action" @click.prevent="removeRow">{{ $t('actions.remove_row')
                    }}</button>
            </div>

            <div class="col-12">
                <h3 class="mb-4">{{ $t('label.production_cost') }}</h3>
            </div>

            <table class="table text-center align-middle">
                <thead class="header">
                    <tr>
                        <th>#</th>
                        <th>
                            <div class="form-check">
                                <input type="checkbox" checked class="form-check-input rounded-circle" id="first"
                                    v-model="formula.costs.first.selected" />
                                <label class="form-check-label" for="first">{{ $t('label.first') }}</label>
                            </div>
                        </th>
                        <th>
                            <div class="form-check">
                                <input type="checkbox" checked class="form-check-input rounded-circle" id="second"
                                    v-model="formula.costs.second.selected" />
                                <label class="form-check-label" for="second">{{ $t('label.second') }}</label>
                            </div>
                        </th>
                        <th>
                            <div class="form-check">
                                <input type="checkbox" checked class="form-check-input rounded-circle" id="third"
                                    v-model="formula.costs.third.selected" />
                                <label class="form-check-label" for="third">{{ $t('label.third') }}</label>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ $t('label.purchase_price') }}</td>
                        <td><input type="number" class="form-control text-center border-0 rounded-0"
                                v-model="formula.costs.first.purchase_price" /></td>
                        <td><input type="text" class="form-control text-center border-0 rounded-0"
                                v-model="formula.costs.second.purchase_price" /></td>
                        <td><input type="text" class="form-control text-center border-0 rounded-0"
                                v-model="formula.costs.third.purchase_price" /></td>
                    </tr>
                    <tr>
                        <td>{{ $t('label.sale_price') }}</td>
                        <td><input type="number" class="form-control text-center border-0 rounded-0"
                                v-model="formula.costs.first.sale_price" /></td>
                        <td><input type="text" class="form-control text-center border-0 rounded-0"
                                v-model="formula.costs.second.sale_price" /></td>
                        <td><input type="text" class="form-control text-center border-0 rounded-0"
                                v-model="formula.costs.third.sale_price" /></td>
                    </tr>
                    <tr>
                        <td>{{ $t('label.labor_cost') }}</td>
                        <td><input type="number" class="form-control text-center border-0 rounded-0"
                                v-model="formula.costs.labor_cost" /></td>
                    </tr>
                    <tr>
                        <td>{{ $t('label.operating_cost') }}</td>
                        <td><input type="number" class="form-control text-center border-0 rounded-0"
                                v-model="formula.costs.operating_cost" /></td>
                    </tr>
                    <tr>
                        <td>{{ $t('label.waste_cost') }}</td>
                        <td><input type="number" class="form-control text-center border-0 rounded-0"
                                v-model="formula.costs.waste_cost" /></td>
                    </tr>
                    <tr>
                        <td class="text-primary">{{ $t('label.final_cost') }}</td>
                        <td><input type="number" class="form-control text-center border-0 rounded-0"
                                v-model="formula.costs.final_cost" /></td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
</template>
<script setup>
import Swal from 'sweetalert2'       // SweetAlert2 for nice alert popups
import { useRouter } from 'vue-router' // Vue Router for navigation
import { useI18n } from 'vue-i18n'    // i18n for translations
import { ref, onMounted } from 'vue' // Vue reactive references and lifecycle
import axios from 'axios'             // Axios for API calls

const router = useRouter()           // Router instance
const { t } = useI18n()             // Translation function

// -------------------------------
// ITEMS
// -------------------------------
const items = ref([])                // Holds list of items from API
const selectedItem = ref({ item_no: null, item_name: null }) // Currently selected item

// -------------------------------
// MANUFACTURING FORMULA
// -------------------------------
const formula = ref({
    date: "",  // Changed to HTML5 date input
    hour: "",  // Changed to HTML5 time input
    rows: [
        { index: 1, item_no: null, item_name: null, consumed_quantity: "", produced_quantity: "" }
    ],
    costs: {   // Costs structure
        first: { selected: true, purchase_price: 0, sale_price: 0 },
        second: { selected: true, purchase_price: 0, sale_price: 0 },
        third: { selected: true, purchase_price: 0, sale_price: 0 },
        labor_cost: 0,
        operating_cost: 0,
        waste_cost: 0,
        final_cost: 0
    }
})

// -------------------------------
// FETCH ITEMS FROM API
// -------------------------------
const fetchItems = async () => {
    try {
        const response = await axios.get("/api/items") // API endpoint
        items.value = response.data                 // Store API response
    } catch (err) {
        console.error("Error fetching items:", err)
    }
}

onMounted(() => {
    fetchItems() // Fetch items when component mounts
})

// -------------------------------
// ADD/REMOVE ROWS
// -------------------------------
const addRow = () => {
    formula.value.rows.push({
        index: formula.value.rows.length + 1,
        item_no: null,
        item_name: null,
        consumed_quantity: "",
        produced_quantity: ""
    })
}

const removeRow = () => {
    if (formula.value.rows.length > 1) formula.value.rows.pop()
}

// -------------------------------
// SAVE FORMULA
// -------------------------------
const saveForm = async () => {
    try {
        const payload = {
            item_no: selectedItem.value.item_no,
            item_name: selectedItem.value.item_name,
            date: formula.value.date,
            hour: formula.value.hour,
            rows: formula.value.rows,
            costs: formula.value.costs
        }
        await axios.post("/api/manufacturing-formulas", payload)

        // SweetAlert2 modal after save
        Swal.fire({
            title: t('messages.saved_title'),
            text: t('messages.saved_text'),
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: t('buttons.go_to_list'),  // Go to list
            cancelButtonText: t('buttons.stay_here')     // Stay on page
        }).then((result) => {
            if (result.isConfirmed) {
                router.push('/admin/warehouses/manufacturing-formula') // Go to list
            }
            // else: stay on page
        })

    } catch (err) {
        console.error("Error saving formula:", err)
        Swal.fire({
            title: t('messages.error_title'),
            text: t('messages.error_text'),
            icon: 'error'
        })
    }
}



// -------------------------------
// CANCEL FORM
// -------------------------------
const cancelForm = () => {
    Swal.fire({
        title: t('messages.cancel_title'),
        text: t('messages.cancel_text'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: t('buttons.yes_cancel'),
        cancelButtonText: t('buttons.no')
    }).then((result) => {
        if (result.isConfirmed) {
            router.push('/admin/warehouses/manufacturing-formula') // Navigate to another page
        }
    })
}
</script>


<style scoped>
td,
th {
    border: 1px solid #ccc;
}
</style>
