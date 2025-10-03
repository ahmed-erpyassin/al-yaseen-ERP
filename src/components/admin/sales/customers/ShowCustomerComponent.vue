<template>
  <div class="container pe-5 ps-5">
    <LoadingComponent :isLoading="isLoading" />

    <h1 class="mb-4"><i class="bi bi-person"></i> {{ customer?.company_name || customer?.first_name || 'تفاصيل العميل' }}</h1>

    <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>

    <div v-if="customer">
      <!-- معلومات العميل الأساسية -->
      <div class="card mb-4">
        <div class="card-header bg-success text-white">
          {{ $t('label.customer_information') }}
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-4 mb-2"><strong>رقم العميل:</strong> {{ customer.customer_number }}</div>
            <div class="col-md-4 mb-2"><strong>اسم العميل:</strong> {{ customer.company_name || customer.first_name + ' ' + customer.second_name }}</div>
            <div class="col-md-4 mb-2"><strong>البريد الإلكتروني:</strong> {{ customer.email }}</div>
            <div class="col-md-4 mb-2"><strong>الجوال:</strong> {{ customer.mobile }}</div>
            <div class="col-md-4 mb-2"><strong>الهاتف:</strong> {{ customer.phone }}</div>
            <div class="col-md-4 mb-2"><strong>الفرع:</strong> {{ customer.branch }}</div>
            <div class="col-md-4 mb-2"><strong>الحالة:</strong> {{ customer.status }}</div>
            <div class="col-md-8 mb-2"><strong>العنوان:</strong> {{ customer.address_one }} {{ customer.address_two }}</div>
            <div class="col-md-4 mb-2"><strong>الرمز البريدي:</strong> {{ customer.postal_code }}</div>
            <div class="col-12 mb-2"><strong>ملاحظات:</strong> {{ customer.notes }}</div>
          </div>
        </div>
      </div>

      <!-- العمليات على العميل -->
      <div class="card">
        <div class="card-header bg-primary text-white">
          {{ $t('label.customer_transactions') }}
        </div>
        <div class="card-body">
          <div v-if="transactions.length === 0" class="text-center">
            لا توجد عمليات للعميل بعد.
          </div>

          <div v-else class="table-responsive">
            <table class="table table-bordered text-center align-middle">
              <thead>
                <tr class="header">
                  <th>رقم العملية</th>
                  <th>التاريخ</th>
                  <th>النوع</th>
                  <th>المبلغ</th>
                  <th>الوصف</th>
                  <th>المستخدم</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tran in transactions" :key="tran.id">
                  <td>{{ tran.id }}</td>
                  <td>{{ formatDate(tran.date) }}</td>
                  <td>{{ tran.type }}</td>
                  <td>{{ tran.amount }}</td>
                  <td>{{ tran.description }}</td>
                  <td>{{ tran.user }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="mt-3">
        <button class="btn btn-secondary" @click="goBack">{{ $t('buttons.back') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();
const baseUrl = process.env.VUE_APP_API_BASE_URL;

const customer = ref(null);
const transactions = ref([]);
const isLoading = ref(false);
const errorMsg = ref(null);

const fetchCustomerData = async () => {
  isLoading.value = true;
  errorMsg.value = null;

  try {
    const token = localStorage.getItem('authToken');
    const customerId = route.params.id;

    // جلب بيانات العميل
    const resCustomer = await axios.get(`/customers/${customerId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    customer.value = resCustomer.data.data || resCustomer.data;

    // جلب العمليات المتعلقة بالعميل
    const resTransactions = await axios.get(`${baseUrl}/customers/${customerId}/transactions`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    transactions.value = resTransactions.data.data || resTransactions.data;

  } catch (err) {
    console.error(err);
    errorMsg.value = 'فشل في جلب بيانات العميل أو العمليات';
    Swal.fire('خطأ', errorMsg.value, 'error');
  } finally {
    isLoading.value = false;
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  fetchCustomerData();
});
</script>

<style>
.header th {
  background-color: #F4FFF0 !important;
}

.card-header {
  font-weight: 600;
}

.table th, .table td {
  vertical-align: middle;
}
</style>
