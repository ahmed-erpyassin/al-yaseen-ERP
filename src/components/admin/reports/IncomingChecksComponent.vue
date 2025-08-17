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
                </ul>
            </div>
        </div>

        <form class="form">
            <h3 class="mb-5">{{ $t('label.incoming_checks') }}</h3>

            <div class="row">
                <div class="col-md-6">
                    <div class="row mb-3">
                        <h5 class="mb-3">{{ $t('label.cheque_number') }}</h5>
                        <div class="col-md-6">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.from') }}</label>
                                <input type="text" id="fax_number" class="form-control rounded-1" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.to') }}</label>
                                <input type="text" id="from" class="form-control rounded-1" />
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <h5 class="mb-3">{{ $t('label.transaction_date') }}</h5>
                        <div class="col-md-6">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.from') }}</label>
                                <input type="text" id="fax_number" class="form-control rounded-1" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.to') }}</label>
                                <input type="text" id="from" class="form-control rounded-1" />
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <h5 class="mb-3">{{ $t('label.customer_account') }}</h5>
                        <div class="col-md-6">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.from') }}</label>
                                <input type="text" id="fax_number" class="form-control rounded-1" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.to') }}</label>
                                <input type="text" id="from" class="form-control rounded-1" />
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <h5 class="mb-3">{{ $t('label.bank_account') }}</h5>
                        <div class="col-md-6">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.from') }}</label>
                                <input type="text" id="fax_number" class="form-control rounded-1" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.to') }}</label>
                                <input type="text" id="from" class="form-control rounded-1" />
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="currency" class="form-label">{{ $t('label.currency')
                                    }}</label>
                                <select name="currency" id="currency" class="form-control">
                                    <option value="">$ USD</option>
                                </select>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">

                    <div class="row mb-3">
                        <h5 class="mb-3">{{ $t('label.cheque_date') }}</h5>
                        <div class="col-md-6">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.from') }}</label>
                                <input type="text" id="fax_number" class="form-control rounded-1" />
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.to') }}</label>
                                <input type="text" id="from" class="form-control rounded-1" />
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <h5 class="mb-3">{{ $t('label.due_date') }}</h5>
                        <div class="col-md-6">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.from') }}</label>
                                <input type="text" id="fax_number" class="form-control rounded-1" />
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.to') }}</label>
                                <input type="text" id="from" class="form-control rounded-1" />
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <h5 class="mb-3">{{ $t('label.cheque_account') }}</h5>
                        <div class="col-md-6">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.from') }}</label>
                                <input type="text" id="fax_number" class="form-control rounded-1" />
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.to') }}</label>
                                <input type="text" id="from" class="form-control rounded-1" />
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <h5 class="mb-3">{{ $t('label.sales_representative') }}</h5>
                        <div class="col-md-6">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.from') }}</label>
                                <input type="text" id="fax_number" class="form-control rounded-1" />
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.to') }}</label>
                                <input type="text" id="from" class="form-control rounded-1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container mt-4">

                <div class="row mb-5">
                    <label class="form-label fw-bold">{{ $t('label.cheque_status') }} :</label>
                    <div class="col-12 d-flex flex-wrap gap-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="all_cheques" value="all_cheques">
                            <label class="form-check-label" for="all_cheques">{{ $t('label.all_cheques') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="in_cheque_portfolio" value="in_cheque_portfolio">
                            <label class="form-check-label" for="in_cheque_portfolio">{{ $t('label.in_cheque_portfolio') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="deposited_under_collection" value="deposited_under_collection">
                            <label class="form-check-label" for="deposited_under_collection">{{ $t('label.deposited_under_collection') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="deposited_and_cleared" value="deposited_and_cleared">
                            <label class="form-check-label" for="deposited_and_cleared">{{ $t('label.deposited_and_cleared') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="returned_in_portfolio" value="returned_in_portfolio">
                            <label class="form-check-label" for="returned_in_portfolio">{{ $t('label.returned_in_portfolio') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="endorsed" value="endorsed">
                            <label class="form-check-label" for="endorsed">{{ $t('label.endorsed') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="deposited_cleared_then_returned" value="deposited_cleared_then_returned">
                            <label class="form-check-label" for="deposited_cleared_then_returned">{{ $t('label.deposited_cleared_then_returned') }}</label>
                        </div>
                    </div>
                </div>
                <div class="row mb-5">
                    <label class="form-label fw-bold">{{ $t('label.sort_by') }} :</label>
                    <div class="col-12 d-flex flex-wrap gap-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="cheque_date" value="cheque_date">
                            <label class="form-check-label" for="cheque_date">{{ $t('label.cheque_date') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="cheque_number" value="cheque_number">
                            <label class="form-check-label" for="cheque_number">{{ $t('label.cheque_number') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="cheque_status_date" value="cheque_status_date">
                            <label class="form-check-label" for="cheque_status_date">{{ $t('label.cheque_status_date') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="cheque_status_then_number" value="cheque_status_then_number">
                            <label class="form-check-label" for="cheque_status_then_number">{{ $t('label.cheque_status_then_number') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="cheque_status_then_date" value="cheque_status_then_date">
                            <label class="form-check-label" for="cheque_status_then_date">{{ $t('label.cheque_status_then_date') }}</label>
                        </div>
                    </div>
                </div>
                <div class="row mb-5">
                    <label class="form-label fw-bold">{{ $t('label.statement_type') }} :</label>
                    <div class="col-12 d-flex flex-wrap gap-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="simple" value="simple">
                            <label class="form-check-label" for="simple">{{ $t('label.simple')
                            }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="detail" value="detail">
                            <label class="form-check-label" for="detail">{{ $t('label.detail') }}</label>
                        </div>
                    </div>
                </div>
            </div>


        </form>
    </div>
</template>
