<template>
  <div class="container pe-5 ps-5">
    <h1><i class="bi bi-person-lines-fill"></i> {{ $t('label.supplier_details') }}</h1>

    <LoadingComponent :isLoading="isLoading" />

    <div v-if="!isLoading && supplier" class="mt-4">
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th>{{ $t('label.number') }}</th>
            <td>{{ supplier.number || '-' }}</td>
            <th>{{ $t('label.supplier_name') }}</th>
            <td>{{ supplier.supplier_name || '-' }}</td>
          </tr>
          <tr>
            <th>{{ $t('label.balance') }}</th>
            <td>{{ supplier.balance || 0 }}</td>
            <th>{{ $t('label.currency') }}</th>
            <td>{{ supplier.currency || '-' }}</td>
          </tr>
          <tr>
            <th>{{ $t('label.branch') }}</th>
            <td>{{ supplier.branch || '-' }}</td>
            <th>{{ $t('label.last_transaction') }}</th>
            <td>{{ supplier.last_transaction || '-' }}</td>
          </tr>
          <tr>
            <th>{{ $t('label.mobile') }}</th>
            <td>{{ supplier.mobile || '-' }}</td>
            <th>{{ $t('label.sales_representative') }}</th>
            <td>{{ supplier.sales_representative || '-' }}</td>
          </tr>
          <!-- يمكنك إضافة المزيد من الحقول حسب الحاجة -->
        </tbody>
      </table>

      <div class="mt-3 d-flex gap-2">
        <router-link :to="{ name: 'admin.edit-supplier', params: { id: supplier.id } }" class="btn btn-primary">
          {{ $t('buttons.edit') }}
        </router-link>
        <router-link :to="{ name: 'admin.suppliers' }" class="btn btn-secondary">
          {{ $t('buttons.back') }}
        </router-link>
      </div>
    </div>

    <div v-else-if="!isLoading" class="text-center py-4">
      {{ $t('label.supplier_not_found') }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import Swal from 'sweetalert2';

export default {
  name: 'SupplierShowComponent',
  components: { LoadingComponent },
  data() {
    return {
      isLoading: true,
      supplier: null
    };
  },
  methods: {
    async fetchSupplier() {
      const baseUrl = process.env.VUE_APP_API_BASE_URL;
      const token = localStorage.getItem('token');

      try {
        const res = await axios.get(`${baseUrl}/api/v1/suppliers/${this.$route.params.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.supplier = res.data.data || res.data;
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to fetch supplier data', 'error');
      } finally {
        this.isLoading = false;
      }
    }
  },
  mounted() {
    this.fetchSupplier();
  }
};
</script>

<style scoped>
table th {
  width: 20%;
  background-color: #F4FFF0;
}
table td {
  width: 30%;
}
</style>
