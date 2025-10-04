<template>
    <LoadingComponent :isLoading="isLoading" />

    <div class="container pe-5 ps-5" v-if="isAuthenticated">
        <h1><i class="bi bi-kanban"></i> {{ $t('label.closed_projects') }}</h1>

        <!-- البحث -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="search-bar d-flex align-items-center flex-grow-1 me-3">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" :placeholder="$t('label.search_project')"
                    v-model="searchQuery" />
            </div>
        </div>

        <!-- جدول المشاريع المغلقة -->
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th>{{ $t('label.project_name') }}</th>
                        <th>{{ $t('label.progress') }}</th>
                        <th>{{ $t('label.costs_vs_budget') }}</th>
                        <th>{{ $t('label.start_date') }}</th>
                        <th>{{ $t('label.end_date') }}</th>
                        <th>{{ $t('label.confirm_close') }}</th>
                        <th>{{ $t('label.comments') }}</th>
                        <th>{{ $t('label.actions') }}</th>
                    </tr>
                </thead>
                <tbody class="table-body form">
                    <tr v-if="isLoading">
                        <td :colspan="8" class="text-center">
                            <div class="spinner-border" role="status"></div>
                        </td>
                    </tr>
                    <tr v-else-if="paginatedProjects.length === 0">
                        <td :colspan="8" class="text-center">
                            لا توجد مشاريع مغلقة
                        </td>
                    </tr>
                    <tr v-else v-for="project in paginatedProjects" :key="project.id">
                        <td>{{ project.project_name }}</td>
                        <td>
                            <div class="progress-circle" :data-progress="project.progress">
                                {{ project.progress }}%
                            </div>
                        </td>
                        <td>${{ project.actual_costs }} / ${{ project.budget }}</td>
                        <td>{{ project.start_date }}</td>
                        <td>{{ project.end_date }}</td>
                        <td>
                            <select v-model="project.project_status" class="form-select">
                                <option value="Closed">Closed</option>
                                <option value="On-Hold">On-Hold</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </td>
                        <td>
                            <input type="text" v-model="project.comments" class="form-control" placeholder="Notes">
                        </td>
                        <td>
                            <i class="bi bi-eye action-icon me-2" title="View" @click="viewProject(project)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- أزرار الصفحات -->
        <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-secondary" @click="prevPage" :disabled="currentPage === 1">{{ $t('buttons.previous')
                }}</button>
            <span>{{ $t('label.page') }} {{ currentPage }} {{ $t('label.of') }} {{ totalPages }}</span>
            <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">{{
                $t('buttons.next') }}</button>
        </div>
    </div>

    <div v-else class="text-center mt-5">
        <p>يرجى تسجيل الدخول للوصول إلى المشاريع.</p>
        <router-link :to="{ name: 'auth.login' }" class="btn btn-primary mt-3">تسجيل الدخول</router-link>
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
            return localStorage.getItem('authToken') ? true : false;
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
                    progress: 75, // مثال، يمكن تغييره حسب المشروع
                    actual_costs: p.actual_costs || 4000,
                    budget: p.budget || 5000,
                    start_date: p.start_date || 'Jan 15, 2024',
                    end_date: p.end_date || 'Jun 30, 2024',
                    comments: ''
                }));
            } catch (err) {
                console.error(err);
                Swal.fire('Error', 'فشل في جلب البيانات من السيرفر', 'error');
            } finally {
                this.isLoading = false;
            }
        },
        viewProject(project) {
            Swal.fire({
                title: project.project_name,
                html: `
                    <p><b>Progress:</b> ${project.progress}%</p>
                    <p><b>Costs vs Budget:</b> $${project.actual_costs} / $${project.budget}</p>
                    <p><b>Start Date:</b> ${project.start_date}</p>
                    <p><b>End Date:</b> ${project.end_date}</p>
                    <p><b>Status:</b> ${project.project_status}</p>
                    <p><b>Comments:</b> ${project.comments}</p>
                `
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
.action-icon {
    cursor: pointer;
    font-size: 1.2rem;
}

.progress-circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 4px solid #007bff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin: auto;
}
</style>
