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
                    <li><a class="dropdown-item" href="#">{{ $t('label.save&print') }}</a></li>
                </ul>
            </div>
        </div>
        <form class="form">

            <div class="row mt-5">
                <h3>{{ $t('label.crete_check') }}</h3>
                <div class="row mt-4">
                    <div class="col-md-6">
                        <div class="alert alert-danger text-white" style="background-color: #FF1616;">
                            <h3 class="fw-bold mb-2">{{ $t("label.warning") }}</h3>
                            <p>{{ $t("label.add_cheques") }}</p>
                            <p>{{ $t("label.old_accounting_period") }}</p>
                            <p>{{ $t("label.cheques_received_or_spent") }}</p>
                            <p>{{ $t("label.must_enter_with_receipt") }}</p>
                            <p>{{ $t("label.confirm_add_old_cheques") }}</p>

                        </div>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="row">
                        <div class="col-md-3 mb-3 position-relative">
                            <label for="cheque_date" class="form-label">{{ $t('label.cheque_date') }}</label>
                            <input type="date" id="cheque_date" class="form-control rounded-1" />
                        </div>

                        <div class="col-md-3 mb-3 position-relative mb-4">
                            <label for="transaction_date" class="form-label">{{ $t('label.transaction_date') }}</label>
                            <input type="date" id="transaction_date" class="form-control rounded-1" />
                        </div>

                        <div class="col-md-3 mb-3 position-relative mb-4">
                            <label for="cheque_number" class="form-label">{{ $t('label.cheque_number') }}</label>
                            <input type="text" id="cheque_number" class="form-control rounded-1" />
                        </div>

                        <div class="col-md-3 mb-3 position-relative mb-4">
                            <label for="cheque_amount" class="form-label">{{ $t('label.cheque_amount') }}</label>
                            <input type="text" id="cheque_amount" class="form-control rounded-1" />
                        </div>

                        <div class="col-md-6 mb-3 position-relative mb-4">
                            <label for="cheque_description" class="form-label">{{ $t('label.cheque_description')
                            }}</label>
                            <input type="text" id="cheque_description" class="form-control rounded-1" />
                        </div>

                        <div class="col-md-3 mb-3 position-relative mb-4">
                            <label for="bank_number" class="form-label">{{ $t('label.bank_number') }}</label>
                            <input type="text" id="bank_number" class="form-control rounded-1" />
                        </div>

                        <div class="col-md-3 mb-3 position-relative mb-4">
                            <label for="bank_name" class="form-label">{{ $t('label.bank_name') }}</label>
                            <input type="text" id="bank_name" class="form-control rounded-1" />
                        </div>

                        <div class="col-md-3 mb-3 position-relative mb-4">
                            <label for="branch_number" class="form-label">{{ $t('label.branch_number') }}</label>
                            <input type="text" id="branch_number" class="form-control rounded-1" />
                        </div>

                        <div class="col-md-3 mb-3 position-relative mb-4">
                            <label for="branch_name" class="form-label">{{ $t('label.branch_name') }}</label>
                            <input type="text" id="branch_name" class="form-control rounded-1" />
                        </div>

                        <div class="col-md-3 mb-3 position-relative mb-4">
                            <label for="currency" class="form-label">{{ $t('label.currency') }}</label>
                            <input type="text" id="currency" class="form-control rounded-1" />
                        </div>

                        <div class="col-md-3 mb-3 position-relative mb-4">
                            <label for="currency_rate" class="form-label">{{ $t('label.currency_rate') }}</label>
                            <input type="text" id="currency_rate" class="form-control rounded-1" />
                        </div>

                        <div class="col-md-3 mb-3 position-relative mb-4">
                            <label for="account" class="form-label">{{ $t('label.account') }}</label>
                            <input type="text" id="account" class="form-control rounded-1" />
                        </div>

                        <div class="col-md-3 mb-3 position-relative mb-4">
                            <label for="account_name" class="form-label">{{ $t('label.account_name') }}</label>
                            <input type="text" id="account_name" class="form-control rounded-1" />
                        </div>

                        <div class="col-md-3 mb-3 position-relative mb-4">
                            <label for="transaction_account" class="form-label">{{ $t('label.transaction_account')
                            }}</label>
                            <input type="text" id="transaction_account" class="form-control rounded-1" />
                        </div>

                        <div class="col-md-3 mb-3 position-relative mb-4">
                            <label for="transaction_account_name" class="form-label">{{
                                $t('label.transaction_account_name') }}</label>
                            <input type="text" id="transaction_account_name" class="form-control rounded-1" />
                        </div>

                        <div class="col-md-3 mb-3 position-relative mb-4">
                            <label for="customer_number" class="form-label">{{ $t('label.customer_number') }}</label>
                            <input type="text" id="customer_number" class="form-control rounded-1" />
                        </div>

                        <div class="col-md-3 mb-3 position-relative mb-4">
                            <label for="customer_name" class="form-label">{{ $t('label.customer_name') }}</label>
                            <input type="text" id="customer_name" class="form-control rounded-1" />
                        </div>
                    </div>


                </div>
            </div>
            <div class="col-md-9 mt-5">
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="notes" class="form-label">{{ $t('label.notes') }}</label>

                        <textarea name="notes" id="notes" rows="3" class="form-control"></textarea>

                    </div>
                </div>
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="attachments" class="form-label">{{ $t('label.attachments') }}</label>

                        <div class="box-attachments d-flex align-items-center justify-content-center">
                            <div class="text-center">

                                <i class="bi bi-image"></i>
                                <p class="small">{{ $t('label.attachment_note') }}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </form>
    </div>

</template>