<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-exclamation-triangle me-2"></i> إدارة المخاطر</h1>

        <!-- أدوات التحكم -->
        <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap">
            <!-- البحث -->
            <div class="d-flex align-items-center">
                <input type="text" class="form-control search-input" placeholder="بحث عن خطر..."
                    v-model="searchQuery" />
            </div>

            <!-- زر الإضافة -->
            <div>
                <button class="btn btn-main" @click="openAddRiskModal">
                    <i class="bi bi-plus-lg me-2"></i>إضافة خطر
                </button>
            </div>
        </div>


        <!-- جدول المخاطر -->
        <div class="table-responsive mb-4">
            <table class="table table-bordered text-center align-middle shadow-sm">
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
                        <td class="text-start">{{ risk.title }}</td>
                        <td><span :class="impactClass(risk.impact)">{{ risk.impact }}</span></td>
                        <td><span :class="impactClass(risk.probability)">{{ risk.probability }}</span></td>
                        <td>{{ risk.status }}</td>
                        <td>{{ risk.assignedTo }}</td>
                        <td>
                            <i class="bi bi-pencil action-icon text-warning me-2" @click="editRisk(risk)"
                                title="تعديل"></i>
                            <i class="bi bi-trash action-icon text-danger" @click="deleteRisk(risk)" title="حذف"></i>
                        </td>
                    </tr>
                    <tr v-if="filteredRisks.length === 0">
                        <td colspan="7" class="text-center text-muted">لا توجد مخاطر مطابقة</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- مصفوفة المخاطر -->
        <div class="risk-matrix-card mb-5 p-4">
            <h4 class="mb-3 text-center text-success">مصفوفة توزيع المخاطر</h4>

            <div class="risk-matrix">
                <div class="matrix-header">
                    <div></div>
                    <div v-for="impact in levels" :key="impact" class="text-center fw-bold">{{ impact }}</div>
                </div>
                <div v-for="prob in levels" :key="prob" class="matrix-row">
                    <div class="fw-bold">{{ prob }}</div>
                    <div v-for="impact in levels" :key="impact" class="matrix-cell"
                        :style="{ backgroundColor: cellColor(prob, impact) }">
                        <span class="matrix-count">
                            {{
                                risks.filter(r =>
                                    r.probability === prob && r.impact === impact
                                ).length
                            }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="text-center mt-3 text-muted small">
                <span>المحور الأفقي: التأثير (Impact)</span> | <span>العمودي: الاحتمالية (Probability)</span>
            </div>
        </div>

        <!-- نافذة إضافة/تعديل خطر -->
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
                                    <select class="form-control" v-model="modalRisk.status">
                                        <option>Open</option>
                                        <option>Mitigated</option>
                                        <option>Closed</option>
                                    </select>
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
            levels: ["Low", "Medium", "High"]
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
                { id: 1, title: "تأخير المورد", impact: "High", probability: "Medium", status: "Open", assignedTo: "أحمد", description: "", mitigationPlan: "" },
                { id: 2, title: "زيادة التكاليف", impact: "Medium", probability: "High", status: "Mitigated", assignedTo: "سارة", description: "", mitigationPlan: "" },
                { id: 3, title: "نقص الموارد", impact: "Low", probability: "Medium", status: "Closed", assignedTo: "محمد", description: "", mitigationPlan: "" }
            ];
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
                    Swal.fire("تم الحذف", "تم حذف الخطر بنجاح", "success");
                }
            });
        },
        impactClass(value) {
            if (value === "High") return "badge bg-danger";
            if (value === "Medium") return "badge bg-warning text-dark";
            return "badge bg-success";
        },
        cellColor(prob, impact) {
            const map = {
                Low: { Low: "#d4edda", Medium: "#ffeeba", High: "#f8d7da" },
                Medium: { Low: "#c3e6cb", Medium: "#fff3cd", High: "#f5c6cb" },
                High: { Low: "#b1dfbb", Medium: "#ffe8a1", High: "#f1b0b7" }
            };
            return map[prob][impact];
        }
    }
};
</script>

<style scoped>
.header th {
    background-color: #F4FFF0 !important;
}

.btn-main {
    background-color: #28a745;
    border-color: #28a745;
    border-radius: 4px;
    font-weight: 500;
    transition: all 0.2s ease;
}

.btn-main:hover {
    background-color: #218838;
    border-color: #1e7e34;
    transform: translateY(-1px);
}

.action-icon {
    font-size: 1.3rem;
    cursor: pointer;
    transition: transform 0.2s;
}

.action-icon:hover {
    transform: scale(1.2);
}

.search-input {
    max-width: 250px;
    border-radius: 6px;
}

.risk-matrix-card {
    background: linear-gradient(180deg, #ffffff 0%, #f9fff8 100%);
    border-radius: 10px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
}

.risk-matrix {
    display: grid;
    grid-template-columns: auto repeat(3, 1fr);
    gap: 5px;
    text-align: center;
}

.matrix-header {
    display: contents;
}

.matrix-row {
    display: contents;
}

.matrix-cell {
    border-radius: 6px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: #333;
}

.matrix-count {
    font-size: 1.2rem;
}

@media (max-width: 768px) {
    .search-input {
        width: 100%;
        margin-bottom: 10px;
    }

    .d-flex.flex-wrap>div {
        width: 100%;
        text-align: center;
    }

    .btn-main {
        width: 100%;
    }
}
</style>
