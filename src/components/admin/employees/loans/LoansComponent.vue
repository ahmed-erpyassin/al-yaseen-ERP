<template>
    <LoadingComponent :isLoading="isLoading" />

    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-cash-stack"></i> {{ $t('label.loans') }}</h1>

        <button class="btn btn-main mb-3" @click="openAddLoanModal">Add Loan</button>

        <table class="table table-bordered text-center">
            <thead>
                <tr>
                    <th>Employee</th>
                    <th>Amount</th>
                    <th>Installments</th>
                    <th>Remaining</th>
                    <th>Start Date</th>
                    <th>{{ $t('label.actions') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="loan in loans" :key="loan.id">
                    <td>{{ loan.employee_name }}</td>
                    <td>{{ loan.amount }}</td>
                    <td>{{ loan.installments }}</td>
                    <td>{{ loan.remaining }}</td>
                    <td>{{ loan.start_date }}</td>
                    <td>
                        <i class="bi bi-pencil action-icon me-2" @click="editLoan(loan)"></i>
                        <i class="bi bi-trash action-icon" @click="deleteLoan(loan)"></i>
                        <button class="btn btn-sm btn-success ms-1" @click="payInstallment(loan)">
                            Pay Installment
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modal: Add/Edit Loan -->
        <div class="modal fade" id="loanModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-md">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">{{ loanModalTitle }}</h5>
                        <button type="button" class="btn-close btn-close-white" @click="closeLoanModal"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label>Employee</label>
                                <input v-model="editLoanData.employee_name" type="text" class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label>Amount</label>
                                <input v-model="editLoanData.amount" type="number" class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label>Installments</label>
                                <input v-model="editLoanData.installments" type="number" class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label>Start Date</label>
                                <input v-model="editLoanData.start_date" type="date" class="form-control" />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" @click="closeLoanModal">{{ $t('buttons.close') }}</button>
                        <button class="btn btn-main" @click="saveLoan">{{ $t('buttons.save') }}</button>
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

export default {
    name: 'LoansComponent',
    components: { LoadingComponent },
    data() {
        return {
            isLoading: true,
            useApi: false, // ضع true للـ API و false للبيانات الوهمية
            loans: [],
            editLoanData: {},
            loanModalTitle: 'Add Loan',
            apiBase: process.env.VUE_APP_API_BASE_URL || 'http://localhost:8000/api/v1'
        };
    },
    methods: {
        fetchLoans() {
            this.isLoading = true;
            if (this.useApi) {
                axios.get(`/loans`)
                    .then(res => this.loans = res.data.data || res.data)
                    .catch( Swal.fire('Error', 'Failed to fetch loans', 'error'))
                    .finally(() => this.isLoading = false);
            } else {
                // بيانات وهمية
                this.loans = [
                    { id: 1, employee_name: 'Ali', amount: 1000, installments: 5, remaining: 1000, start_date: '2025-10-02' },
                    { id: 2, employee_name: 'Sara', amount: 500, installments: 2, remaining: 500, start_date: '2025-10-01' },
                ];
                this.isLoading = false;
            }
        },
        openAddLoanModal() {
            this.editLoanData = { employee_name: '', amount: 0, installments: 1, start_date: '', remaining: 0 };
            this.loanModalTitle = 'Add Loan';
            new bootstrap.Modal(document.getElementById('loanModal')).show();
        },
        editLoan(loan) {
            this.editLoanData = { ...loan };
            this.loanModalTitle = 'Edit Loan';
            new bootstrap.Modal(document.getElementById('loanModal')).show();
        },
        saveLoan() {
            this.editLoanData.remaining = this.editLoanData.amount;
            if (this.useApi) {
                const request = this.editLoanData.id
                    ? axios.put(`${this.apiBase}/loans/${this.editLoanData.id}`, this.editLoanData)
                    : axios.post(`${this.apiBase}/loans`, this.editLoanData);

                request.then(() => {
                    Swal.fire('Success', 'Saved successfully', 'success');
                    this.fetchLoans();
                    this.closeLoanModal();
                }).catch(() => Swal.fire('Error', 'Failed to save', 'error'));
            } else {
                if (this.editLoanData.id) {
                    const idx = this.loans.findIndex(l => l.id === this.editLoanData.id);
                    if (idx !== -1) this.loans.splice(idx, 1, { ...this.editLoanData });
                } else {
                    this.editLoanData.id = this.loans.length + 1;
                    this.loans.push({ ...this.editLoanData });
                }
                this.closeLoanModal();
                Swal.fire('Success', 'Saved locally', 'success');
            }
        },
        deleteLoan(loan) {
            Swal.fire({ title: 'Confirm Delete?', icon: 'warning', showCancelButton: true })
                .then(res => {
                    if (res.isConfirmed) {
                        if (this.useApi) {
                            axios.delete(`${this.apiBase}/loans/${loan.id}`)
                                .then(() => this.fetchLoans())
                                .catch(() => Swal.fire('Error', 'Failed to delete', 'error'));
                        } else {
                            const idx = this.loans.findIndex(l => l.id === loan.id);
                            if (idx !== -1) this.loans.splice(idx, 1);
                        }
                    }
                });
        },
        payInstallment(loan) {
            const installmentAmount = loan.amount / loan.installments;
            loan.remaining = Math.max(loan.remaining - installmentAmount, 0);
            Swal.fire('Paid', `Installment of ${installmentAmount} paid`, 'success');
            if (this.useApi) {
                axios.put(`${this.apiBase}/loans/${loan.id}`, loan)
                    .catch(() => Swal.fire('Error', 'Failed to update', 'error'));
            }
        },
        closeLoanModal() {
            const modal = bootstrap.Modal.getInstance(document.getElementById('loanModal'));
            if (modal) modal.hide();
        }
    },
    mounted() {
        this.fetchLoans();
    }
};
</script>

<style scoped>
.action-icon {
    cursor: pointer;
    font-size: 1.2rem;
}
</style>
