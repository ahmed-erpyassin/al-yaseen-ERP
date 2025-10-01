<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-currency-dollar"></i> المالية</h1>

        <!-- Action Buttons -->
        <div class="d-flex align-items-center justify-content-end mb-4">
            <button class="btn btn-success me-2" @click="openAddTransactionModal">
                <i class="bi bi-plus me-2"></i>إضافة عملية
            </button>
            <!-- زر التصدير -->
            <button class="btn btn-primary" @click="exportOptions">
                <i class="bi bi-file-earmark-arrow-down me-2"></i>تصدير
            </button>

        </div>

        <!-- Financials Table -->
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
                            <span :class="item.type === 'إيراد' ? 'badge bg-success' : 'badge bg-danger'">{{ item.type
                            }}</span>
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

        <!-- Budget vs Actual Chart -->
        <div class="mb-5">
            <h3>Budget vs Actual Cost</h3>
            <canvas id="budgetChart"></canvas>
        </div>

        <!-- Add/Edit Transaction Modal -->
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
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// تسجيل عناصر Chart.js اللازمة للـ bar chart
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default {
    name: "FinancialsTab",
    data() {
        return {
            useApi: false, // true = استخدام API, false = بيانات وهمية
            transactions: [],
            modalTransaction: {},
            modalType: "",
            modalTitle: "",
            bsModal: null,
            budgetChart: null
        };
    },
    mounted() {
        // تهيئة Bootstrap modal reference
        this.bsModal = new bootstrap.Modal(this.$refs.transactionModal, {});
        this.fetchTransactions();
    },
    methods: {
        // جلب البيانات (من API أو بيانات وهمية حسب useApi)
        async fetchTransactions() {
            if (this.useApi) {
                try {
                    const response = await axios.get("/api/financials"); // ضع رابط API الصحيح هنا
                    this.transactions = response.data;
                } catch (error) {
                    console.error(error);
                    Swal.fire({ icon: "error", title: "خطأ", text: "فشل في جلب البيانات من السيرفر" });
                }
            } else {
                // بيانات وهمية افتراضية
                this.transactions = [
                    { id: 1, date: "2025-09-01", type: "إيراد", amount: 5000, currency: "USD", description: "دفعة أولى", budget: 6000 },
                    { id: 2, date: "2025-09-03", type: "مصروف", amount: 1200, currency: "USD", description: "شراء أدوات", budget: 1500 },
                    { id: 3, date: "2025-09-05", type: "إيراد", amount: 3000, currency: "USD", description: "دفعة ثانية", budget: 3000 },
                    { id: 4, date: "2025-09-07", type: "مصروف", amount: 800, currency: "USD", description: "مصاريف نقل", budget: 1000 }
                ];
            }
            // بعد تحميل البيانات، رسم الرسم البياني
            this.$nextTick(() => this.renderChart());
        },

        // فتح مودال إضافة عملية
        openAddTransactionModal() {
            this.modalTransaction = { date: "", type: "إيراد", amount: 0, currency: "USD", description: "" };
            this.modalType = "add";
            this.modalTitle = "إضافة عملية مالية";
            this.bsModal.show();
        },

        // فتح مودال تعديل
        editTransaction(transaction) {
            this.modalTransaction = { ...transaction };
            this.modalType = "edit";
            this.modalTitle = "تعديل العملية المالية";
            this.bsModal.show();
        },

        // حفظ (إضافة/تعديل)
        async saveTransaction() {
            if (this.useApi) {
                try {
                    if (this.modalType === "add") {
                        const response = await axios.post("/api/financials", this.modalTransaction);
                        this.transactions.push(response.data);
                    } else {
                        const response = await axios.put(`/api/financials/${this.modalTransaction.id}`, this.modalTransaction);
                        const index = this.transactions.findIndex(t => t.id === this.modalTransaction.id);
                        if (index !== -1) this.transactions.splice(index, 1, response.data);
                    }
                    Swal.fire("نجاح", "تم حفظ العملية بنجاح", "success");
                } catch (error) {
                    console.error(error);
                    Swal.fire("خطأ", "فشل في حفظ البيانات على السيرفر", "error");
                }
            } else {
                if (this.modalType === "add") {
                    this.modalTransaction.id = Date.now();
                    this.transactions.push({ ...this.modalTransaction });
                } else {
                    const index = this.transactions.findIndex(t => t.id === this.modalTransaction.id);
                    if (index !== -1) this.transactions.splice(index, 1, { ...this.modalTransaction });
                }
            }

            this.bsModal.hide();
            this.$nextTick(() => this.renderChart());
        },

        // حذف عملية
        async deleteTransaction(transaction) {
            const result = await Swal.fire({
                title: "هل أنت متأكد من الحذف؟",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "حذف",
                cancelButtonText: "إلغاء"
            });

            if (!result.isConfirmed) return;

            if (this.useApi) {
                try {
                    await axios.delete(`/api/financials/${transaction.id}`);
                } catch (error) {
                    console.error(error);
                    Swal.fire("خطأ", "فشل في حذف البيانات من السيرفر", "error");
                    return;
                }
            }

            this.transactions = this.transactions.filter(t => t.id !== transaction.id);
            Swal.fire("تم الحذف", "تم حذف العملية المالية بنجاح", "success");
            this.$nextTick(() => this.renderChart());
        },

        // رسم الرسم البياني (Budget vs Actual)
        renderChart() {
            // تأكد أن هناك عنصر كانفاس في الصفحة
            const canvas = document.getElementById("budgetChart");
            if (!canvas) return;

            const labels = this.transactions.map(t => t.date);
            const budgetData = this.transactions.map(t => t.budget || 0);
            const actualData = this.transactions.map(t => t.amount || 0);

            if (this.budgetChart) {
                try { this.budgetChart.destroy(); } catch (e) { /* ignore */ }
            }

            const ctx = canvas.getContext("2d");
            this.budgetChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels,
                    datasets: [
                        { label: "Budget", data: budgetData, backgroundColor: "#28a745" },
                        { label: "Actual Cost", data: actualData, backgroundColor: "#ffc107" }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: "top" },
                        title: { display: false }
                    },
                    scales: {
                        x: { title: { display: false } },
                        y: { beginAtZero: true }
                    }
                }
            });
        },

        // زر التصدير - يعرض خيار بين Excel أو PDF
        exportOptions() {
            Swal.fire({
                title: 'اختر نوع التصدير',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Excel`,
                denyButtonText: `PDF`,
            }).then((result) => {
                if (result.isConfirmed) {
                    // عند اختيار Excel: نصدر ملف Excel (الجدول) **ومرفق معه PDF يحتوي الرسم والجدول**
                    this.exportExcelWithChart();
                } else if (result.isDenied) {
                    // عند اختيار PDF فقط
                    this.exportPDFWithChart();
                }
            });
        },

        // تصدير Excel مع إنشاء أيضاً PDF مرفق يحتوي الرسم والجدول (لأن تضمين صورة مباشرة داخل Excel من المتصفح محدود)
        exportExcelWithChart() {
            try {
                // 1) Excel: ورقة بالبيانات
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

                // كتابة وحفظ ملف Excel
                const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
                saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Financials.xlsx");

                // 2) أيضاً نولد PDF يحتوي الرسم البياني + نفس الجدول كملف مساعد — لأن تضمين الرسم في Excel من المتصفح ليس مدعوماً بسهولة.
                // إنشاء ملف PDF وحفظه تلقائياً
                // نستخدم timeout بسيط للتأكد من أن الرسم مُحدّث في الـ canvas
                setTimeout(() => {
                    this.exportPDFWithChart({ autoSave: true, filename: "Financials_with_Chart.pdf" });
                }, 300);
            } catch (e) {
                console.error(e);
                Swal.fire("خطأ", "فشل أثناء تصدير Excel", "error");
            }
        },

        // تصدير PDF يحتوي الرسم البياني + الجدول (يمكن استدعائه مع خيار الحفظ التلقائي)
        exportPDFWithChart(options = { autoSave: false, filename: "Financials_with_Chart.pdf" }) {
            try {
                const canvas = document.getElementById("budgetChart");
                const pdf = new jsPDF({ unit: "pt", format: "a4" });
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const margin = 20;

                let y = margin;

                // إضافة عنوان
                pdf.setFontSize(14);
                pdf.text("Financials - Budget vs Actual", pageWidth / 2, y, { align: "center" });
                y += 20;

                if (canvas) {
                    // تضمين الرسم البياني كصورة
                    const imgData = canvas.toDataURL("image/png");
                    const imgProps = pdf.getImageProperties(imgData);
                    const imgWidth = pageWidth - margin * 2;

                    // اجعل ارتفاع الرسم لا يتجاوز نصف الصفحة تقريبًا
                    const maxHeight = pageHeight / 2;
                    let imgHeight = imgWidth * (imgProps.height / imgProps.width);
                    if (imgHeight > maxHeight) {
                        imgHeight = maxHeight;
                    }

                    pdf.addImage(imgData, "PNG", margin, y, imgWidth, imgHeight);
                    y += imgHeight + 10;
                }

                // تحضير صفوف الجدول
                const columns = ["التاريخ", "نوع العملية", "المبلغ", "العملة", "الوصف"];
                const rows = this.transactions.map(t => [t.date, t.type, t.amount, t.currency, t.description]);

                // إضافة الجدول تحت الرسم البياني
                autoTable(pdf, {
                    startY: y,
                    head: [columns],
                    body: rows,
                    styles: { fontSize: 10 },
                    headStyles: { fillColor: [40, 167, 69] },
                    margin: { left: margin, right: margin }
                });

                const filename = options.filename || "Financials_with_Chart.pdf";
                pdf.save(filename);

            } catch (e) {
                console.error(e);
                Swal.fire("خطأ", "فشل أثناء تصدير PDF", "error");
            }
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

#budgetChart {
    height: 400px;
    /* أو أي ارتفاع مناسب */
    max-height: 500px;
}

.btn-warning:hover {
    background-color: #e0a800;
    border-color: #d39e00;
}

.table-responsive {
    max-height: 500px;
    overflow-y: auto;
}
</style>
