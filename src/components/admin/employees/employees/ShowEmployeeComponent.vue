<template>
  <div class="container mt-5" v-if="isAuthenticated">
    <div v-if="isLoading" class="text-center">
      <div class="spinner-border" role="status"></div>
    </div>

    <div v-else-if="!employee">
      <p class="text-center">الموظف غير موجود</p>
      <router-link :to="{ name: 'admin.employees' }" class="btn btn-primary mt-3">العودة للموظفين</router-link>
    </div>

    <div v-else class="card p-4">
      <h2 class="mb-4">{{ employee.name }}</h2>
      <table class="table table-borderless">
        <tbody>
          <tr>
            <th>ID:</th>
            <td>{{ employee.id }}</td>
            <th>{{ $t('label.department') }}:</th>
            <td>{{ employee.department }}</td>
          </tr>
          <tr>
            <th>{{ $t('label.branch') }}:</th>
            <td>{{ employee.branch }}</td>
            <th>{{ $t('label.phone') }}:</th>
            <td>{{ employee.phone }}</td>
          </tr>
          <tr>
            <th>{{ $t('label.balance') }}:</th>
            <td>{{ employee.balance }}</td>
            <th>{{ $t('label.currency') }}:</th>
            <td>{{ employee.currency }}</td>
          </tr>
        </tbody>
      </table>
      <div class="mt-4">
        <router-link :to="{ name: 'admin.employees' }" class="btn btn-secondary me-2">العودة</router-link>
        <router-link :to="{ name: 'admin.employees.edit', params: { id: employee.id } }" class="btn btn-primary">تعديل</router-link>
      </div>
    </div>
  </div>

  <div v-else class="text-center mt-5">
    <p>يرجى تسجيل الدخول للوصول إلى الموظفين.</p>
    <router-link :to="{ name: 'auth.login' }" class="btn btn-primary mt-3">تسجيل الدخول</router-link>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: "ShowEmployeeComponent",
  data() {
    return {
      baseUrl: process.env.VUE_APP_API_BASE_URL,
      employee: null,
      isLoading: true,
    };
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('authToken');
    }
  },
  methods: {
    async fetchEmployee() {
      const id = this.$route.params.id;
      if (!id) return;

      this.isLoading = true;
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get(`${this.baseUrl}/employees/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Accept-Language': 'ar'
          }
        });
        this.employee = res.data || res.data.data;
      } catch (err) {
        console.error(err);
        Swal.fire('خطأ', 'تعذر تحميل بيانات الموظف', 'error');
      } finally {
        this.isLoading = false;
      }
    },

    // بيانات وهمية للعرض بدون API
    loadDummyEmployee() {
      const id = this.$route.params.id || 1;
      this.employee = {
        id,
        name: `Employee ${id}`,
        department: ["HR", "Sales", "IT"][id % 3],
        branch: ["Main Branch", "Gaza Branch", "Ramallah Branch"][id % 3],
        phone: `059${1000000 + id}`,
        balance: (Math.random() * 10000).toFixed(2),
        currency: ["USD", "ILS", "EUR"][id % 3]
      };
      this.isLoading = false;
    }
  },
  mounted() {
    // اختر هنا ما إذا كنت تريد استخدام API أو بيانات وهمية
    const useApi = false;

    if (useApi) {
      this.fetchEmployee();
    } else {
      this.loadDummyEmployee();
    }
  }
};
</script>

<style scoped>
.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
th {
  width: 20%;
}
td {
  width: 30%;
}
</style>
