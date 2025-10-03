<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-exclamation-triangle"></i> إدارة المخاطر</h1>

        <!-- Action Buttons -->
        <div class="d-flex align-items-center justify-content-end mb-4">
            <button class="btn btn-success me-2" @click="openAddRiskModal">
                <i class="bi bi-plus me-2"></i>إضافة خطر
            </button>
            <input type="text" class="form-control w-25" placeholder="بحث..." v-model="searchQuery" />
        </div>

        <!-- Risks Table -->
        <div class="table-responsive mb-4">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th>#</th>
                        <th>العنوان</th>
                        <th>التأثير</th>
                        <th>الاحتمالية</th>
                        <th>الحالة</th>
                        <th>المسؤول</th>
                        <th>إجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(risk, index) in filteredRisks" :key="risk.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ risk.title }}</td>
                        <td>
                            <span :class="impactClass(risk.impact)">{{ risk.impact }}</span>
                        </td>
                        <td>
                            <span :class="impactClass(risk.probability)">{{ risk.probability }}</span>
                        </td>
                        <td>{{ risk.status }}</td>
                        <td>{{ risk.assignedTo }}</td>
                        <td>
                            <i class="bi bi-pencil action-icon text-warning me-2" @click="editRisk(risk)"
                                title="تعديل"></i>
                            <i class="bi bi-trash action-icon text-danger" @click="deleteRisk(risk)" title="حذف"></i>
                        </td>
                    </tr>
                    <tr v-if="risks.length === 0">
                        <td colspan="7" class="text-center">لا توجد مخاطر مسجلة</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Heatmap Chart -->
        <div class="mb-5">
            <h3>Heatmap توزيع المخاطر</h3>
            <canvas id="riskHeatmapChart"></canvas>
        </div>

        <!-- Add/Edit Risk Modal -->
        <div class="modal fade" id="riskModal" tabindex="-1" aria-hidden="true" ref="riskModal">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div
                        :class="['modal-header', modalType === 'add' ? 'bg-success text-white' : 'bg-warning text-dark']">
                        <h5 class="modal-title">{{ modalTitle }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="saveRisk">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label>عنوان الخطر</label>
                                    <input type="text" class="form-control" v-model="modalRisk.title" required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>الحالة</label>
                                    <div>
                                        <div class="form-check form-check-inline"
                                            v-for="s in ['Open', 'Mitigated', 'Closed']" :key="s">
                                            <input class="form-check-input" type="radio" :value="s"
                                                v-model="modalRisk.status" />
                                            <label class="form-check-label">{{ s }}</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mb-3">
                                    <label>الوصف</label>
                                    <textarea class="form-control" v-model="modalRisk.description" rows="3"></textarea>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>التأثير</label>
                                    <select class="form-control" v-model="modalRisk.impact">
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </select>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>الاحتمالية</label>
                                    <select class="form-control" v-model="modalRisk.probability">
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </select>
                                </div>
                                <div class="col-12 mb-3">
                                    <label>خطة التخفيف</label>
                                    <textarea class="form-control" v-model="modalRisk.mitigationPlan"
                                        rows="2"></textarea>
                                </div>
                                <div class="col-12 mb-3">
                                    <label>تعيين إلى</label>
                                    <input type="text" class="form-control" v-model="modalRisk.assignedTo"
                                        placeholder="اسم المسؤول..." />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                        <button type="button" :class="['btn', modalType === 'add' ? 'btn-success' : 'btn-warning']"
                            @click="saveRisk">حفظ</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Swal from "sweetalert2";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default {
    name: "RiskManagementTab",
    data() {
        return {
            risks: [],
            searchQuery: "",
            modalRisk: {},
            modalType: "",
            modalTitle: "",
            bsModal: null,
            heatmapChart: null
        };
    },
    computed: {
        filteredRisks() {
            if (!this.searchQuery) return this.risks;
            return this.risks.filter(risk =>
                risk.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                risk.assignedTo.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    mounted() {
        this.bsModal = new bootstrap.Modal(this.$refs.riskModal, {});
        this.loadSampleRisks();
    },
    methods: {
        loadSampleRisks() {
            this.risks = [
                { id: 1, title: "Supplier delay", impact: "High", probability: "Medium", status: "Open", assignedTo: "Ahmed Yassin", description: "", mitigationPlan: "" },
                { id: 2, title: "Cost overrun", impact: "Medium", probability: "High", status: "Mitigated", assignedTo: "Sarah", description: "", mitigationPlan: "" },
                { id: 3, title: "Resource shortage", impact: "Low", probability: "Medium", status: "Closed", assignedTo: "Mohammed", description: "", mitigationPlan: "" },
                { id: 4, title: "Seham", impact: "Medium", probability: "Medium", status: "Mitigated", assignedTo: "Seham", description: "", mitigationPlan: "" }
            ];
            this.$nextTick(() => this.renderHeatmap());
        },
        openAddRiskModal() {
            this.modalRisk = { title: "", description: "", impact: "Low", probability: "Low", mitigationPlan: "", status: "Open", assignedTo: "" };
            this.modalType = "add";
            this.modalTitle = "إضافة خطر جديد";
            this.bsModal.show();
        },
        editRisk(risk) {
            this.modalRisk = { ...risk };
            this.modalType = "edit";
            this.modalTitle = "تعديل الخطر";
            this.bsModal.show();
        },
        saveRisk() {
            if (this.modalType === "add") {
                this.modalRisk.id = Date.now();
                this.risks.push({ ...this.modalRisk });
            } else {
                const index = this.risks.findIndex(r => r.id === this.modalRisk.id);
                if (index !== -1) this.risks.splice(index, 1, { ...this.modalRisk });
            }
            this.bsModal.hide();
            this.$nextTick(() => this.renderHeatmap());
        },
        deleteRisk(risk) {
            Swal.fire({
                title: "هل أنت متأكد من الحذف؟",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "حذف",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                    this.risks = this.risks.filter(r => r.id !== risk.id);
                    this.$nextTick(() => this.renderHeatmap());
                    Swal.fire("تم الحذف", "تم حذف الخطر بنجاح", "success");
                }
            });
        },
        impactClass(value) {
            if (value === "High") return "badge bg-danger";
            if (value === "Medium") return "badge bg-warning text-dark";
            return "badge bg-success";
        },
        renderHeatmap() {
            const canvas = document.getElementById("riskHeatmapChart");
            if (!canvas) return;

            const labels = ["Low", "Medium", "High"];
            const data = {
                labels,
                datasets: labels.map((impact, i) => ({
                    label: impact,
                    data: labels.map(prob => {
                        const count = this.risks.filter(r => r.impact === impact && r.probability === prob).length;
                        return count;
                    }),
                    backgroundColor: ["#28a745", "#ffc107", "#dc3545"][i]
                }))
            };

            if (this.heatmapChart) this.heatmapChart.destroy();
            const ctx = canvas.getContext("2d");
            this.heatmapChart = new Chart(ctx, {
                type: "bar",
                data,
                options: {
                    responsive: true,
                    plugins: { legend: { position: "top" }, title: { display: false } },
                    scales: { x: { stacked: true }, y: { beginAtZero: true, stacked: true } }
                }
            });
        }
    }
};
</script>

<style scoped>
.header th {
    background-color: #F4FFF0 !important;
}

.action-icon {
    font-size: 1.3rem;
    cursor: pointer;
    transition: transform 0.2s;
}

.action-icon:hover {
    transform: scale(1.2);
}

.badge {
    font-size: 0.9rem;
}

.btn-success {
    background-color: #28a745;
    border-color: #28a745;
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

.table-responsive {
    max-height: 500px;
    overflow-y: auto;
}

#riskHeatmapChart {
    height: 400px;
    max-height: 500px;
}
</style>
