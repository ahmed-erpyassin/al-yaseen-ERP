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
            <h3 class="mb-5">{{ $t('label.sales_deliveries') }}</h3>

            <div class="row">
                <div class="col-md-6">
                    <div class="row mb-3">
                        <h5>{{ $t('label.account_number') }}</h5>
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
                        <h5>{{ $t('label.driver_number') }}</h5>
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
                        <h5>{{ $t('label.transfer_from_warehouse') }}</h5>
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
                        <h5>{{ $t('label.delivery_number') }}</h5>
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
                        <h5>{{ $t('label.date') }}</h5>
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
                    <div class="row mb-3">
                        <h5>{{ $t('label.transfer_from_warehouse') }}</h5>
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
                <div class="row mb-3">
                    <label class="form-label fw-bold">{{ $t('label.deliveries') }} :</label>
                    <div class="col-12 d-flex flex-wrap gap-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="outgoing" value="outgoing">
                            <label class="form-check-label" for="outgoing">{{ $t('label.outgoing') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="incoming" value="incoming">
                            <label class="form-check-label" for="incoming">{{ $t('label.incoming') }}</label>
                        </div>
                    </div>
                </div>

                <!-- نوع التقارير -->
                <div class="row mb-3">
                    <label class="form-label fw-bold">{{ $t('label.report_type') }} :</label>
                    <div class="col-12 d-flex flex-wrap gap-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="all_deliveries_in_one_report" value="all_in_one">
                            <label class="form-check-label" for="all_deliveries_in_one_report">{{ $t('label.all_deliveries_in_one_report')
                            }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="each_customer_delivery_separately" value="each_customer_delivery_separately">
                            <label class="form-check-label" for="each_customer_delivery_separately">{{ $t('label.each_customer_delivery_separately')
                            }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="count_and_total_per_customer"
                                value="count_and_total_per_customer">
                            <label class="form-check-label" for="count_and_total_per_customer">{{ $t('label.count_and_total_per_customer')
                            }}</label>
                        </div>
                    </div>
                </div>

                <!-- الحالة -->
                <div class="row mb-3">
                    <label class="form-label fw-bold">{{ $t('label.status') }} :</label>
                    <div class="col-12 d-flex flex-wrap gap-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="all_deliveries" value="all">
                            <label class="form-check-label" for="all_deliveries">{{ $t('label.all_deliveries') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="deliveries_with_incoming_outgoing_invoices" value="deliveries_with_incoming_outgoing_invoices">
                            <label class="form-check-label" for="deliveries_with_incoming_outgoing_invoices">{{ $t('label.deliveries_with_incoming_outgoing_invoices')
                            }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="deliveries_without_incoming_outgoing_invoices" value="deliveries_without_incoming_outgoing_invoices">
                            <label class="form-check-label" for="deliveries_without_incoming_outgoing_invoices">{{ $t('label.deliveries_without_incoming_outgoing_invoices')
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
                            <input class="form-check-input" type="checkbox" id="delivery_date" value="date">
                            <label class="form-check-label" for="delivery_date">{{ $t('label.delivery_date') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="delivery_number" value="delivery_number">
                            <label class="form-check-label" for="delivery_number">{{ $t('label.delivery_number') }}</label>
                        </div>
                    </div>
                </div>
            </div>


        </form>
    </div>
</template>
