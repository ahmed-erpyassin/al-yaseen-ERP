<template>
    <div class="container pe-5 ps-5">
        <!-- العنوان -->
        <h1><i class="bi bi-currency-dollar me-2"></i> المالية</h1>

        <!-- أزرار التحكم -->
        <div class="d-flex align-items-center justify-content-end mb-4">
            <button class="btn btn-lg btn-main me-3" @click="openAddTransactionModal">
                <i class="bi bi-plus-lg me-2"></i>إضافة عملية
            </button>

            <div class="dropdown">
                <button class="btn btn-lg btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    تصدير
                </button>
                <ul class="dropdown-menu dropdown-menu-end p-2">
                    <li><button class="dropdown-item" @click="exportExcelWithChart">تصدير Excel + PDF</button></li>
                    <li><button class="dropdown-item" @click="exportPDFWithChart()">تصدير PDF فقط</button></li>
                </ul>
            </div>
        </div>

        <!-- جدول العمليات -->
        <div class="table-responsive mb-4">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th>#</th>
                        <th>التاريخ</th>
                        <th>نوع العملية</th>
                        <th>المبلغ</th>
                        <th>العملة</th>
                        <th>الوصف</th>
                        <th>إجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in transactions" :key="item.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.date }}</td>
                        <td>
                            <span :class="item.type === 'إيراد' ? 'badge bg-success' : 'badge bg-danger'">
                                {{ item.type }}
                            </span>
                        </td>
                        <td>{{ item.amount }}</td>
                        <td>{{ item.currency }}</td>
                        <td>{{ item.description }}</td>
                        <td>
                            <i class="bi bi-pencil action-icon text-warning me-2" @click="editTransaction(item)"
                                title="تعديل"></i>
                            <i class="bi bi-trash action-icon text-danger" @click="deleteTransaction(item)"
                                title="حذف"></i>
                        </td>
                    </tr>
                    <tr v-if="transactions.length === 0">
                        <td colspan="7" class="text-center">لا توجد عمليات مالية</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- المخطط البياني -->
        <div class="chart-card mb-5 p-3">
            <h4 class="mb-3 text-success text-center">الموازنة مقابل التكلفة الفعلية</h4>
            <canvas id="budgetChart"></canvas>
        </div>

        <!-- نافذة إضافة / تعديل عملية -->
        <div class="modal fade" id="transactionModal" tabindex="-1" aria-hidden="true" ref="transactionModal">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div
                        :class="['modal-header', modalType === 'add' ? 'bg-success text-white' : 'bg-warning text-dark']">
                        <h5 class="modal-title">{{ modalTitle }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="saveTransaction">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label>التاريخ</label>
                                    <input type="date" class="form-control" v-model="modalTransaction.date" required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>نوع العملية</label>
                                    <select class="form-control" v-model="modalTransaction.type" required>
                                        <option>إيراد</option>
                                        <option>مصروف</option>
                                    </select>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>المبلغ</label>
                                    <input type="number" class="form-control" v-model="modalTransaction.amount"
                                        required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>العملة</label>
                                    <input type="text" class="form-control" v-model="modalTransaction.currency"
                                        required />
                                </div>
                                <div class="col-12 mb-3">
                                    <label>الوصف</label>
                                    <textarea class="form-control" v-model="modalTransaction.description"
                                        rows="3"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                        <button type="button" :class="['btn', modalType === 'add' ? 'btn-success' : 'btn-warning']"
                            @click="saveTransaction">حفظ</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler } from 'chart.js';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler);

