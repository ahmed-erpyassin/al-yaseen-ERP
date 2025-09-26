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
            <button 
                v-for="filter in filters" 
                :key="filter.key"
                :class="['filter-btn', { 'active': activeFilter === filter.key }]"
                @click="setActiveFilter(filter.key)"
            >
                {{ filter.label }}
            </button>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons mb-4">
            <button type="button" class="btn btn-success btn-add-task" @click="openAddTaskModal">
                <i class="bi bi-plus me-2"></i>{{ $t('buttons.add_new_task') }}
            </button>
            <button type="button" class="btn btn-outline-secondary btn-filters">
                <i class="bi bi-funnel me-2"></i>{{ $t('buttons.filters') }}
            </button>
        </div>

        <!-- Tasks Table -->
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead class="table-header">
                    <tr>
                        <th class="sortable">
                            {{ $t('label.task') }}
                            <i class="bi bi-arrow-up ms-1"></i>
                        </th>
                        <th class="sortable">
                            {{ $t('label.status') }}
                            <i class="bi bi-arrow-up ms-1"></i>
                        </th>
                        <th class="sortable">
                            {{ $t('label.priority') }}
                            <i class="bi bi-arrow-up ms-1"></i>
                        </th>
                        <th class="sortable">
                            {{ $t('label.assigned_to') }}
                            <i class="bi bi-arrow-up ms-1"></i>
                        </th>
                        <th class="sortable">
                            {{ $t('label.created_by') }}
                            <i class="bi bi-arrow-up ms-1"></i>
                        </th>
                        <th class="sortable">
                            {{ $t('label.due_date') }}
                            <i class="bi bi-arrow-up ms-1"></i>
                        </th>
                        <th class="sortable">
                            {{ $t('label.actions') }}
                            <i class="bi bi-arrow-up ms-1"></i>
                        </th>
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
                        <td>
                            <div class="dropdown">
                                <button class="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                    {{ $t('buttons.mark_as_active') }}
                                    <i class="bi bi-chevron-down ms-1"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#" @click.prevent="markAsActive(task.id)">{{ $t('buttons.mark_as_active') }}</a></li>
                                    <li><a class="dropdown-item" href="#" @click.prevent="editTask(task.id)">{{ $t('buttons.edit') }}</a></li>
                                    <li><a class="dropdown-item" href="#" @click.prevent="deleteTask(task.id)">{{ $t('buttons.delete') }}</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="pagination-container">
            <nav aria-label="Page navigation">
                <ul class="pagination justify-content-end">
                    <li class="page-item">
                        <a class="page-link" href="#">{{ $t('buttons.previous') }}</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">1</a>
                    </li>
                    <li class="page-item active">
                        <a class="page-link" href="#">2</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">3</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">{{ $t('buttons.next') }}</a>
                    </li>
                </ul>
            </nav>
        </div>

        <!-- Add Task Modal -->
        <div v-if="showAddTaskModal" class="modal-overlay" @click="closeAddTaskModal">
            <div class="modal-content add-task-modal" @click.stop>
                <div class="modal-header">
                    <h4 class="modal-title">{{ $t('buttons.add_new_task') }}</h4>
                    <button type="button" class="btn-close" @click="closeAddTaskModal">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
                
                <div class="modal-body">
                    <form @submit.prevent="saveNewTask">
                        <!-- Task Name -->
                        <div class="form-group mb-3">
                            <label for="taskName" class="form-label">{{ $t('label.task_name') }}</label>
                            <input 
                                type="text" 
                                id="taskName" 
                                class="form-control" 
                                v-model="newTask.name"
                                :placeholder="$t('placeholder.task_name')"
                                required
                            />
                        </div>

                        <!-- Notes -->
                        <div class="form-group mb-3">
                            <label for="taskNotes" class="form-label">{{ $t('label.notes') }}</label>
                            <textarea 
                                id="taskNotes" 
                                class="form-control" 
                                rows="3"
                                v-model="newTask.notes"
                                :placeholder="$t('placeholder.task_notes')"
                            ></textarea>
                        </div>

                        <!-- Assign To -->
                        <div class="form-group mb-3">
                            <label for="assignTo" class="form-label">{{ $t('label.assign_to') }}</label>
                            <select id="assignTo" class="form-control" v-model="newTask.assigned_to" required>
                                <option value="">{{ $t('placeholder.select_one') }}</option>
                                <option value="ahmed">أحمد علي السيد</option>
                                <option value="mohamed">محمد أحمد</option>
                                <option value="sara">سارة محمد</option>
                            </select>
                        </div>

                        <!-- Status -->
                        <div class="form-group mb-3">
                            <label for="taskStatus" class="form-label">{{ $t('label.status') }}</label>
                            <select id="taskStatus" class="form-control" v-model="newTask.status" required>
                                <option value="open">{{ $t('status.open') }}</option>
                                <option value="in_progress">{{ $t('status.in_progress') }}</option>
                                <option value="completed">{{ $t('status.completed') }}</option>
                                <option value="pending">{{ $t('status.pending') }}</option>
                            </select>
                        </div>

                        <!-- Due Date -->
                        <div class="form-group mb-3">
                            <label for="dueDate" class="form-label">{{ $t('label.due_date') }}</label>
                            <input 
                                type="date" 
                                id="dueDate" 
                                class="form-control" 
                                v-model="newTask.due_date"
                                required
                            />
                        </div>

                        <!-- Records -->
                        <div class="form-group mb-3">
                            <label for="taskRecords" class="form-label">{{ $t('label.records') }}</label>
                            <div class="input-group">
                                <input 
                                    type="text" 
                                    id="taskRecords" 
                                    class="form-control" 
                                    v-model="newTask.records"
                                    :placeholder="$t('placeholder.related_records')"
                                />
                                <button type="button" class="btn btn-outline-secondary" @click="addRecord">
                                    <i class="bi bi-link-45deg"></i>
                                    {{ $t('buttons.add_record') }}
                                </button>
                            </div>
                        </div>

                        <!-- Documents -->
                        <div class="form-group mb-3">
                            <label for="taskDocuments" class="form-label">{{ $t('label.documents') }}</label>
                            <div class="input-group">
                                <input 
                                    type="text" 
                                    id="taskDocuments" 
                                    class="form-control" 
                                    v-model="newTask.documents"
                                    :placeholder="$t('placeholder.attached_documents')"
                                />
                                <button type="button" class="btn btn-outline-secondary" @click="addDocument">
                                    <i class="bi bi-link-45deg"></i>
                                    {{ $t('buttons.add_document') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeAddTaskModal">
                        {{ $t('buttons.cancel') }}
                    </button>
                    <button type="button" class="btn btn-success" @click="saveNewTask">
                        {{ $t('buttons.save') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TasksComponent',
    data() {
        return {
            activeFilter: 'all',
            showAddTaskModal: false,
            newTask: {
                name: '',
                notes: '',
                assigned_to: '',
                status: 'open',
                due_date: '',
                records: '',
                documents: ''
            },
            filters: [
                { key: 'all', label: this.$t('buttons.all_tasks') },
                { key: 'open', label: this.$t('buttons.open_tasks') },
                { key: 'my', label: this.$t('buttons.my_tasks') },
                { key: 'daily', label: this.$t('buttons.daily_due_date') },
                { key: 'overdue', label: this.$t('buttons.overdue') }
            ],
            tasks: [
                {
                    id: 1,
                    title: 'تقرير شهري',
                    description: 'المبيعات والمشتريات و الريح للشريكين',
                    status: 'completed',
                    status_label: 'مكتملة',
                    priority: 'medium',
                    priority_label: 'متوسط',
                    assigned_to: 'أحمد علي السيد',
                    created_by: 'أحمد علي السيد',
                    due_date: '10-01-2025'
                },
                {
                    id: 2,
                    title: 'مراجعة العقود',
                    description: 'مراجعة جميع العقود المعلقة',
                    status: 'in_progress',
                    status_label: 'قيد التنفيذ',
                    priority: 'high',
                    priority_label: 'عالي',
                    assigned_to: 'محمد أحمد',
                    created_by: 'أحمد علي السيد',
                    due_date: '15-01-2025'
                },
                {
                    id: 3,
                    title: 'تحديث قاعدة البيانات',
                    description: 'تحديث معلومات العملاء والموردين',
                    status: 'pending',
                    status_label: 'معلقة',
                    priority: 'low',
                    priority_label: 'منخفض',
                    assigned_to: 'سارة محمد',
                    created_by: 'أحمد علي السيد',
                    due_date: '20-01-2025'
                }
            ]
        }
    },
    methods: {
        setActiveFilter(filterKey) {
            this.activeFilter = filterKey;
            // Here you would filter the tasks based on the selected filter
            console.log('Filter changed to:', filterKey);
        },
        
        getStatusClass(status) {
            const statusClasses = {
                'completed': 'bg-success',
                'in_progress': 'bg-warning',
                'pending': 'bg-secondary',
                'overdue': 'bg-danger'
            };
            return statusClasses[status] || 'bg-secondary';
        },
        
        getPriorityClass(priority) {
            const priorityClasses = {
                'high': 'priority-high',
                'medium': 'priority-medium',
                'low': 'priority-low'
            };
            return priorityClasses[priority] || 'priority-medium';
        },
        
        markAsActive(taskId) {
            console.log('Marking task as active:', taskId);
            // Here you would update the task status
        },
        
        editTask(taskId) {
            console.log('Editing task:', taskId);
            // Here you would navigate to edit task page
        },
        
        deleteTask(taskId) {
            console.log('Deleting task:', taskId);
            // Here you would delete the task
        },
        
        // Modal methods
        openAddTaskModal() {
            this.showAddTaskModal = true;
        },
        
        closeAddTaskModal() {
            this.showAddTaskModal = false;
            this.resetNewTask();
        },
        
        resetNewTask() {
            this.newTask = {
                name: '',
                notes: '',
                assigned_to: '',
                status: 'open',
                due_date: '',
                records: '',
                documents: ''
            };
        },
        
        saveNewTask() {
            if (!this.newTask.name || !this.newTask.assigned_to || !this.newTask.due_date) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Create new task object
            const newTask = {
                id: this.tasks.length + 1,
                title: this.newTask.name,
                description: this.newTask.notes,
                status: this.newTask.status,
                priority: 'medium',
                assigned_to: this.getAssignedToName(this.newTask.assigned_to),
                created_by: 'أحمد علي السيد',
                due_date: this.newTask.due_date,
                records: this.newTask.records,
                documents: this.newTask.documents
            };
            
            // Add to tasks array
            this.tasks.unshift(newTask);
            
            // Close modal and reset form
            this.closeAddTaskModal();
            
            // Show success message
            alert('Task created successfully!');
        },
        
        getAssignedToName(value) {
            const names = {
                'ahmed': 'أحمد علي السيد',
                'mohamed': 'محمد أحمد',
                'sara': 'سارة محمد'
            };
            return names[value] || value;
        },
        
        addRecord() {
            // Implement add record logic
            console.log('Add record clicked');
        },
        
        addDocument() {
            // Implement add document logic
            console.log('Add document clicked');
        }
    }
}
</script>

<style scoped>
/* Filter Buttons */
.filter-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.filter-btn {
    padding: 0.5rem 1rem;
    border: 1px solid #dee2e6;
    background: white;
    color: #666;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
}

.filter-btn:hover {
    background: #f8f9fa;
    border-color: #adb5bd;
}

.filter-btn.active {
    background: #007bff;
    color: white;
    border-color: #007bff;
}

/* Action Buttons */
.action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: flex-start;
}

.btn-add-task {
    background: #2d5a27;
    border-color: #2d5a27;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-weight: 500;
}

.btn-add-task:hover {
    background: #1e3c1a;
    border-color: #1e3c1a;
    color: white;
}

.btn-filters {
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-weight: 500;
}

/* Table Styles */
.table-header {
    background-color: #f8f9fa;
}

.table-header th {
    background-color: #f8f9fa !important;
    border-bottom: 2px solid #dee2e6;
    font-weight: 600;
    color: #495057;
    padding: 1rem 0.75rem;
}

.sortable {
    cursor: pointer;
    user-select: none;
}

.sortable:hover {
    background-color: #e9ecef !important;
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
    line-height: 1.3;
}

/* Status Badges */
.status-badge {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
    border-radius: 12px;
    font-weight: 500;
}

/* Priority Badges */
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

/* Dropdown */
.dropdown-toggle {
    color: #007bff;
    text-decoration: none;
    font-size: 0.9rem;
}

.dropdown-toggle:hover {
    color: #0056b3;
    text-decoration: underline;
}

.dropdown-toggle::after {
    display: none;
}

/* Pagination */
.pagination-container {
    margin-top: 2rem;
}

.pagination .page-link {
    color: #007bff;
    border-color: #dee2e6;
    padding: 0.5rem 0.75rem;
}

.pagination .page-item.active .page-link {
    background-color: #007bff;
    border-color: #007bff;
}

.pagination .page-link:hover {
    color: #0056b3;
    background-color: #e9ecef;
    border-color: #dee2e6;
}

/* Modal Styles */
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
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
}

.add-task-modal {
    max-width: 700px;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #dee2e6;
}

.modal-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #333;
}

