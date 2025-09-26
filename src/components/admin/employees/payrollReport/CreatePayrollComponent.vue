<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>
        <div class="d-flex align-items-center justify-content-end">
            <button class="btn btn-lg btn-outline-secondary me-3">{{ $t('buttons.cancel') }}</button>
            <div class="dropdown">
                <button class="btn btn-lg btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {{ $t('buttons.save') }}
                </button>
                <ul class="dropdown-menu bg-main text-light">
                    <li><a class="dropdown-item" href="#">{{ $t('buttons.save&print') }}</a></li>
                    <li><a class="dropdown-item" href="#">{{ $t('buttons.save&email') }}</a></li>
                </ul>
            </div>
        </div>
        <form class="form">
            <h3>{{ $t('label.new_payroll') }}</h3>
            <div class="row mt-5">

                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="customer_number" class="form-label">{{ $t('label.number') }}</label>

                                <input type="text" id="customer_number" class="form-control rounded-1" />

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="company_name" class="form-label">{{ $t('label.date') }}</label>

                            <input type="text" id="company_name" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="first_name" class="form-label">{{ $t('label.second_date') }}</label>

                            <input type="text" id="first_name" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="last_name" class="form-label">{{ $t('label.currency_price') }}</label>

                            <input type="text" id="last_name" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="mobile" class="form-label">{{ $t('label.salary_calculation') }}</label>

                            <input type="text" id="mobile
                            " class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="phone" class="form-label">{{ $t('label.payment_calculation') }}</label>

                            <input type="text" id="phone" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="address_1" class="form-label">{{ $t('label.payroll_for_schedule_period')
                                }}</label>

                            <input type="text" id="address_1" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>


            </div>
            <h4>{{ $t('label.sheet_data') }}</h4>
            <div class="table-responsive">
                <table class="table table-bordered text-center align-middle">
                    <thead class="header">
                        <tr>
                            <th>{{ $t('label.account_number') }}</th>
                            <th>{{ $t('label.id_number') }}</th>
                            <th>{{ $t('label.employee_name') }}</th>
                            <th>{{ $t('label.marital_status') }}</th>
                            <th>{{ $t('label.job_title') }}</th>
                            <th>{{ $t('label.duration') }}</th>
                            <th>{{ $t('label.basic_salary') }}</th>
                            <th>{{ $t('label.net_income') }}</th>
                            <th>{{ $t('label.salary_due') }}</th>
                            <th>{{ $t('label.paid_cash') }}</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody form">
                        <tr>
                            <td><input type="number" class="form-control border-0 rounded-0"></td>
                            <td><input type="number" class="form-control border-0 rounded-0"></td>
                            <td><input type="text" class="form-control border-0 rounded-0"></td>
                            <td><input type="text" class="form-control border-0 rounded-0"></td>
                            <td><input type="text" class="form-control border-0 rounded-0"></td>
                            <td><input type="number" class="form-control border-0 rounded-0"></td>
                            <td><input type="number" class="form-control border-0 rounded-0" readonly></td>
                            <td><input type="number" class="form-control border-0 rounded-0" readonly></td>
                            <td><input type="number" class="form-control border-0 rounded-0" readonly></td>
                            <td><input type="number" class="form-control border-0 rounded-0" readonly></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="d-flex gap-2 justify-content-end">
                <button class="btn  btn-action">{{ $t('actions.add_row') }}</button>
                <button class="btn  btn-action">{{ $t('actions.remove_row') }}</button>
            </div>
            <div class="row mt-5 justify-content-end">
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="voucher_book" class="form-label">{{ $t('label.voucher_book') }}</label>

                            <input type="text" id="voucher_book" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="voucher_number" class="form-label">{{ $t('label.voucher_number') }}</label>

                            <input type="text" id="voucher_number" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="total_salaries" class="form-label">{{ $t('label.total_salaries') }}</label>

                            <input type="text" id="total_salaries" class="form-control rounded-1" />

                        </div>
                    </div>
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="income_tax_deductions" class="form-label">{{ $t('label.income_tax_deductions') }}</label>

                            <input type="text" id="income_tax_deductions" class="form-control rounded-1" />

                        </div>
                    </div>
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="total_amount_due" class="form-label">{{ $t('label.total_amount_due') }}</label>

                            <input type="text" id="total_amount_due" class="form-control rounded-1" />

                        </div>
                    </div>
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="total_cash_paid_salaries" class="form-label">{{ $t('label.total_cash_paid_salaries') }}</label>

                            <input type="text" id="total_cash_paid_salaries" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<style>
.box-attachments {
    height: 162px;
    border: 1px dashed #767171;
    border-radius: 3px;
}

.box-attachments i {
    font-size: 92px;
}

.header th {

    background-color: #F4FFF0 !important;

}

.btn-action {
    background-color: #F4FFF0 !important;
}
</style>
