<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>

        <div class="row">
            <div class="col-12">
                <h3 class="mb-5 mt-5">{{ $t('label.tasks') }}</h3>
            </div>
        </div>

        <!-- Filter Buttons -->
        <div class="filter-buttons mb-4">
            <button v-for="filter in filters" :key="filter.key"
                :class="['filter-btn', { 'active': activeFilter === filter.key }]" @click="setActiveFilter(filter.key)">
                {{ filter.label }}
            </button>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons mb-4">
            <button type="button" class="btn btn-success btn-add-task" @click="openAddTaskModal">
                <i class="bi bi-plus me-2"></i>{{ $t('buttons.add_new_task') }}
            </button>
            <button type="button" class="btn btn-secondary btn-filters ms-5">
                <i class="bi bi-funnel me-2"></i>{{ $t('buttons.filters') }}
            </button>
        </div>

        <!-- Tasks Table -->
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th>{{ $t('label.task') }}</th>
                        <th>{{ $t('label.status') }}</th>
                        <th>{{ $t('label.priority') }}</th>
                        <th>{{ $t('label.assigned_to') }}</th>
                        <th>{{ $t('label.created_by') }}</th>
                        <th>{{ $t('label.due_date') }}</th>
                        <th>{{ $t('label.actions') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="task in tasks" :key="task.id">
                        <td>
                            <div class="task-info">
                                <div class="task-title">{{ task.title }}</div>
                                <div class="task-description">{{ task.description }}</div>
                            </div>
                        </td>
                        <td>
                            <span :class="['badge', 'status-badge', getStatusClass(task.status)]">
                                {{ task.status_label }}
                            </span>
                        </td>
                        <td>
                            <span :class="['priority-badge', getPriorityClass(task.priority)]">
                                {{ task.priority_label }}
                            </span>
                        </td>
                        <td>{{ task.assigned_to }}</td>
                        <td>{{ task.created_by }}</td>
                        <td>{{ task.due_date }}</td>
                        <td class="text-center">
                            <i class="bi bi-eye action-icon me-2" title="View" @click="openViewModal(task)"></i>
                            <i class="bi bi-pencil action-icon me-2" title="Edit" @click="openEditModal(task)"></i>
                            <i class="bi bi-trash action-icon" title="Delete" @click="confirmDelete(task)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Add / Edit / View Task Modal -->
        <div v-if="showTaskModal" class="modal-overlay" @click="closeTaskModal">
            <div class="modal-content add-task-modal" @click.stop>
                <div :class="['modal-header', modalType === 'add' ? 'bg-success text-white' : 'bg-warning text-dark']">
                    <h5 class="modal-title">{{ modalTitle }}</h5>
                    <button type="button" class="btn-close" @click="closeTaskModal"></button>
                </div>

                <div class="modal-body" v-if="modalType !== 'view'">
                    <form @submit.prevent="saveTask">
                        <div class="form-group mb-3">
                            <label class="form-label">{{ $t('label.task_name') }}</label>
                            <input type="text" class="form-control" v-model="modalTask.title" required />
                        </div>

                        <div class="form-group mb-3">
                            <label class="form-label">{{ $t('label.notes') }}</label>
                            <textarea class="form-control" rows="3" v-model="modalTask.description"></textarea>
                        </div>

                        <div class="form-group mb-3">
                            <label class="form-label">{{ $t('label.assign_to') }}</label>
                            <select class="form-control" v-model="modalTask.assigned_to" required>
                                <option value="">Select</option>
                                <option value="ahmed">أحمد علي السيد</option>
                                <option value="mohamed">محمد أحمد</option>
                                <option value="sara">سارة محمد</option>
                            </select>
                        </div>

                        <div class="form-group mb-3">
                            <label class="form-label">{{ $t('label.status') }}</label>
                            <select class="form-control" v-model="modalTask.status" required>
                                <option value="open">{{ $t('status.open') }}</option>
                                <option value="in_progress">{{ $t('status.in_progress') }}</option>
                                <option value="completed">{{ $t('status.completed') }}</option>
                                <option value="pending">{{ $t('status.pending') }}</option>
                            </select>
                        </div>

                        <div class="form-group mb-3">
                            <label class="form-label">{{ $t('label.due_date') }}</label>
                            <input type="date" class="form-control" v-model="modalTask.due_date" required />
                        </div>
                    </form>
                </div>

                <div class="modal-body" v-else>
                    <p><b>العنوان:</b> {{ modalTask.title }}</p>
                    <p><b>الوصف:</b> {{ modalTask.description }}</p>
                    <p><b>المسؤول:</b> {{ modalTask.assigned_to }}</p>
                    <p><b>الحالة:</b> {{ modalTask.status_label }}</p>
                    <p><b>تاريخ الاستحقاق:</b> {{ modalTask.due_date }}</p>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeTaskModal">{{ $t('buttons.cancel')
                        }}</button>
                    <button v-if="modalType !== 'view'" type="button"
                        :class="['btn', modalType === 'add' ? 'btn-success' : 'btn-warning']" @click="saveTask">{{
                        $t('buttons.save') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    name: 'TasksComponent',
    data() {
        return {
            activeFilter: 'all',
            tasks: [
                { id: 1, title: 'تقرير شهري', description: 'المبيعات والمشتريات', status: 'completed', status_label: 'مكتملة', priority: 'medium', priority_label: 'متوسط', assigned_to: 'أحمد علي السيد', created_by: 'أحمد علي السيد', due_date: '2025-01-10' },
                { id: 2, title: 'مراجعة العقود', description: 'مراجعة جميع العقود', status: 'in_progress', status_label: 'قيد التنفيذ', priority: 'high', priority_label: 'عالي', assigned_to: 'محمد أحمد', created_by: 'أحمد علي السيد', due_date: '2025-01-15' }
            ],
            filters: [
                { key: 'all', label: this.$t('buttons.all_tasks') },
                { key: 'open', label: this.$t('buttons.open_tasks') },
                { key: 'my', label: this.$t('buttons.my_tasks') },
                { key: 'daily', label: this.$t('buttons.daily_due_date') },
                { key: 'overdue', label: this.$t('buttons.overdue') }
            ],
            showTaskModal: false,
            modalTask: {},
            modalType: '',
            modalTitle: ''
        }
    },
    methods: {
        setActiveFilter(key) { this.activeFilter = key },
        getStatusClass(status) {
            return { 'completed': 'bg-success', 'in_progress': 'bg-warning', 'pending': 'bg-secondary', 'overdue': 'bg-danger' }[status] || 'bg-secondary';
        },
        getPriorityClass(priority) {
            return { 'high': 'priority-high', 'medium': 'priority-medium', 'low': 'priority-low' }[priority] || 'priority-medium';
        },
        openAddTaskModal() {
            this.modalTask = { title: '', description: '', assigned_to: '', status: 'open', due_date: '' };
            this.modalType = 'add';
            this.modalTitle = this.$t('buttons.add_new_task');
            this.showTaskModal = true;
        },
        openEditModal(task) {
            this.modalTask = { ...task };
            this.modalType = 'edit';
            this.modalTitle = this.$t('buttons.edit_task') || 'تعديل المهمة';
            this.showTaskModal = true;
        },
        openViewModal(task) {
            this.modalTask = { ...task };
            this.modalType = 'view';
            this.modalTitle = this.$t('buttons.view_task') || 'عرض المهمة';
            this.showTaskModal = true;
        },
        closeTaskModal() { this.showTaskModal = false },
        saveTask() {
            if (!this.modalTask.title || !this.modalTask.assigned_to || !this.modalTask.due_date) {
                Swal.fire({ icon: 'error', title: 'فشل', text: 'الرجاء تعبئة جميع الحقول المطلوبة!' });
                return;
            }

            if (this.modalType === 'add') {
                const newTask = {
                    id: this.tasks.length + 1,
                    title: this.modalTask.title,
                    description: this.modalTask.description,
                    status: this.modalTask.status,
                    status_label: this.getStatusLabel(this.modalTask.status),
                    priority: 'medium',
                    priority_label: 'متوسط',
                    assigned_to: this.modalTask.assigned_to,
                    created_by: 'أحمد علي السيد',
                    due_date: this.modalTask.due_date
                };
                this.tasks.unshift(newTask);
                Swal.fire({ icon: 'success', title: 'تمت الإضافة', text: `تمت إضافة المهمة: ${newTask.title}` });
            } else if (this.modalType === 'edit') {
                const index = this.tasks.findIndex(t => t.id === this.modalTask.id);
                if (index !== -1) {
                    this.modalTask.status_label = this.getStatusLabel(this.modalTask.status);
                    this.tasks.splice(index, 1, this.modalTask);
                    Swal.fire({ icon: 'success', title: 'تم التعديل', text: `تم تعديل المهمة: ${this.modalTask.title}` });
                }
            }
            this.closeTaskModal();
        },
        confirmDelete(task) {
            Swal.fire({
                title: 'هل أنت متأكد من حذف المهمة؟',
                text: `سيتم حذف المهمة: ${task.title}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'نعم، احذف!',
                cancelButtonText: 'إلغاء'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.tasks = this.tasks.filter(t => t.id !== task.id);
                    Swal.fire({ icon: 'success', title: 'تم الحذف', text: `تم حذف المهمة: ${task.title}` });
                }
            });
        },
        getStatusLabel(status) {
            return { 'completed': 'مكتملة', 'in_progress': 'قيد التنفيذ', 'pending': 'قيد الانتظار', 'open': 'مفتوحة', 'overdue': 'متأخرة' }[status] || 'مفتوحة';
        }
    }
}
</script>


<style scoped>
/* Buttons */
.btn-main {
    background-color: #28a745;
    border-color: #28a745;
    color: white;
}

.btn-main:hover {
    background-color: #218838;
    border-color: #1e7e34;
}

.btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;
    color: white;
}

.btn-success {
    background-color: #28a745;
    border-color: #28a745;
    color: white;
}

.btn-success:hover {
    background-color: #218838;
    border-color: #1e7e34;
}

.btn-warning {
    background-color: #ffc107;
    border-color: #ffc107;
    color: #212529;
}

.btn-warning:hover {
    background-color: #e0a800;
    border-color: #d39e00;
}

.btn-secondary:hover {
    background-color: #5a6268;
}

/* Filter Buttons */
.filter-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
}

.filter-btn {
    padding: 0.5rem 1rem;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    cursor: pointer;
    background: white;
    color: #666;
    transition: all 0.3s ease;
}

.filter-btn.active {
    background: #28a745;
    color: white;
    border-color: #28a745;
}

.filter-btn:hover {
    background: #f8f9fa;
}

/* Table */
.header th {
    background-color: #F4FFF0 !important;
}

.table td,
.table th {
    vertical-align: middle;
}

/* Task Info */
.task-info {
    padding: 0.5rem 0;
}

.task-title {
    font-weight: 600;
    color: #333;
    margin-bottom: 0.25rem;
}

.task-description {
    font-size: 0.85rem;
    color: #666;
}

/* Status / Priority Badges */
.status-badge {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
    border-radius: 12px;
    font-weight: 500;
}

.priority-badge {
    padding: 0.3rem 0.8rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
}

.priority-high {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

.priority-medium {
    background-color: #fff3cd;
    color: #856404;
    border: 1px solid #ffeaa7;
}

.priority-low {
    background-color: #d1ecf1;
    color: #0c5460;
    border: 1px solid #bee5eb;
}

/* Action Icons */
.action-icon {
    font-size: 1.3rem;
    cursor: pointer;
    transition: transform 0.2s, color 0.3s, opacity 0.3s;
}

.action-icon:hover {
    transform: scale(1.2);
    opacity: 0.8;
}

.action-icon.bi-eye {
    color: #0d6efd;
}

.action-icon.bi-pencil {
    color: #ffc107;
}

.action-icon.bi-trash {
    color: #dc3545;
}

/* Modal */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050;
}

.modal-content {
    background: white;
    border-radius: 8px;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

.modal-title {
    margin: 0;
    font-weight: 600;
    color: white;
}

.btn-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: white;
    cursor: pointer;
    padding: 0;
}

.modal-body {
    padding: 1rem;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    padding: 1rem;
    background-color: #f8f9fa;
    border-top: 1px solid #dee2e6;
}

/* Responsive */
@media (max-width: 768px) {
    .filter-buttons {
        flex-direction: column;
    }

    .action-buttons {
        flex-direction: column;
    }

    .modal-content {
        width: 95%;
        margin: 1rem;
    }
}
</style>
