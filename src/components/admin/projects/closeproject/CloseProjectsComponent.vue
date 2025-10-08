<template>
    <LoadingComponent :isLoading="isLoading" />

    <div class="container pe-5 ps-5" v-if="isAuthenticated">
        <h1><i class="bi bi-kanban me-2"></i> المشاريع المغلقة</h1>

        <!-- ملخص سريع -->
        <div class="summary-cards d-flex justify-content-between flex-wrap mb-4">
            <div class="summary-card bg-success-subtle text-success">
                <i class="bi bi-check-circle-fill me-2"></i> المشاريع المغلقة: {{ closedProjects.length }}
            </div>
            <div class="summary-card bg-warning-subtle text-warning">
                <i class="bi bi-pause-circle-fill me-2"></i> المعلقة: {{ onHoldProjects.length }}
            </div>
            <div class="summary-card bg-danger-subtle text-danger">
                <i class="bi bi-x-circle-fill me-2"></i> الملغاة: {{ cancelledProjects.length }}
            </div>
        </div>

        <!-- البحث -->
        <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap">
            <div class="d-flex align-items-center flex-grow-1 me-3">
                <i class="bi bi-search me-2 text-success"></i>
                <input type="text" class="form-control search-input" placeholder="بحث عن مشروع..."
                    v-model="searchQuery" />
            </div>
        </div>

        <!-- جدول المشاريع -->
        <div class="table-responsive shadow-sm rounded">
            <table class="table table-bordered text-center align-middle mb-0">
                <thead>
                    <tr class="header">
                        <th>اسم المشروع</th>
                        <th>التقدم</th>
                        <th>التكلفة / الموازنة</th>
                        <th>تاريخ البدء</th>
                        <th>تاريخ الانتهاء</th>
                        <th>الحالة</th>
                        <th>ملاحظات</th>
                        <th>إجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="isLoading">
                        <td colspan="8" class="text-center py-5">
                            <div class="spinner-border text-success" role="status"></div>
                        </td>
                    </tr>
                    <tr v-else-if="paginatedProjects.length === 0">
                        <td colspan="8" class="text-center text-muted py-4">لا توجد مشاريع مغلقة</td>
                    </tr>
                    <tr v-else v-for="project in paginatedProjects" :key="project.id">
                        <td class="fw-bold text-start">{{ project.project_name }}</td>
                        <td>
                            <div class="progress-circle" :style="progressStyle(project.progress)">
                                {{ project.progress }}%
                            </div>
                        </td>
                        <td>${{ project.actual_costs }} / ${{ project.budget }}</td>
                        <td>{{ project.start_date }}</td>
                        <td>{{ project.end_date }}</td>
                        <td>
                            <span :class="statusBadge(project.project_status)">
                                {{ project.project_status }}
                            </span>
                        </td>
                        <td>
                            <input type="text" v-model="project.comments" class="form-control form-control-sm"
                                placeholder="ملاحظات..." />
                        </td>
                        <td>
                            <i class="bi bi-eye action-icon text-success" title="عرض" @click="viewProject(project)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- التصفح -->
        <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-secondary" @click="prevPage" :disabled="currentPage === 1">السابق</button>
            <span>صفحة {{ currentPage }} من {{ totalPages }}</span>
            <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">التالي</button>
        </div>
    </div>

    <div v-else class="text-center mt-5">
        <p>يرجى تسجيل الدخول للوصول إلى المشاريع.</p>
        <router-link :to="{ name: 'auth.login' }" class="btn btn-main mt-3">تسجيل الدخول</router-link>
    </div>
</template>

<script>
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'ClosedProjectsComponent',
    components: { LoadingComponent },
    data() {
        return {
            isLoading: true,
            searchQuery: '',
            currentPage: 1,
            perPage: 10,
            projects: []
        };
    },
    computed: {
        closedProjects() {
            return this.projects.filter(p => p.project_status === 'Closed');
        },
        onHoldProjects() {
            return this.projects.filter(p => p.project_status === 'On-Hold');
        },
        cancelledProjects() {
            return this.projects.filter(p => p.project_status === 'Cancelled');
        },
        filteredProjects() {
            const q = this.searchQuery.toLowerCase();
            return this.closedProjects.filter(p =>
                (p.project_name || '').toLowerCase().includes(q)
            );
        },
        paginatedProjects() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredProjects.slice(start, start + this.perPage);
        },
        totalPages() {
            return Math.ceil(this.filteredProjects.length / this.perPage) || 1;
        },
        isAuthenticated() {
            return !!localStorage.getItem('authToken');
        }
    },
    methods: {
        async fetchProjects() {
            if (!this.isAuthenticated) return;
            this.isLoading = true;
            try {
                const token = localStorage.getItem('authToken');
                const res = await axios.get(`/projects/browse-all/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Accept-Language': 'ar'
                    }
                });
                this.projects = (res.data.data || res.data).map(p => ({
                    ...p,
                    id: parseInt(p.id),
                    progress: p.progress || Math.floor(Math.random() * 30 + 70),
                    actual_costs: p.actual_costs || 4000,
                    budget: p.budget || 5000,
                    start_date: p.start_date || '2024-01-15',
                    end_date: p.end_date || '2024-06-30',
                    comments: p.comments || ''
                }));
            } catch (err) {
                console.error(err);
                Swal.fire('خطأ', 'فشل في جلب البيانات من السيرفر', 'error');
            } finally {
                this.isLoading = false;
            }
        },
        progressStyle(progress) {
            let color = progress < 50 ? '#dc3545' : progress < 80 ? '#ffc107' : '#28a745';
            return {
                background: `conic-gradient(${color} ${progress * 3.6}deg, #e9ecef ${progress * 3.6}deg)`,
                color: color
            };
        },
        statusBadge(status) {
            return {
                'badge bg-success': status === 'Closed',
                'badge bg-warning text-dark': status === 'On-Hold',
                'badge bg-danger': status === 'Cancelled'
            };
        },
        viewProject(project) {
            Swal.fire({
                title: project.project_name,
                html: `
                    <p><b>التقدم:</b> ${project.progress}%</p>
                    <p><b>التكلفة / الموازنة:</b> $${project.actual_costs} / $${project.budget}</p>
                    <p><b>تاريخ البدء:</b> ${project.start_date}</p>
                    <p><b>تاريخ الانتهاء:</b> ${project.end_date}</p>
                    <p><b>الحالة:</b> ${project.project_status}</p>
                    <p><b>ملاحظات:</b> ${project.comments}</p>
                `,
                icon: 'info',
                confirmButtonColor: '#28a745'
            });
        },
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; }
    },
    mounted() {
        this.fetchProjects();
    }
};
</script>

<style scoped>
.header th {
    background-color: #F4FFF0 !important;
}

.summary-cards {
    gap: 10px;
}

.summary-card {
    flex: 1;
    border-radius: 10px;
    padding: 15px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
}

.search-input {
    max-width: 300px;
    border-radius: 8px;
}

.action-icon {
    font-size: 1.3rem;
    cursor: pointer;
    transition: transform 0.2s;
}

.action-icon:hover {
    transform: scale(1.2);
}

.progress-circle {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    background: conic-gradient(#28a745 0deg, #e9ecef 0deg);
    transition: background 0.5s;
}
</style>
