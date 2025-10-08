<template>
  <div class="container pe-5 ps-5">
    <!-- Page Title -->
    <h1><i class="bi bi-box-seam"></i> {{ $t('label.add_item') || 'إضافة صنف جديد' }}</h1>

    <!-- Buttons -->
    <div class="d-flex align-items-center justify-content-end mb-4">
      <button type="button" class="btn btn-lg btn-outline-secondary me-3" @click="cancelForm" :disabled="loading">
        {{ $t('buttons.cancel') || 'إلغاء' }}
      </button>
      <button type="button" class="btn btn-lg btn-success d-flex align-items-center gap-2" @click="saveForm"
        :disabled="loading">
        <i v-if="loading" class="bi bi-arrow-repeat spin"></i>
        <span>{{ $t('buttons.save') || 'حفظ' }}</span>
      </button>
    </div>

    <!-- Form -->
    <form class="form">
      <div class="row">
        <!-- ============ معلومات الصنف ============ -->
        <div class="col-12">
          <h3 class="mb-4">معلومات الصنف</h3>
        </div>

        <div class="col-md-4 mb-4">
          <label class="form-label">رقم الصنف</label>
          <input type="text" class="form-control" v-model="itemNumber" readonly />
        </div>

        <div class="col-md-4 mb-4">
          <label class="form-label">اسم الصنف</label>
          <input type="text" class="form-control" v-model="itemName" />
        </div>

        <div class="col-md-4 mb-4">
          <label class="form-label">مدة التصنيع</label>
          <input type="text" class="form-control" v-model="manufacturingDuration" />
        </div>

        <div class="col-md-4 mb-4">
          <label class="form-label">الكمية</label>
          <input type="number" class="form-control" v-model="quantity" />
        </div>

        <!-- ============ المستودعات ============ -->
        <div class="col-12 mt-4 mb-3">
          <h4>المستودعات</h4>
        </div>

        <div class="col-md-6 mb-4">
          <label class="form-label">مستودع المواد الخام</label>
          <select class="form-control" v-model="rawMaterialsWarehouse">
            <option value="">اختر المستودع</option>
            <option v-for="w in rawMaterialsWarehouseOptions" :key="w.id" :value="w.id">{{ w.name }}</option>
          </select>
        </div>

        <div class="col-md-6 mb-4">
          <label class="form-label">مستودع المنتج النهائي</label>
          <select class="form-control" v-model="finishedProductWarehouse">
            <option value="">اختر المستودع</option>
            <option v-for="w in finishedProductWarehouseOptions" :key="w.id" :value="w.id">{{ w.name }}</option>
          </select>
        </div>

        <!-- ============ الوحدات ============ -->
        <div class="col-12 mt-4 mb-3">
          <h4>الوحدات</h4>
        </div>

        <div class="col-md-3 mb-4">
          <label class="form-label">وحدة الرصيد</label>
          <select class="form-control" v-model="balanceUnit">
            <option value="">اختر الوحدة</option>
            <option v-for="u in balanceUnitOptions" :key="u.id" :value="u.id">{{ u.name }}</option>
          </select>
        </div>

        <div class="col-md-3 mb-4">
          <label class="form-label">الطول</label>
          <input type="text" class="form-control" v-model="length" />
        </div>

        <div class="col-md-3 mb-4">
          <label class="form-label">العرض</label>
          <input type="text" class="form-control" v-model="width" />
        </div>

        <div class="col-md-3 mb-4">
          <label class="form-label">الارتفاع</label>
          <input type="text" class="form-control" v-model="height" />
        </div>

        <div class="col-md-3 mb-4">
          <label class="form-label">عدد العمال</label>
          <input type="text" class="form-control" v-model="workerQuantity" />
        </div>

        <!-- الوحدة الثانية -->
        <div class="col-12 mt-3">
          <h5>الوحدة الثانية</h5>
        </div>
        <div class="col-md-3 mb-4">
          <label class="form-label">الوحدة الثانية</label>
          <select class="form-control" v-model="secondUnit">
            <option value="">اختر الوحدة</option>
            <option v-for="u in secondUnitOptions" :key="u.id" :value="u.id">{{ u.name }}</option>
          </select>
        </div>
        <div class="col-md-3 mb-4">
          <label class="form-label">تحتوي على</label>
          <select class="form-control" v-model="secondUnitContains">
            <option value="">اختر</option>
            <option v-for="u in secondUnitContainsOptions" :key="u.id" :value="u.id">{{ u.name }}</option>
          </select>
        </div>
        <div class="col-md-3 mb-4">
          <label class="form-label">العدد</label>
          <input type="text" class="form-control" v-model="secondUnitNumber" />
        </div>
        <div class="col-md-3 mb-4">
          <label class="form-label">رقم الصنف</label>
          <input type="text" class="form-control" v-model="secondUnitItemNumber" />
        </div>

        <!-- الوحدة الثالثة -->
        <div class="col-12 mt-3">
          <h5>الوحدة الثالثة</h5>
        </div>
        <div class="col-md-3 mb-4">
          <label class="form-label">الوحدة الثالثة</label>
          <select class="form-control" v-model="thirdUnit">
            <option value="">اختر الوحدة</option>
            <option v-for="u in thirdUnitOptions" :key="u.id" :value="u.id">{{ u.name }}</option>
          </select>
        </div>
        <div class="col-md-3 mb-4">
          <label class="form-label">تحتوي على</label>
          <select class="form-control" v-model="thirdUnitContains">
            <option value="">اختر</option>
            <option v-for="u in thirdUnitContainsOptions" :key="u.id" :value="u.id">{{ u.name }}</option>
          </select>
        </div>
        <div class="col-md-3 mb-4">
          <label class="form-label">العدد</label>
          <input type="text" class="form-control" v-model="thirdUnitNumber" />
        </div>
        <div class="col-md-3 mb-4">
          <label class="form-label">رقم الصنف</label>
          <input type="text" class="form-control" v-model="thirdUnitItemNumber" />
        </div>

        <!-- ============ الأسعار ============ -->
        <div class="col-12 mt-4 mb-3">
          <h4>الأسعار والخصومات</h4>
        </div>

        <div class="col-md-4 mb-4">
          <label class="form-label">السعر الأول للبيع</label>
          <input type="text" class="form-control" v-model="firstSellingPrice" />
        </div>

        <div class="col-md-4 mb-4">
          <label class="form-label">السعر الثاني للبيع</label>
          <input type="text" class="form-control" v-model="secondSellingPrice" />
        </div>

        <div class="col-md-4 mb-4">
          <label class="form-label">السعر الثالث للبيع</label>
          <input type="text" class="form-control" v-model="thirdSellingPrice" />
        </div>

        <div class="col-md-4 mb-4">
          <label class="form-label">نسبة خصم البيع</label>
          <input type="text" class="form-control" v-model="sellingDiscountPercentage" />
        </div>

        <div class="col-md-4 mb-4">
          <label class="form-label">أقصى خصم</label>
          <input type="text" class="form-control" v-model="maxDiscountPercentage" />
        </div>

        <div class="col-md-4 mb-4">
          <label class="form-label">أقل سعر</label>
          <input type="text" class="form-control" v-model="minPrice" />
        </div>

        <div class="col-md-4 mb-4">
          <label class="form-label">السعر الأول للشراء</label>
          <input type="text" class="form-control" v-model="firstPurchasePrice" />
        </div>

        <div class="col-md-4 mb-4">
          <label class="form-label">السعر الثاني للشراء</label>
          <input type="text" class="form-control" v-model="secondPurchasePrice" />
        </div>

        <div class="col-md-4 mb-4">
          <label class="form-label">السعر الثالث للشراء</label>
          <input type="text" class="form-control" v-model="thirdPurchasePrice" />
        </div>

        <!-- ============ معلومات إضافية ============ -->
        <div class="col-12 mt-4 mb-3">
          <h4>معلومات إضافية</h4>
        </div>

        <div class="col-md-6 mb-4">
          <label class="form-label">الباركود</label>
          <input type="text" class="form-control" v-model="barcode" />
        </div>

        <div class="col-md-6 mb-4">
          <label class="form-label">نوع الباركود</label>
          <select class="form-control" v-model="barcodeType">
            <option value="">اختر</option>
            <option value="code128">Code 128</option>
            <option value="ean13">EAN-13</option>
            <option value="qr">QR Code</option>
          </select>
        </div>

        <div class="col-md-6 mb-4">
          <label class="form-label">تاريخ الانتهاء</label>
          <input type="date" class="form-control" v-model="expireDate" />
        </div>

        <div class="col-md-6 mb-4">
          <label class="form-label">صورة الصنف</label>
          <input type="file" class="form-control" @change="handleFileChange" />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const API_BASE = 'https://alyaseenerp.com'
