<template>
    <div class="container my-4">

        <!-- بيانات المشروع -->
        <div class="card mb-4 shadow-sm">
            <div class="card-body">
                <h3>{{ project.name }} <small class="text-muted">({{ project.code }})</small></h3>
                <p>Progress: <strong>{{ project.progress }}%</strong></p>
                <p>Budget: <strong>${{ project.actual_cost }} / ${{ project.budget }}</strong></p>
                <p>Duration: {{ project.start_date }} – {{ project.end_date }}</p>

                <!-- زر إغلاق المشروع -->
                <button class="btn btn-success btn-lg mt-3" @click="openCloseModal">
                    <i class="bi bi-lock-fill me-2"></i> Close Project
                </button>
            </div>
        </div>

        <!-- مودال تأكيد الإغلاق -->
        <div class="modal fade" id="closeModal" tabindex="-1" ref="closeModal">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">Confirm Project Closure</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">

                        <!-- خيارات الحالة النهائية -->
                        <div class="mb-3">
                            <label class="form-label">Closure Status:</label>
                            <div class="d-flex gap-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" id="closed" value="Closed"
                                        v-model="closeStatus">
                                    <label class="form-check-label" for="closed">✅ Closed</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" id="onhold" value="On-Hold"
                                        v-model="closeStatus">
                                    <label class="form-check-label" for="onhold">⏸ On-Hold</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" id="cancelled" value="Cancelled"
                                        v-model="closeStatus">
                                    <label class="form-check-label" for="cancelled">❌ Cancelled</label>
                                </div>
                            </div>
                        </div>

                        <!-- حقل الملاحظات -->
                        <div class="mb-3">
                            <label for="notes" class="form-label">Comments / Notes</label>
                            <textarea id="notes" class="form-control" rows="4" v-model="notes"
                                placeholder="Add comments if needed..."></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-success" @click="confirmClose">Confirm Closure</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';

const project = ref({
    name: 'Project Alpha',
    code: 'PA-001',
    progress: 75,
    budget: 5000,
    actual_cost: 4000,
    start_date: 'Jan 15, 2024',
    end_date: 'Jun 30, 2024'
});

const closeStatus = ref('Closed');
const notes = ref('');

const closeModal = ref(null);

const openCloseModal = () => {
    const modal = new bootstrap.Modal(closeModal.value);
    modal.show();
};

const confirmClose = () => {
    if (!closeStatus.value) {
        alert('Please select a closure status.');
        return;
    }
    console.log('Project Closed as:', closeStatus.value, 'Notes:', notes.value);
    bootstrap.Modal.getInstance(closeModal.value).hide();
};
</script>

<style scoped>
.card {
    border-radius: 10px;
}

.modal-body .form-check-label {
    font-weight: 500;
}
</style>
