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
            <h3 class="mb-5">{{ $t('label.sales_invoices') }}</h3>

            <div class="row">
                <div class="col-md-6">
                    <div class="row mb-3">
                        <h5>{{ $t('label.client_number') }}</h5>
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
                        <h5>{{ $t('label.voucher_number') }}</h5>
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
                        <h5>{{ $t('label.due_date') }}</h5>
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
                <div class="col-md-6">
                    <div class="row mb-3">
                        <h5>{{ $t('label.invoice_number') }}</h5>
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
                        <h5>{{ $t('label.invoice_date') }}</h5>
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
                        <h5>{{ $t('label.salesperson') }}</h5>
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
                <!-- فواتير -->
                <div class="row mb-3">
                    <label class="form-label fw-bold">{{ $t('label.invoices') }} :</label>
                    <div class="col-12 d-flex flex-wrap gap-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="sales" value="sales">
                            <label class="form-check-label" for="sales">{{ $t('label.sales') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="sales_return" value="sales_return">
                            <label class="form-check-label" for="sales_return">{{ $t('label.sales_return') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="service" value="service">
                            <label class="form-check-label" for="service">{{ $t('label.service') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="debit_notes" value="debit_notes">
                            <label class="form-check-label" for="debit_notes">{{ $t('label.debit_notes') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="purchases" value="purchases">
                            <label class="form-check-label" for="purchases">{{ $t('label.purchases') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="purchase_return"
                                value="purchase_return">
                            <label class="form-check-label" for="purchase_return">{{ $t('label.purchase_return')
                                }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="expenses" value="expenses">
                            <label class="form-check-label" for="expenses">{{ $t('label.expenses') }}</label>
                        </div>
                    </div>
                </div>

                <!-- نوع التقارير -->
                <div class="row mb-3">
                    <label class="form-label fw-bold">{{ $t('label.report_type') }} :</label>
                    <div class="col-12 d-flex flex-wrap gap-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="all_in_one" value="all_in_one">
                            <label class="form-check-label" for="all_in_one">{{ $t('label.all_clients_in_one_statement')
                                }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="separate" value="separate">
                            <label class="form-check-label" for="separate">{{ $t('label.each_client_separately')
                                }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="total_and_count"
                                value="total_and_count">
                            <label class="form-check-label" for="total_and_count">{{ $t('label.total_and_invoice_count')
                                }}</label>
                        </div>
                    </div>
                </div>

                <!-- الحالة -->
                <div class="row mb-3">
                    <label class="form-label fw-bold">{{ $t('label.status') }} :</label>
                    <div class="col-12 d-flex flex-wrap gap-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="all_status" value="all">
                            <label class="form-check-label" for="all_status">{{ $t('label.all_invoices') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="settled" value="settled">
                            <label class="form-check-label" for="settled">{{ $t('label.only_settled_invoices')
                                }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="unsettled" value="unsettled">
                            <label class="form-check-label" for="unsettled">{{ $t('label.only_unsettled_invoices')
                                }}</label>
                        </div>
                    </div>
                </div>

                <!-- حالة السند -->
                <div class="row mb-3">
                    <label class="form-label fw-bold">{{ $t('label.document_status') }} :</label>
                    <div class="col-12 d-flex flex-wrap gap-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="doc_all" value="all">
                            <label class="form-check-label" for="doc_all">{{ $t('label.all') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="settled_doc" value="settled">
                            <label class="form-check-label" for="settled_doc">{{ $t('label.settled') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="unsettled_doc" value="unsettled">
                            <label class="form-check-label" for="unsettled_doc">{{ $t('label.unsettled') }}</label>
                        </div>
                    </div>
                </div>

                <!-- رتب حسب -->
                <div class="row mb-3">
                    <label class="form-label fw-bold">{{ $t('label.sort_by') }} :</label>
                    <div class="col-12 d-flex flex-wrap gap-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="sort_date" value="date">
                            <label class="form-check-label" for="sort_date">{{ $t('label.sort_by_date') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="sort_number" value="number">
                            <label class="form-check-label" for="sort_number">{{ $t('label.sort_by_number') }}</label>
                        </div>
                    </div>
                </div>
            </div>


        </form>
    </div>
</template>