export default {
    name: "FinancialsTab",
    data() {
        return {
            useApi: false,
            transactions: [],
            modalTransaction: {},
            modalType: "",
            modalTitle: "",
            bsModal: null,
            budgetChart: null
        };
    },
    mounted() {
        this.bsModal = new bootstrap.Modal(this.$refs.transactionModal, {});
        this.fetchTransactions();
    },
    methods: {
        async fetchTransactions() {
            if (this.useApi) {
                try {
                    const response = await axios.get("/api/financials");
                    this.transactions = response.data;
                } catch (error) {
                    console.error(error);
                    Swal.fire({ icon: "error", title: "خطأ", text: "فشل في جلب البيانات من السيرفر" });
                }
            } else {
                this.transactions = [
                    { id: 1, date: "2025-09-01", type: "إيراد", amount: 5000, currency: "USD", description: "دفعة أولى", budget: 6000 },
                    { id: 2, date: "2025-09-03", type: "مصروف", amount: 1200, currency: "USD", description: "شراء أدوات", budget: 1500 },
                    { id: 3, date: "2025-09-05", type: "إيراد", amount: 3000, currency: "USD", description: "دفعة ثانية", budget: 3000 },
                    { id: 4, date: "2025-09-07", type: "مصروف", amount: 800, currency: "USD", description: "مصاريف نقل", budget: 1000 }
                ];
            }
            this.$nextTick(() => this.renderChart());
        },

        openAddTransactionModal() {
            this.modalTransaction = { date: "", type: "إيراد", amount: 0, currency: "USD", description: "" };
            this.modalType = "add";
            this.modalTitle = "إضافة عملية مالية";
            this.bsModal.show();
        },

        editTransaction(transaction) {
            this.modalTransaction = { ...transaction };
            this.modalType = "edit";
            this.modalTitle = "تعديل العملية المالية";
            this.bsModal.show();
        },

        saveTransaction() {
            if (this.modalType === "add") {
                this.modalTransaction.id = Date.now();
                this.transactions.push({ ...this.modalTransaction });
            } else {
                const index = this.transactions.findIndex(t => t.id === this.modalTransaction.id);
                if (index !== -1) this.transactions.splice(index, 1, { ...this.modalTransaction });
            }
            Swal.fire("تم الحفظ", "تم حفظ العملية بنجاح", "success");
            this.bsModal.hide();
            this.$nextTick(() => this.renderChart());
        },

        async deleteTransaction(transaction) {
            const result = await Swal.fire({
                title: "هل أنت متأكد من الحذف؟",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "حذف",
                cancelButtonText: "إلغاء"
            });
            if (!result.isConfirmed) return;
            this.transactions = this.transactions.filter(t => t.id !== transaction.id);
            Swal.fire("تم الحذف", "تم حذف العملية المالية بنجاح", "success");
            this.$nextTick(() => this.renderChart());
        },

        renderChart() {
            const canvas = document.getElementById("budgetChart");
            if (!canvas) return;

            const labels = this.transactions.map(t => t.date);
            const budgetData = this.transactions.map(t => t.budget || 0);
            const actualData = this.transactions.map(t => t.amount || 0);

            if (this.budgetChart) this.budgetChart.destroy();

            const ctx = canvas.getContext("2d");
            this.budgetChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels,
                    datasets: [
                        {
                            label: "Budget",
                            data: budgetData,
                            borderColor: "#28a745",
                            backgroundColor: "rgba(40,167,69,0.15)",
                            fill: true,
                            tension: 0.4,
                            borderWidth: 3,
                            pointBackgroundColor: "#28a745",
                            pointRadius: 5
                        },
                        {
                            label: "Actual Cost",
                            data: actualData,
                            borderColor: "#ffc107",
                            backgroundColor: "rgba(255,193,7,0.1)",
                            fill: true,
                            tension: 0.4,
                            borderWidth: 3,
                            pointBackgroundColor: "#ffc107",
                            pointRadius: 5
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: "top",
                            labels: { color: "#333", font: { size: 14 } }
                        },
                        title: {
                            display: true,
                            text: "الموازنة مقابل التكلفة الفعلية",
                            color: "#198754",
                            font: { size: 16, weight: "bold" },
                            padding: { bottom: 20 }
                        }
                    },
                    scales: {
                        x: {
                            ticks: { color: "#555" },
                            grid: { color: "rgba(0,0,0,0.05)" }
                        },
                        y: {
                            beginAtZero: true,
                            ticks: { color: "#555" },
                            grid: { color: "rgba(0,0,0,0.05)" },
                            title: { display: true, text: "القيمة (USD)", color: "#198754" }
                        }
                    }
                }
            });
        },

        exportExcelWithChart() {
            const dataForExcel = this.transactions.map(t => ({
                التاريخ: t.date,
                "نوع العملية": t.type,
                المبلغ: t.amount,
                العملة: t.currency,
                الوصف: t.description,
                Budget: t.budget || ""
            }));
            const ws = XLSX.utils.json_to_sheet(dataForExcel);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Financials");
            const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Financials.xlsx");
            setTimeout(() => {
                this.exportPDFWithChart({ filename: "Financials_with_Chart.pdf" });
            }, 300);
        },

        exportPDFWithChart(options = { filename: "Financials_with_Chart.pdf" }) {
            const canvas = document.getElementById("budgetChart");
            const pdf = new jsPDF({ unit: "pt", format: "a4" });
            const pageWidth = pdf.internal.pageSize.getWidth();
            const margin = 20;
            let y = margin;

            pdf.setFontSize(14);
            pdf.text("Financials - Budget vs Actual", pageWidth / 2, y, { align: "center" });
            y += 20;

            if (canvas) {
                const imgData = canvas.toDataURL("image/png");
                const imgWidth = pageWidth - margin * 2;
                const imgHeight = 250;
                pdf.addImage(imgData, "PNG", margin, y, imgWidth, imgHeight);
                y += imgHeight + 10;
            }

            const columns = ["التاريخ", "نوع العملية", "المبلغ", "العملة", "الوصف"];
            const rows = this.transactions.map(t => [t.date, t.type, t.amount, t.currency, t.description]);
            autoTable(pdf, {
                startY: y,
                head: [columns],
                body: rows,
                styles: { fontSize: 10 },
                headStyles: { fillColor: [40, 167, 69] },
                margin: { left: margin, right: margin }
            });
            pdf.save(options.filename);
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
    transition: transform 0.2s, opacity 0.2s;
}

.action-icon:hover {
    transform: scale(1.2);
    opacity: 0.8;
}

.chart-card {
    background: linear-gradient(180deg, #ffffff 0%, #f9fff8 100%);
    border-radius: 10px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
    padding: 1rem;
}

#budgetChart {
    height: 400px;
    max-height: 450px;
}
</style>