const loading = ref(false)

// الحقول
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
const firstSellingPrice = ref('')
const secondSellingPrice = ref('')
const thirdSellingPrice = ref('')
const sellingDiscountPercentage = ref('')
const maxDiscountPercentage = ref('')
const minPrice = ref('')
const firstPurchasePrice = ref('')
const secondPurchasePrice = ref('')
const thirdPurchasePrice = ref('')
const barcode = ref('')
const barcodeType = ref('')
const expireDate = ref('')
const selectedFile = ref(null)

// الخيارات
const rawMaterialsWarehouseOptions = ref([])
const finishedProductWarehouseOptions = ref([])
const balanceUnitOptions = ref([])
const secondUnitOptions = ref([])
const secondUnitContainsOptions = ref([])
const thirdUnitOptions = ref([])
const thirdUnitContainsOptions = ref([])

onMounted(() => {
  itemNumber.value = 'IT-' + Math.floor(Math.random() * 10000)

  // خيارات تجريبية
  rawMaterialsWarehouseOptions.value = [
    { id: 1, name: 'Warehouse A' },
    { id: 2, name: 'Warehouse B' }
  ]
  finishedProductWarehouseOptions.value = [
    { id: 1, name: 'Finished A' },
    { id: 2, name: 'Finished B' }
  ]
  balanceUnitOptions.value = [{ id: 'piece', name: 'قطعة' }]
  secondUnitOptions.value = [{ id: 'box', name: 'صندوق' }]
  secondUnitContainsOptions.value = [{ id: '10', name: '10 قطع' }]
  thirdUnitOptions.value = [{ id: 'pack', name: 'عبوة' }]
  thirdUnitContainsOptions.value = [{ id: '5', name: '5 صناديق' }]
})