.btn-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #6c757d;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s ease;
}

.btn-close:hover {
    background-color: #f8f9fa;
    color: #495057;
}

.modal-body {
    padding: 1.5rem;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    padding: 1.5rem;
    border-top: 1px solid #dee2e6;
    background-color: #f8f9fa;
}

.form-label {
    font-weight: 500;
    color: #333;
    margin-bottom: 0.5rem;
}

.form-control {
    border: 1px solid #ced4da;
    border-radius: 4px;
    padding: 0.75rem;
    font-size: 0.875rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.input-group {
    display: flex;
    width: 100%;
}

.input-group .form-control {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.input-group .btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 0;
}

.btn-success {
    background-color: #28a745;
    border-color: #28a745;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: 500;
    transition: all 0.2s ease;
}

.btn-success:hover {
    background-color: #218838;
    border-color: #1e7e34;
}

.btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: 500;
    transition: all 0.2s ease;
}

.btn-secondary:hover {
    background-color: #5a6268;
    border-color: #545b62;
}

.btn-outline-secondary {
    color: #6c757d;
    border-color: #6c757d;
    background-color: transparent;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-weight: 500;
    transition: all 0.2s ease;
}

.btn-outline-secondary:hover {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
}

/* Responsive */
@media (max-width: 768px) {
    .modal-content {
        width: 95%;
        margin: 1rem;
    }
    
    .modal-header,
    .modal-body,
    .modal-footer {
        padding: 1rem;
    }
    
    .modal-footer {
        flex-direction: column;
    }
    
    .modal-footer .btn {
        width: 100%;
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .filter-buttons {
        flex-direction: column;
    }
    
    .filter-btn {
        text-align: center;
    }
    
    .action-buttons {
        flex-direction: column;
    }
    
    .table-responsive {
        font-size: 0.85rem;
    }
    
    .task-description {
        font-size: 0.8rem;
    }
}
</style>
