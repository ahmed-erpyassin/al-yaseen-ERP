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

            <div class="row ">
                <h3 class="mb-5">{{ $t('label.add_asset') }}</h3>
                <div class="row ">
                    <div class="col-md-2">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="number" class="form-label">{{ $t('label.number')
                                    }}</label>

                                    <input type="text" id="number" class="form-control rounded-1" />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="statement" class="form-label">{{ $t('label.statement') }}</label>

                                    <input type="text" id="statement" class="form-control rounded-1" />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="details" class="form-label">{{ $t('label.details') }}</label>

                                    <input type="text" id="details" class="form-control rounded-1" />

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="row">
                    <div class="col-md-2">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="branch" class="form-label">{{ $t('label.branch') }}</label>

                                    <input type="text" id="branch" class="form-control">

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-2">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="statement" class="form-label">{{ $t('label.department') }}</label>

                                    <input type="text" id="statement" class="form-control">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="location" class="form-label">{{ $t('label.location') }}</label>

                                    <input type="text" id="location" class="form-control">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="asset_account" class="form-label">{{ $t('label.asset_account')
                                    }}</label>

                                    <select name="asset_account" id="asset_account" class="form-control"></select>

                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div class="row">
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="employee_responsibility" class="form-label">{{
                                        $t('label.employee_responsibility')
                                        }}</label>

                                    <input type="text" id="employee_responsibility" class="form-control">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="depreciation_summary_account" class="form-label">{{
                                        $t('label.depreciation_summary_account')
                                        }}</label>

                                    <input type="text" id="depreciation_summary_account" class="form-control">

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="row">
                    <div class="col-md-2">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="purchase_date" class="form-label">{{
                                        $t('label.purchase_date')
                                        }}</label>

                                    <input type="text" id="purchase_date" class="form-control">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="purchase_price" class="form-label">{{
                                        $t('label.purchase_price')
                                        }}</label>

                                    <input type="text" id="purchase_price" class="form-control">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="invoice_number" class="form-label">{{
                                        $t('label.invoice_number')
                                        }}</label>

                                    <input type="text" id="invoice_number" class="form-control">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="supplier_number" class="form-label">{{
                                        $t('label.supplier_number')
                                        }}</label>

                                    <input type="text" id="supplier_number" class="form-control">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="supplier_name" class="form-label">{{
                                        $t('label.supplier_name')
                                        }}</label>

                                    <input type="text" id="supplier_name" class="form-control">

                                </div>
                            </div>
                        </div>
                    </div>
                    <h3>{{ $t('label.depreciation') }}</h3>
                    <div class="col-md-3">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="depreciation" class="form-label">{{
                                        $t('label.depreciation')
                                        }}</label>

                                    <input type="text" id="depreciation" class="form-control">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="accumulated_depreciation_account" class="form-label">{{
                                        $t('label.accumulated_depreciation_account')
                                        }}</label>

                                    <input type="text" id="accumulated_depreciation_account" class="form-control">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="depreciation_rate" class="form-label">{{
                                        $t('label.depreciation_rate')
                                        }}</label>

                                    <input type="text" id="depreciation_rate" class="form-control">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-check  ">
                            <input type="checkbox" checked class="form-check-input rounded-circle"
                                id="declining_depreciatio3" />
                            <label class="form-check-label" for="declining_depreciation">{{
                                $t('label.declining_depreciation') }}</label>
                        </div>
                    </div>
                    <h3 class="mb-3">{{ $t('label.post_depreciation_to') }}</h3>
                    <div class="col-12">

                        <div class="form-check  ">
                            <input type="checkbox" checked class="form-check-input rounded-circle"
                                id="profit_and_loss_account" />
                            <label class="form-check-label" for="profit_and_loss_account">{{
                                $t('label.profit_and_loss_account') }}</label>
                        </div>
                        <div class="form-check  ">
                            <input type="checkbox" class="form-check-input rounded-circle" id="trading_account" />
                            <label class="form-check-label" for="trading_account">{{
                                $t('label.trading_account') }}</label>
                        </div>
                        <div class="form-check  ">
                            <input type="checkbox" class="form-check-input rounded-circle" id="operating_account" />
                            <label class="form-check-label" for="operating_account">{{
                                $t('label.operating_account') }}</label>
                        </div>
                        <div class="form-check  ">
                            <input type="checkbox" class="form-check-input rounded-circle"
                                id="income_and_expense_account" />
                            <label class="form-check-label" for="income_and_expense_account">{{
                                $t('label.income_and_expense_account') }}</label>
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
                </div>
            </div>
        </form>
    </div>

</template>