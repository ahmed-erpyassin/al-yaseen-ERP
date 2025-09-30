<template>
    <div class="container pe-5 ps-5">
        <!-- Page Title -->
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

        <!-- Main Form -->
        <form class="form">
            <div class="row">
                <div class="container pe-5 ps-5">

                    <!-- Item Information Section -->
                    <div class="row">
                        <div class="col-12">
                            <h3 class="mb-5">{{ $t('label.item_information') }}</h3>
                        </div>

                        <!-- Row: Item Number - Item Name - Manufacturing Duration -->
                        <div class="col-md-4 mb-4">
                            <label for="item_number" class="form-label">{{ $t('label.item_no') }}</label>
                            <input type="text" id="item_number" class="form-control rounded-1" v-model="itemNumber" />
                        </div>

                        <div class="col-md-4 mb-4">
                            <label for="item_name" class="form-label">{{ $t('label.item_name') }}</label>
                            <input type="text" id="item_name" class="form-control rounded-1" v-model="itemName" />
                        </div>

                        <div class="col-md-4 mb-4">
                            <label for="manufacturing_duration" class="form-label">{{ $t('label.manufacturing_duration')
                            }}</label>
                            <input type="text" id="manufacturing_duration" class="form-control rounded-1"
                                v-model="manufacturingDuration" />
                        </div>

                        <!-- Row: Quantity -->
                        <div class="col-md-4 mb-4">
                            <label for="quantity" class="form-label">{{ $t('label.quantity') }}</label>
                            <input type="number" id="quantity" class="form-control rounded-1" v-model="quantity" />
                        </div>

                        <!-- Warehouses Section -->
                        <div class="col-12 mt-4 mb-3">
                            <h5>{{ $t('label.warehouses') }}</h5>
                        </div>

                        <div class="col-md-4 mb-4">
                            <label for="raw_materials_warehouse" class="form-label">{{
                                $t('label.raw_materials_warehouse') }}</label>
                            <select id="raw_materials_warehouse" class="form-control rounded-1"
                                v-model="rawMaterialsWarehouse">
                                <option value="">{{ $t('label.select_warehouse') }}</option>
                            </select>
                        </div>

                        <div class="col-md-4 mb-4">
                            <label for="finished_product_warehouse" class="form-label">{{
                                $t('label.finished_product_warehouse') }}</label>
                            <select id="finished_product_warehouse" class="form-control rounded-1"
                                v-model="finishedProductWarehouse">
                                <option value="">{{ $t('label.select_warehouse') }}</option>
                            </select>
                        </div>
                    </div>

                    <!-- Units Section -->
                    <div class="row">
                        <div class="col-12">
                            <h3 class="mb-5">{{ $t('label.units') }}</h3>
                        </div>

                        <div class="col-md-3 mb-4">
                            <label for="balance_unit" class="form-label">{{ $t('label.balance_unit') }}</label>
                            <select id="balance_unit" class="form-control" v-model="balanceUnit">
                                <option value="">{{ $t('label.number') }}</option>
                            </select>
                        </div>

                        <div class="col-md-2 mb-4">
                            <label for="length" class="form-label">{{ $t('label.length') }}</label>
                            <input type="text" id="length" class="form-control rounded-1" v-model="length" />
                        </div>

                        <div class="col-md-2 mb-4">
                            <label for="width" class="form-label">{{ $t('label.width') }}</label>
                            <input type="text" id="width" class="form-control rounded-1" v-model="width" />
                        </div>

                        <div class="col-md-2 mb-4">
                            <label for="height" class="form-label">{{ $t('label.height') }}</label>
                            <input type="text" id="height" class="form-control rounded-1" v-model="height" />
                        </div>

                        <div class="col-md-3 mb-4">
                            <label for="worker_quantity" class="form-label">{{ $t('label.worker_quantity') }}</label>
                            <input type="text" id="worker_quantity" class="form-control rounded-1"
                                v-model="workerQuantity" />
                        </div>

                        <!-- Second unit fields -->
                        <div class="col-md-3 mb-4">
                            <label for="second_unit" class="form-label">{{ $t('label.second_unit') }}</label>
                            <select id="second_unit" class="form-control" v-model="secondUnit">
                                <option value=""></option>
                            </select>
                        </div>

                        <div class="col-md-3 mb-4">
                            <label for="second_unit_contains" class="form-label">{{ $t('label.contains') }}</label>
                            <select id="second_unit_contains" class="form-control" v-model="secondUnitContains">
                                <option value=""></option>
                            </select>
                        </div>

                        <div class="col-md-2 mb-4">
                            <input type="text" id="second_unit_number" class="form-control rounded-1"
                                v-model="secondUnitNumber" />
                        </div>

                        <div class="col-md-4 mb-4">
                            <label for="second_unit_item_number" class="form-label">{{
                                $t('label.second_unit_item_number') }}</label>
                            <input type="text" id="second_unit_item_number" class="form-control rounded-1"
                                v-model="secondUnitItemNumber" />
                        </div>

                        <!-- Third unit fields -->
                        <div class="col-md-3 mb-4">
                            <label for="third_unit" class="form-label">{{ $t('label.third_unit') }}</label>
                            <select id="third_unit" class="form-control" v-model="thirdUnit">
                                <option value=""></option>
                            </select>
                        </div>

                        <div class="col-md-3 mb-4">
                            <label for="third_unit_contains" class="form-label">{{ $t('label.contains') }}</label>
                            <select id="third_unit_contains" class="form-control" v-model="thirdUnitContains">
                                <option value=""></option>
                            </select>
                        </div>

                        <div class="col-md-2 mb-4">
                            <input type="text" id="third_unit_number" class="form-control rounded-1"
                                v-model="thirdUnitNumber" />
                        </div>

                        <div class="col-md-4 mb-4">
                            <label for="third_unit_item_number" class="form-label">{{ $t('label.third_unit_item_number')
                            }}</label>
                            <input type="text" id="third_unit_item_number" class="form-control rounded-1"
                                v-model="thirdUnitItemNumber" />
                        </div>

                        <!-- Dealing unit -->
                        <div class="col-md-6 mb-4">
                            <label for="dealing_unit_1" class="form-label">{{ $t('label.dealing_unit') }}</label>
                            <select id="dealing_unit_1" class="form-control" v-model="dealingUnit1">
                                <option value="">Main unit</option>
                            </select>
                        </div>

                        <div class="col-md-6 mb-4">
                            <label for="dealing_unit_2" class="form-label">{{ $t('label.dealing_unit') }}</label>
                            <select id="dealing_unit_2" class="form-control" v-model="dealingUnit2">
                                <option value="">Main unit</option>
                            </select>
                        </div>
                        <!-- Selling and Buying Prices Section -->
                        <div class="row">
                            <div class="col-12">
                                <h3 class="mb-5">{{ $t('label.buying_selling_prices') }}</h3>
                            </div>

                            <!-- Selling prices -->
                            <div class="col-md-4 mb-4">
                                <label for="first_selling_price" class="form-label">{{ $t('label.first_selling_price')
                                    }}</label>
                                <input type="text" id="first_selling_price" class="form-control rounded-1"
                                    v-model="firstSellingPrice" />
                            </div>

                            <div class="col-md-4 mb-4">
                                <label for="second_selling_price" class="form-label">{{ $t('label.second_selling_price')
                                    }}</label>
                                <input type="text" id="second_selling_price" class="form-control rounded-1"
                                    v-model="secondSellingPrice" />
                            </div>

                            <div class="col-md-4 mb-4">
                                <label for="third_selling_price" class="form-label">{{ $t('label.third_selling_price')
                                    }}</label>
                                <input type="text" id="third_selling_price" class="form-control rounded-1"
                                    v-model="thirdSellingPrice" />
                            </div>

                            <div class="col-md-4 mb-4">
                                <label for="selling_discount_percentage" class="form-label">{{
                                    $t('label.selling_discount_percentage') }}</label>
                                <input type="text" id="selling_discount_percentage" class="form-control rounded-1"
                                    v-model="sellingDiscountPercentage" />
                            </div>

                            <div class="col-md-4 mb-4">
                                <label for="max_discount_percentage" class="form-label">{{
                                    $t('label.max_discount_percentage') }}</label>
                                <input type="text" id="max_discount_percentage" class="form-control rounded-1"
                                    v-model="maxDiscountPercentage" />
                            </div>

                            <div class="col-md-4 mb-4">
                                <label for="min_price" class="form-label">{{ $t('label.min_price') }}</label>
                                <input type="text" id="min_price" class="form-control rounded-1" v-model="minPrice" />
                            </div>

                            <!-- VAT checkboxes -->
                            <div class="col-12 mb-4">
                                <div class="form-check d-flex align-items-center justify-content-end">
                                    <input type="checkbox" class="form-check-input rounded-circle" id="selling_vat"
                                        v-model="sellingVat" />
                                    <label class="form-check-label" for="selling_vat">{{ $t('label.selling_price_vat')
                                        }}</label>
                                </div>
                            </div>

                            <!-- Purchase prices -->
                            <div class="col-md-4 mb-4">
                                <label for="first_purchase_price" class="form-label">{{ $t('label.first_purchase_price')
                                    }}</label>
                                <input type="text" id="first_purchase_price" class="form-control rounded-1"
                                    v-model="firstPurchasePrice" />
                            </div>

                            <div class="col-md-4 mb-4">
                                <label for="second_purchase_price" class="form-label">{{
                                    $t('label.second_purchase_price') }}</label>
                                <input type="text" id="second_purchase_price" class="form-control rounded-1"
                                    v-model="secondPurchasePrice" />
                            </div>

                            <div class="col-md-4 mb-4">
                                <label for="third_purchase_price" class="form-label">{{ $t('label.third_purchase_price')
                                    }}</label>
                                <input type="text" id="third_purchase_price" class="form-control rounded-1"
                                    v-model="thirdPurchasePrice" />
                            </div>

                            <div class="col-md-4 mb-4">
                                <label for="purchase_discount_percentage" class="form-label">{{
                                    $t('label.purchase_discount_percentage') }}</label>
                                <input type="text" id="purchase_discount_percentage" class="form-control rounded-1"
                                    v-model="purchaseDiscountPercentage" />
                            </div>

                            <div class="col-md-4 mb-4">
                                <div class="form-check d-flex align-items-center justify-content-end">
                                    <input type="checkbox" class="form-check-input rounded-circle" id="purchase_vat"
                                        v-model="purchaseVat" />
                                    <label class="form-check-label" for="purchase_vat">{{ $t('label.purchase_price_vat')
                                        }}</label>
                                </div>
                            </div>

                            <div class="col-12 mb-4">
                                <div class="form-check d-flex align-items-center justify-content-end">
                                    <input type="checkbox" class="form-check-input rounded-circle" id="item_vat"
                                        v-model="itemVat" />
                                    <label class="form-check-label" for="item_vat">{{ $t('label.item_subject_to_vat')
                                        }}</label>
                                </div>
                            </div>
                        </div>

                        <!-- Other Info Section -->
                        <div class="row">
                            <div class="col-12">
                                <h3 class="mb-4">{{ $t('label.other_info') }}</h3>
                            </div>

                            <div class="col-md-6 mb-4">
                                <label for="barcode" class="form-label">{{ $t('label.barcode') }}</label>
                                <input type="text" id="barcode" class="form-control rounded-1" v-model="barcode" />
                                <i class="bi bi-upc"></i>
                            </div>

                            <div class="col-md-6 mb-4">
                                <label for="barcode_type" class="form-label">{{ $t('label.barcode_type') }}</label>
                                <select id="barcode_type" class="form-control" v-model="barcodeType">
                                    <option value="">{{ $t('label.select_barcode_type') }}</option>
                                    <option value="code128">Code 128</option>
                                    <option value="ean13">EAN-13</option>
                                    <option value="qr">QR Code</option>
                                </select>
                            </div>

                            <div class="col-md-6 mb-4">
                                <label for="expire_date" class="form-label">{{ $t('label.expire_date') }}</label>
                                <input type="date" id="expire_date" class="form-control rounded-1"
                                    v-model="expireDate" />
                            </div>

                            <div class="col-md-6 mb-4">
                                <label for="add_image" class="form-label">{{ $t('label.add_image') }}</label>
                                <input type="file" id="add_image" class="form-control rounded-1"
                                    @change="handleFileChange" />
                                <i class="bi bi-image"></i>
                            </div>

                            <div class="col-md-6 mb-5">
                                <label for="category_type" class="form-label">{{ $t('label.category_type') }}</label>
                                <select id="category_type" class="form-control" v-model="categoryType">
                                    <option value="">{{ $t('label.category_service') }}</option>
                                    <option value="">{{ $t('label.category_goods') }}</option>
                                    <option value="">{{ $t('label.category_work') }}</option>
                                    <option value="">{{ $t('label.category_asset') }}</option>
                                    <option value="">{{ $t('label.category_transfer') }}</option>
                                    <option value="">{{ $t('label.category_minium') }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script setup>
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import axios from 'axios'  // تفعيل Axios للاتصال بالـ API

const router = useRouter()
const { t } = useI18n()

// -------------------------------
// Form fields
// -------------------------------
const itemNumber = ref('')
const itemName = ref('')
const manufacturingDuration = ref('')
const quantity = ref('')
const rawMaterialsWarehouse = ref('')
const finishedProductWarehouse = ref('')
const balanceUnit = ref('')
const length = ref('')
const width = ref('')
const height = ref('')
const workerQuantity = ref('')
const secondUnit = ref('')
const secondUnitContains = ref('')
const secondUnitNumber = ref('')
const secondUnitItemNumber = ref('')
const thirdUnit = ref('')
const thirdUnitContains = ref('')
const thirdUnitNumber = ref('')
const thirdUnitItemNumber = ref('')
const dealingUnit1 = ref('')
const dealingUnit2 = ref('')
const firstSellingPrice = ref('')
const secondSellingPrice = ref('')
const thirdSellingPrice = ref('')
const sellingDiscountPercentage = ref('')
const maxDiscountPercentage = ref('')
const minPrice = ref('')
const sellingVAT = ref(true)
const firstPurchasePrice = ref('')
const secondPurchasePrice = ref('')
const thirdPurchasePrice = ref('')
const purchaseDiscountPercentage = ref('')
const purchaseVAT = ref(true)
const itemVAT = ref(true)
const barcode = ref('')
const barcodeType = ref('')
const expireDate = ref('')
const categoryType = ref('')
const selectedFile = ref(null)

// -------------------------------
// Handle file input change
// -------------------------------
const handleFileChange = (event) => {
    selectedFile.value = event.target.files[0]
}

// -------------------------------
// Save form function (API enabled)
// -------------------------------
const saveForm = async () => {
    const formData = new FormData()
    formData.append('item_number', itemNumber.value)
    formData.append('item_name', itemName.value)
    formData.append('manufacturing_duration', manufacturingDuration.value)
    formData.append('quantity', quantity.value)
    formData.append('raw_materials_warehouse', rawMaterialsWarehouse.value)
    formData.append('finished_product_warehouse', finishedProductWarehouse.value)
    formData.append('balance_unit', balanceUnit.value)
    formData.append('length', length.value)
    formData.append('width', width.value)
    formData.append('height', height.value)
    formData.append('worker_quantity', workerQuantity.value)
    formData.append('second_unit', secondUnit.value)
    formData.append('second_unit_contains', secondUnitContains.value)
    formData.append('second_unit_number', secondUnitNumber.value)
    formData.append('second_unit_item_number', secondUnitItemNumber.value)
    formData.append('third_unit', thirdUnit.value)
    formData.append('third_unit_contains', thirdUnitContains.value)
    formData.append('third_unit_number', thirdUnitNumber.value)
    formData.append('third_unit_item_number', thirdUnitItemNumber.value)
    formData.append('dealing_unit_1', dealingUnit1.value)
    formData.append('dealing_unit_2', dealingUnit2.value)
    formData.append('first_selling_price', firstSellingPrice.value)
    formData.append('second_selling_price', secondSellingPrice.value)
    formData.append('third_selling_price', thirdSellingPrice.value)
    formData.append('selling_discount_percentage', sellingDiscountPercentage.value)
    formData.append('max_discount_percentage', maxDiscountPercentage.value)
    formData.append('min_price', minPrice.value)
    formData.append('selling_vat', sellingVAT.value)
    formData.append('first_purchase_price', firstPurchasePrice.value)
    formData.append('second_purchase_price', secondPurchasePrice.value)
    formData.append('third_purchase_price', thirdPurchasePrice.value)
    formData.append('purchase_discount_percentage', purchaseDiscountPercentage.value)
    formData.append('purchase_vat', purchaseVAT.value)
    formData.append('item_vat', itemVAT.value)
    formData.append('barcode', barcode.value)
    formData.append('barcode_type', barcodeType.value)
    formData.append('expire_date', expireDate.value)
    formData.append('category_type', categoryType.value)
    if (selectedFile.value) formData.append('add_image', selectedFile.value)

    try {
        await axios.post('https://your-api-url.com/items', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        Swal.fire({
            icon: 'success',
            title: t('messages.saved_title'),
            text: t('messages.saved_text'),
            timer: 2000,
            showConfirmButton: false
        })
        // إعادة توجيه بعد الحفظ
        router.push('/admin/warehouses/items')
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: t('messages.error_title') || 'Error',
            text: error.response?.data?.message || 'Something went wrong'
        })
    }
}

// -------------------------------
// Cancel form function
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
            router.push('/admin/warehouses/items')
        }
    })
}
</script>
