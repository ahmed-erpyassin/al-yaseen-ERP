<template>
  <LoadingComponent :isLoading="isLoading" />

  <div class="container pe-5 ps-5">
    <h1><i class="bi bi-bar-chart-line"></i> {{ $t('label.promotions-evaluations') }}</h1>

    <!-- Tabs -->
    <ul class="nav nav-tabs mb-3">
      <li class="nav-item">
        <button class="nav-link" :class="{ active: activeTab === 'promotions' }" @click="activeTab='promotions'">
          {{ $t('label.promotions') }}
        </button>
      </li>
      <li class="nav-item">
        <button class="nav-link" :class="{ active: activeTab === 'evaluations' }" @click="activeTab='evaluations'">
          {{ $t('label.evaluations') }}
        </button>
      </li>
    </ul>

    <!-- ✅ Tab: Promotions -->
    <div v-if="activeTab === 'promotions'">
      <div class="d-flex justify-content-end mb-3">
        <button class="btn btn-main" @click="openAddPromotionModal">{{ $t('buttons.add') }}</button>
      </div>

      <div class="table-responsive">
        <table class="table table-bordered text-center align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>{{ $t('label.employee') }}</th>
              <th>{{ $t('label.old_position') }}</th>
              <th>{{ $t('label.new_position') }}</th>
              <th>{{ $t('label.date') }}</th>
              <th>{{ $t('label.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="6" class="text-center"><div class="spinner-border"></div></td>
            </tr>
            <tr v-else-if="promotions.length === 0">
              <td colspan="6" class="text-center">No promotions found</td>
            </tr>
            <tr v-else v-for="(p, index) in promotions" :key="p.id">
              <td>{{ index + 1 }}</td>
              <td>{{ p.employee_name }}</td>
              <td>{{ p.old_position }}</td>
              <td>{{ p.new_position }}</td>
              <td>{{ p.date }}</td>
              <td>
                <i class="bi bi-pencil action-icon me-2" @click="editPromotion(p)" title="Edit"></i>
                <i class="bi bi-trash action-icon" @click="deletePromotion(p)" title="Delete"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ✅ Tab: Evaluations -->
    <div v-if="activeTab === 'evaluations'">
      <div class="d-flex justify-content-end mb-3">
        <button class="btn btn-main" @click="openAddEvaluationModal">{{ $t('buttons.add') }}</button>
      </div>

      <div class="table-responsive">
        <table class="table table-bordered text-center align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>{{ $t('label.employee') }}</th>
              <th>{{ $t('label.grade') }}</th>
              <th>{{ $t('label.comments') }}</th>
              <th>{{ $t('label.date') }}</th>
              <th>{{ $t('label.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="6" class="text-center"><div class="spinner-border"></div></td>
            </tr>
            <tr v-else-if="evaluations.length === 0">
              <td colspan="6" class="text-center">No evaluations found</td>
            </tr>
            <tr v-else v-for="(e, index) in evaluations" :key="e.id">
              <td>{{ index + 1 }}</td>
              <td>{{ e.employee_name }}</td>
              <td>{{ e.grade }}</td>
              <td>{{ e.comments }}</td>
              <td>{{ e.date }}</td>
              <td>
                <i class="bi bi-pencil action-icon me-2" @click="editEvaluation(e)" title="Edit"></i>
                <i class="bi bi-trash action-icon" @click="deleteEvaluation(e)" title="Delete"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Add/Edit Promotion -->
    <div class="modal fade" id="promotionModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-md">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title">{{ promotionModalTitle }}</h5>
            <button type="button" class="btn-close btn-close-white" @click="closePromotionModal"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label>Employee</label>
                <input v-model="promotionForm.employee_name" type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label>Old Position</label>
                <input v-model="promotionForm.old_position" type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label>New Position</label>
                <input v-model="promotionForm.new_position" type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label>Date</label>
                <input v-model="promotionForm.date" type="date" class="form-control" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closePromotionModal">{{ $t('buttons.close') }}</button>
            <button class="btn btn-main" @click="savePromotion">{{ $t('buttons.save') }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Add/Edit Evaluation -->
    <div class="modal fade" id="evaluationModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-md">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title">{{ evaluationModalTitle }}</h5>
            <button type="button" class="btn-close btn-close-white" @click="closeEvaluationModal"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label>Employee</label>
                <input v-model="evaluationForm.employee_name" type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label>Grade</label>
                <input v-model="evaluationForm.grade" type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label>Comments</label>
                <textarea v-model="evaluationForm.comments" class="form-control"></textarea>
              </div>
              <div class="mb-3">
                <label>Date</label>
                <input v-model="evaluationForm.date" type="date" class="form-control" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeEvaluationModal">{{ $t('buttons.close') }}</button>
            <button class="btn btn-main" @click="saveEvaluation">{{ $t('buttons.save') }}</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';
import axios from 'axios';

export default {
  name: 'PromotionsEvaluationsComponent',
  components: { LoadingComponent },
  data() {
    return {
      isLoading: true,
      activeTab: 'promotions',
      useApi: false, // true = استخدام API
      promotions: [],
      evaluations: [],
      promotionForm: {},
      promotionModalTitle: '',
      evaluationForm: {},
      evaluationModalTitle: ''
    };
  },
  methods: {
    // ---- Fetch ----
    fetchPromotions() {
      this.isLoading = true;
      if (this.useApi) {
        axios.get('{{baseUrl}}/api/v1/promotions')
          .then(res => this.promotions = res.data.data || res.data)
          .catch(() => Swal.fire('Error', 'Failed to fetch promotions', 'error'))
          .finally(() => this.isLoading = false);
      } else {
        this.promotions = [
          { id: 1, employee_name: 'Ali', old_position: 'Junior', new_position: 'Senior', date: '2025-10-02' }
        ];
        this.isLoading = false;
      }
    },
    fetchEvaluations() {
      this.isLoading = true;
      if (this.useApi) {
        axios.get('{{baseUrl}}/api/v1/evaluations')
          .then(res => this.evaluations = res.data.data || res.data)
          .catch(() => Swal.fire('Error', 'Failed to fetch evaluations', 'error'))
          .finally(() => this.isLoading = false);
      } else {
        this.evaluations = [
          { id: 1, employee_name: 'Ali', grade: 'A', comments: 'Excellent work', date: '2025-10-02' }
        ];
        this.isLoading = false;
      }
    },

    // ---- Promotions ----
    openAddPromotionModal() {
      this.promotionForm = { employee_name:'', old_position:'', new_position:'', date:'' };
      this.promotionModalTitle = 'Add Promotion';
      new bootstrap.Modal(document.getElementById('promotionModal')).show();
    },
    editPromotion(p) {
      this.promotionForm = { ...p };
      this.promotionModalTitle = 'Edit Promotion';
      new bootstrap.Modal(document.getElementById('promotionModal')).show();
    },
    closePromotionModal() {
      const modal = bootstrap.Modal.getInstance(document.getElementById('promotionModal'));
      if(modal) modal.hide();
    },
    savePromotion() {
      if(this.useApi) {
        // Call API to save
      } else {
        if(this.promotionForm.id) {
          const idx = this.promotions.findIndex(p=>p.id===this.promotionForm.id);
          if(idx!==-1) this.promotions.splice(idx,1,{...this.promotionForm});
        } else {
          this.promotionForm.id = this.promotions.length+1;
          this.promotions.push({...this.promotionForm});
        }
      }
      Swal.fire('Success','Promotion saved','success');
      this.closePromotionModal();
    },
    deletePromotion(p) {
      if(confirm('Are you sure?')) {
        const idx = this.promotions.findIndex(pr=>pr.id===p.id);
        if(idx!==-1) this.promotions.splice(idx,1);
        Swal.fire('Deleted','Promotion removed','success');
      }
    },

    // ---- Evaluations ----
    openAddEvaluationModal() {
      this.evaluationForm = { employee_name:'', grade:'', comments:'', date:'' };
      this.evaluationModalTitle = 'Add Evaluation';
      new bootstrap.Modal(document.getElementById('evaluationModal')).show();
    },
    editEvaluation(e) {
      this.evaluationForm = { ...e };
      this.evaluationModalTitle = 'Edit Evaluation';
      new bootstrap.Modal(document.getElementById('evaluationModal')).show();
    },
    closeEvaluationModal() {
      const modal = bootstrap.Modal.getInstance(document.getElementById('evaluationModal'));
      if(modal) modal.hide();
    },
    saveEvaluation() {
      if(this.useApi) {
        // Call API to save
      } else {
        if(this.evaluationForm.id) {
          const idx = this.evaluations.findIndex(ev=>ev.id===this.evaluationForm.id);
          if(idx!==-1) this.evaluations.splice(idx,1,{...this.evaluationForm});
        } else {
          this.evaluationForm.id = this.evaluations.length+1;
          this.evaluations.push({...this.evaluationForm});
        }
      }
      Swal.fire('Success','Evaluation saved','success');
      this.closeEvaluationModal();
    },
    deleteEvaluation(e) {
      if(confirm('Are you sure?')) {
        const idx = this.evaluations.findIndex(ev=>ev.id===e.id);
        if(idx!==-1) this.evaluations.splice(idx,1);
        Swal.fire('Deleted','Evaluation removed','success');
      }
    }
  },
  mounted() {
    this.fetchPromotions();
    this.fetchEvaluations();
  }
}
</script>

<style scoped>
.action-icon {
  cursor: pointer;
  font-size: 1.2rem;
}
</style>
