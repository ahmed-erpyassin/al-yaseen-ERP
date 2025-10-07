<template>
    <div class="container pe-5 ps-5">
        <h1 class="mb-4"><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>

        <!-- أزرار الإجراء -->
        <div class="d-flex align-items-center justify-content-end mb-4">
            <router-link :to="{ name: 'admin.accounting.departments.create' }" class="btn btn-lg btn-main me-3">
                {{ $t('buttons.create') }}
            </router-link>
        </div>

        <!-- عنوان الأقسام -->
        <div class="row mb-3">
            <div class="col-12">
                <h3>{{ $t('label.departments') }}</h3>
            </div>
        </div>

        <!-- شريط الإجراءات -->
        <div class="d-flex flex-wrap align-items-center actions mb-4">
            <div class="action-item search me-3 mb-2">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control d-inline-block w-auto" v-model="searchQuery"
                    :placeholder="$t('label.search_department')" />
            </div>
            <div class="action-item dropdown me-3 mb-2">
                <i class="bi bi-gear" type="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                <ul class="dropdown-menu p-2" style="min-width: 200px;">
                    <li v-for="(th, index) in table.fields" :key="index">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="th.status" :id="'col' + index">
                            <label class="form-check-label" :for="'col' + index">{{ th.name }}</label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- جدول الأقسام -->
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-for="(th, index) in visibleFields" :key="index">{{ th.name }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="isLoading">
                        <td :colspan="visibleFields.length" class="text-center">
                            <div class="spinner-border" role="status"></div>
                        </td>
                    </tr>
                    <tr v-else-if="filteredDepartments.length === 0">
                        <td :colspan="visibleFields.length" class="text-center">لا توجد سجلات</td>
                    </tr>
                    <tr v-else v-for="department in paginatedDepartments" :key="department.id">
                        <td v-for="th in visibleFields" :key="th.key">{{ department[th.key] }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- الصفحات -->
        <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-secondary" @click="prevPage" :disabled="currentPage === 1">{{ $t('buttons.previous')
                }}</button>
            <span>{{ $t('label.page') }} {{ currentPage }} {{ $t('label.of') }} {{ totalPages }}</span>
            <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">{{
                $t('buttons.next') }}</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "DepartmentsComponent",
    data() {
        return {
            searchQuery: "",
            currentPage: 1,
            perPage: 8,
            isLoading: false,
            departments: [],
            table: {
                fields: [
                    { name: this.$t('label.number'), key: "number", status: true },
                    { name: this.$t('label.statement'), key: "statement", status: true },
                    { name: this.$t('label.statement_en'), key: "statement_en", status: true },
                    { name: this.$t('label.estimated_balance'), key: "estimated_balance", status: true },
                    { name: this.$t('label.manager'), key: "manager", status: true },
                    { name: this.$t('label.project_start_date'), key: "start_date", status: true },
                    { name: this.$t('label.project_end_date'), key: "end_date", status: true }
                ]
            }
        };
    },
    computed: {
        visibleFields() { return this.table.fields.filter(f => f.status); },
        filteredDepartments() {
            if (!this.searchQuery) return this.departments;
            return this.departments.filter(d => (d.statement || '').toLowerCase().includes(this.searchQuery.toLowerCase()));
        },
        paginatedDepartments() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredDepartments.slice(start, start + this.perPage);
        },
        totalPages() { return Math.ceil(this.filteredDepartments.length / this.perPage); }
    },
    methods: {
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },

        async fetchDepartments() {
            this.isLoading = true;
            try {
                const token = localStorage.getItem('authToken'); // افتراض وجود توكن
                const res = await axios.get('/departments', {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { per_page: this.perPage, page: this.currentPage }
                });
                this.departments = res.data.data || res.data;
            } catch (err) {
                console.error(err);
            } finally {
                this.isLoading = false;
            }
        }
    },
    watch: {
        currentPage() { this.fetchDepartments(); },
        perPage() { this.fetchDepartments(); }
    },
    mounted() {
        this.fetchDepartments();
    }
};
</script>

<style scoped>
.header th {
    background-color: #F4FFF0 !important;
}

.actions i {
    font-size: 24px;
}

.actions span {
    font-size: 18px;
}

.form-check-input:checked[type=checkbox] {
    border-radius: 50%;
    background-color: #1D7342 !important;
}
</style>




<!-- <template> -->
  <!-- <div class="container pe-5 ps-5">
    <h1 class="mb-4"><i class="bi bi-diagram-3"></i> الهيكل التنظيمي</h1> -->

    <!-- المخطط التنظيمي وهمي -->
    <!-- <div class="org-chart">
      <div class="node">الشركة الرئيسية</div>
      <div class="children">
        <div class="node">المدير العام (أحمد)</div>
        <div class="node">نائب المدير (سارة)</div>
      </div>
      <div class="children">
        <div class="node">قسم المبيعات</div>
        <div class="node">قسم التسويق</div>
        <div class="node">قسم الموارد البشرية</div>
      </div>
    </div>
  </div> -->
<!-- </template> -->

<!-- <script> -->
// export default {
//   name: "FakeOrgChart"
// };
<!-- </script> -->

<!-- <style scoped>
.org-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}

.org-chart .node {
  background-color: #1D7342;
  color: #fff;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 8px;
  text-align: center;
  min-width: 150px;
}

.org-chart .children {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style> -->

