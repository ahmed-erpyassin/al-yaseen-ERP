<template>
    <LoadingComponent :isLoading="isLoading" />

    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-clock-history"></i> {{ $t('label.attendance') }}</h1>

        <!-- Tabs -->
        <ul class="nav nav-tabs mb-3">
            <li class="nav-item">
                <button class="nav-link" :class="{ active: activeTab === 'attendance' }"
                    @click="activeTab = 'attendance'">{{ $t('label.attendance') }}</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" :class="{ active: activeTab === 'shifts' }" @click="activeTab = 'shifts'">{{
                    $t('label.shifts') }}</button>
            </li>
        </ul>

        <!-- Tab: Attendance -->
        <div v-if="activeTab === 'attendance'">

            <!-- أدوات التحكم -->
            <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="search-bar d-flex align-items-center flex-grow-1 me-3">
                    <i class="bi bi-search me-2"></i>
                    <input type="text" class="form-control" :placeholder="$t('label.search_employee')"
                        v-model="searchQuery" />
                </div>

                <div>
                    <button class="btn btn-main me-2" @click="openAddAttendanceModal">{{ $t('buttons.add') }}</button>

                    <div class="dropdown d-inline">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                            {{ $t('buttons.import_export') }}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end p-2">
                            <li><button class="dropdown-item" @click="exportExcel">{{ $t('buttons.export_excel')
                                    }}</button></li>
                            <li><button class="dropdown-item" @click="exportPDF">{{ $t('buttons.export_pdf') }}</button>
                            </li>
                            <li><button class="dropdown-item" @click="printTable">{{ $t('buttons.print') }}</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- اختيار الشهر -->
            <div class="mb-3 d-flex align-items-center">
                <label class="me-2">Select Month:</label>
                <input type="month" v-model="selectedMonth" class="form-control w-auto" @change="filterByMonth">
            </div>

            <!-- جدول الحضور -->
            <div class="table-responsive">
                <table class="table table-bordered text-center align-middle">
                    <thead>
                        <tr class="header">
                            <th>Employee</th>
                            <th>Date</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Status</th>
                            <th>Hours</th>
                            <th>{{ $t('label.actions') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="isLoading">
                            <td colspan="7" class="text-center">
                                <div class="spinner-border"></div>
                            </td>
                        </tr>
                        <tr v-else-if="filteredAttendance.length === 0">
                            <td colspan="7" class="text-center">No records found</td>
                        </tr>
                        <tr v-else v-for="att in filteredAttendance" :key="att.id">
                            <td>{{ att.employee_name }}</td>
                            <td>{{ att.date }}</td>
                            <td>{{ att.check_in }}</td>
                            <td>{{ att.check_out }}</td>
                            <td>
                                <span
                                    :class="{ 'text-success': att.status === 'Present', 'text-danger': att.status === 'Absent', 'text-warning': att.status === 'Late' }">
                                    {{ att.status }}
                                </span>
                            </td>
                            <td>{{ att.hours }}</td>
                            <td>
                                <i class="bi bi-pencil action-icon me-2" @click="editAttendance(att)" title="Edit"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Tab: Shifts -->
        <div v-if="activeTab === 'shifts'">
            <div class="d-flex align-items-center justify-content-between mb-3">
                <h4>{{ $t('label.shifts') }}</h4>
                <button class="btn btn-main btn-sm" @click="addShift">{{ $t('buttons.create') }}</button>
            </div>

            <table class="table table-bordered text-center">
                <thead>
                    <tr class="header">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>{{ $t('label.actions') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="shift in shifts" :key="shift.id">
                        <td>{{ shift.id }}</td>
                        <td>{{ shift.name }}</td>
                        <td>{{ shift.start_time }}</td>
                        <td>{{ shift.end_time }}</td>
                        <td>
                            <i class="bi bi-pencil action-icon me-2" @click="editShift(shift)"></i>
                            <i class="bi bi-trash action-icon" @click="deleteShift(shift)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal إضافة حضور -->
        <div class="modal fade" id="addAttendanceModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-md">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">{{ $t('buttons.add') }} Attendance</h5>
                        <button type="button" class="btn-close btn-close-white" @click="closeAddModal"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label>Employee</label>
                                <input v-model="newAttendance.employee_name" type="text" class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label>Date</label>
                                <input v-model="newAttendance.date" type="date" class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label>Shift</label>
                                <select v-model="newAttendance.shift_id" class="form-control" @change="setShiftTime">
                                    <option v-for="shift in shifts" :value="shift.id" :key="shift.id">{{ shift.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label>Check In</label>
                                <input v-model="newAttendance.check_in" type="time" class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label>Check Out</label>
                                <input v-model="newAttendance.check_out" type="time" class="form-control" />
                                <button type="button" class="btn btn-sm btn-secondary mt-1"
                                    @click="setCheckOutNow">Check Out Now</button>
                            </div>
                            <div class="mb-3">
                                <label>Status</label>
                                <select v-model="newAttendance.status" class="form-control">
                                    <option>Present</option>
                                    <option>Absent</option>
                                    <option>Late</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" @click="closeAddModal">{{ $t('buttons.close') }}</button>
                        <button class="btn btn-main" @click="saveNewAttendance">{{ $t('buttons.save') }}</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal تعديل حضور -->
        <div class="modal fade" id="editAttendanceModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-md">
                <div class="modal-content">
                    <div class="modal-header bg-warning text-white">
                        <h5 class="modal-title">Edit Attendance</h5>
                        <button type="button" class="btn-close btn-close-white" @click="closeEditModal"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label>Check In</label>
                                <input v-model="editRecord.check_in" type="time" class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label>Check Out</label>
                                <input v-model="editRecord.check_out" type="time" class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label>Status</label>
                                <select v-model="editRecord.status" class="form-control">
                                    <option>Present</option>
                                    <option>Absent</option>
                                    <option>Late</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" @click="closeEditModal">{{ $t('buttons.close') }}</button>
                        <button class="btn btn-main" @click="saveAttendance">{{ $t('buttons.save') }}</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import Swal from 'sweetalert2';
import axios from 'axios';
import * as bootstrap from 'bootstrap';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default {
    name: 'AttendanceComponent',
    components: { LoadingComponent },
    data() {
        return {
            isLoading: true,
            activeTab: 'attendance',
            useApi: false,
            searchQuery: '',
            selectedMonth: '',
            attendance: [],
            filteredAttendance: [],
            shifts: [],
            newAttendance: { employee_name: '', date: '', shift_id: null, check_in: '', check_out: '', status: 'Present', hours: 0 },
            editRecord: {}
        };
    },
    methods: {
        fetchAttendance() {
            this.isLoading = true;
            if (this.useApi) {
                axios.get('{{baseUrl}}/api/v1/attendance')
                    .then(res => { this.attendance = res.data.data || res.data; this.filteredAttendance = [...this.attendance]; })
                    .catch(() => Swal.fire('Error', 'Failed to fetch attendance', 'error'))
                    .finally(() => this.isLoading = false);
            } else {
                this.attendance = [
                    { id: 1, employee_name: 'Ali', date: '2025-10-02', check_in: '08:00', check_out: '16:00', status: 'Present', hours: 8 },
                    { id: 2, employee_name: 'Sara', date: '2025-10-02', check_in: '08:15', check_out: '16:15', status: 'Late', hours: 8 }
                ];
                this.filteredAttendance = [...this.attendance];
                this.isLoading = false;
            }
        },
        fetchShifts() {
            if (this.useApi) {
                axios.get('{{baseUrl}}/api/v1/shifts').then(res => this.shifts = res.data.data || res.data).catch(err => console.error(err));
            } else {
                this.shifts = [
                    { id: 1, name: 'Morning', start_time: '08:00', end_time: '16:00' },
                    { id: 2, name: 'Evening', start_time: '16:00', end_time: '00:00' }
                ];
            }
        },
        openAddAttendanceModal() {
            this.newAttendance = { employee_name: '', date: '', shift_id: null, check_in: '', check_out: '', status: 'Present', hours: 0 };
            new bootstrap.Modal(document.getElementById('addAttendanceModal')).show();
        },
        closeAddModal() {
            const modal = bootstrap.Modal.getInstance(document.getElementById('addAttendanceModal'));
            if (modal) modal.hide();
        },
        setShiftTime() {
            const shift = this.shifts.find(s => s.id === this.newAttendance.shift_id);
            if (shift) {
                this.newAttendance.check_in = shift.start_time;
                this.newAttendance.check_out = shift.end_time;
            }
        },
        setCheckOutNow() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            this.newAttendance.check_out = `${hours}:${minutes}`;
            if (this.newAttendance.check_in) {
                const inParts = this.newAttendance.check_in.split(':');
                const outParts = this.newAttendance.check_out.split(':');
                this.newAttendance.hours = Math.max((parseInt(outParts[0]) + parseInt(outParts[1]) / 60) - (parseInt(inParts[0]) + parseInt(inParts[1]) / 60), 0);
            }
        },
        saveNewAttendance() {
            if (!this.newAttendance.hours && this.newAttendance.check_in && this.newAttendance.check_out) this.setCheckOutNow();
            if (this.useApi) {
                axios.post('{{baseUrl}}/api/v1/attendance', this.newAttendance)
                    .then(() => { Swal.fire('Success', 'Attendance added', 'success'); this.closeAddModal(); this.fetchAttendance(); })
                    .catch(() => Swal.fire('Error', 'Failed to add attendance', 'error'));
            } else {
                this.newAttendance.id = this.attendance.length + 1;
                this.attendance.push({ ...this.newAttendance });
                this.filteredAttendance = [...this.attendance];
                Swal.fire('Success', 'Attendance added locally', 'success');
                this.closeAddModal();
            }
        },
        editAttendance(record) {
            this.editRecord = { ...record };
            new bootstrap.Modal(document.getElementById('editAttendanceModal')).show();
        },
        closeEditModal() {
            const modal = bootstrap.Modal.getInstance(document.getElementById('editAttendanceModal'));
            if (modal) modal.hide();
        },
        saveAttendance() {
            const inParts = this.editRecord.check_in.split(':');
            const outParts = this.editRecord.check_out.split(':');
            this.editRecord.hours = Math.max((parseInt(outParts[0]) + parseInt(outParts[1]) / 60) - (parseInt(inParts[0]) + parseInt(inParts[1]) / 60), 0);
            if (this.useApi) {
                axios.put(`{{baseUrl}}/api/v1/attendance/${this.editRecord.id}`, this.editRecord)
                    .then(() => { Swal.fire('Success', 'Attendance updated', 'success'); this.closeEditModal(); this.fetchAttendance(); })
                    .catch(() => Swal.fire('Error', 'Failed to update', 'error'));
            } else {
                const index = this.attendance.findIndex(a => a.id === this.editRecord.id);
                if (index !== -1) this.attendance.splice(index, 1, { ...this.editRecord });
                this.filteredAttendance = [...this.attendance];
                Swal.fire('Success', 'Attendance updated locally', 'success');
                this.closeEditModal();
            }
        },
        addShift() { Swal.fire('Info', 'Open modal to add shift', 'info'); },
        editShift(shift) { Swal.fire('Info', `Editing shift ${shift.name}`, 'info'); },
        deleteShift(shift) { Swal.fire('Success', `Shift ${shift.name} deleted`, 'success'); },
        filterByMonth() {
            if (!this.selectedMonth) { this.filteredAttendance = [...this.attendance]; return; }
            const [year, month] = this.selectedMonth.split('-');
            this.filteredAttendance = this.attendance.filter(a => {
                const d = new Date(a.date);
                return d.getFullYear() == parseInt(year) && (d.getMonth() + 1) == parseInt(month);
            });
        },
        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.filteredAttendance);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
            saveAs(new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })], { type: 'application/octet-stream' }), 'Attendance.xlsx');
        },
        exportPDF() {
            const doc = new jsPDF();
            autoTable(doc, { head: [['Employee', 'Date', 'Check In', 'Check Out', 'Status', 'Hours']], body: this.filteredAttendance.map(a => [a.employee_name, a.date, a.check_in, a.check_out, a.status, a.hours]) });
            doc.save('Attendance.pdf');
        },
        printTable() {
            const printContent = document.createElement('div');
            printContent.appendChild(document.querySelector('.table-responsive table').cloneNode(true));
            const newWin = window.open('', '_blank', 'width=900,height=700');
            newWin.document.write('<html><head><title>Print</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"></head><body>');
            newWin.document.write(printContent.innerHTML);
            newWin.document.write('</body></html>');
            newWin.document.close(); newWin.focus(); newWin.print(); newWin.close();
        }
    },
    mounted() {
        this.fetchShifts();
        this.fetchAttendance();
    }
};
</script>

<style scoped>
.action-icon {
    cursor: pointer;
    font-size: 1.2rem;
}
</style>