// اختيار الصورة
const handleFileChange = (e) => {
  selectedFile.value = e.target.files[0]
}

// حفظ
const saveForm = async () => {
  loading.value = true;

  try {
    const formData = new FormData();

    // ✅ حاول استخدام قيم حقيقية، ولو مش موجودة استخدم افتراضية
    const defaultBranchId = 2; // رقم فرع افتراضي
    const defaultUnitId = 3;   // رقم وحدة افتراضي

    formData.append("company_id", 1);
    formData.append("branch_id", rawMaterialsWarehouse.value || defaultBranchId);
    formData.append("unit_id", balanceUnit.value || defaultUnitId);

    // ✅ الحقول المطلوبة
    formData.append("code", itemNumber.value || "IT-" + Date.now());
    formData.append("name", itemName.value || "صنف تجريبي");
    formData.append("type", "product");
    formData.append("item_type", "manufactured");
    formData.append("barcode_type", (barcodeType.value || "C128").toUpperCase());

    // ✅ الحقول الإضافية
    formData.append("quantity", Number(quantity.value) || 0);
    formData.append("barcode", barcode.value || "");
    formData.append("expire_date", expireDate.value || "");
    formData.append("raw_materials_warehouse_id", rawMaterialsWarehouse.value || "");
    formData.append("finished_product_warehouse_id", finishedProductWarehouse.value || "");
    formData.append("first_selling_price", Number(firstSellingPrice.value) || 0);
    formData.append("first_purchase_price", Number(firstPurchasePrice.value) || 0);
    formData.append("selling_vat", 0);
    formData.append("purchase_vat", 0);
    formData.append("item_vat", 0);
    formData.append("active", 1);

    if (selectedFile.value instanceof File) {
      formData.append("image", selectedFile.value);
    }

    // 🚀 أرسل الطلب
    await axios.post(`${API_BASE}/api/v1/items/register-item`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    Swal.fire("تم الحفظ", "تم إضافة الصنف بنجاح", "success");
    router.push("/admin/warehouses/items");
  } catch (err) {
    console.error("❌ خطأ أثناء الحفظ:", err.response?.data);

    // 🧩 لو السيرفر رجع 422 أو خطأ مشابه
    const apiErr = err.response?.data;
    const firstMsg =
      apiErr?.message ||
      Object.values(apiErr?.errors || {})?.[0]?.[0] ||
      "حدث خطأ أثناء الحفظ";

    // ⚙️ أنشئ صنف افتراضي محليًا كخطة بديلة
    const fallbackItem = {
      code: "TEMP-" + Date.now(),
      name: itemName.value || "صنف مؤقت",
      quantity: quantity.value || 0,
      note: "تم إنشاؤه محليًا بسبب فشل الاتصال بالسيرفر",
    };

    console.warn("⚠️ تم إنشاء صنف افتراضي:", fallbackItem);

    Swal.fire({
      icon: "warning",
      title: "فشل في حفظ الصنف",
      text: `${firstMsg}\n\nتم حفظ الصنف مؤقتًا محليًا.`,
      confirmButtonText: "حسنًا",
    });

    // يمكنك هنا مثلًا تخزينه في localStorage كخطة بديلة:
    localStorage.setItem("temp_item_backup", JSON.stringify(fallbackItem));
  } finally {
    loading.value = false;
  }
};




// إلغاء
const cancelForm = () => {
  Swal.fire({
    title: 'هل تريد الإلغاء؟',
    text: 'سيتم فقدان البيانات المدخلة',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'نعم',
    cancelButtonText: 'لا'
  }).then((res) => {
    if (res.isConfirmed) router.push('/admin/warehouses/items')
  })
}
</script>

<style scoped>
.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
