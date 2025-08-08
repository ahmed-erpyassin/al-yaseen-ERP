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
            <h3>{{ $t('label.warehouse_info') }}</h3>

            <div class="row mt-5">
                <div class="col-md-2">
                    <div class="mb-3 position-relative">
                        <label for="warehouse_number" class="form-label">{{ $t('label.warehouse_number') }}</label>
                        <input type="text" id="warehouse_number" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="mb-3 position-relative">
                        <label for="information" class="form-label">{{ $t('label.information') }}</label>
                        <input type="text" id="information" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="warehousekeeper" class="form-label">{{ $t('label.warehousekeeper_employee_number')
                            }}</label>
                        <input type="text" id="warehousekeeper" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="warehousekeeper_employee_name" class="form-label">{{
                            $t('label.warehousekeeper_employee_name') }}</label>
                        <input type="text" id="warehousekeeper_employee_name" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3 position-relative">
                        <label for="mobile_number" class="form-label">{{ $t('label.mobile_number') }}</label>
                        <input type="text" id="mobile_number" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3 position-relative">
                        <label for="fax_number" class="form-label">{{ $t('label.fax_number') }}</label>
                        <input type="text" id="fax_number" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3 position-relative">
                        <label for="address" class="form-label">{{ $t('label.address') }}</label>
                        <input type="text" id="address" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="category_number" class="form-label">{{ $t('label.category_number') }}</label>
                        <input type="text" id="category_number" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="category_name" class="form-label">{{ $t('label.category_name') }}</label>
                        <input type="text" id="category_name" class="form-control rounded-1" />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="sale_account" class="form-label">{{ $t('label.sale_account') }}</label>
                        <input type="text" id="sale_account" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="buy_account" class="form-label">{{ $t('label.buy_account') }}</label>
                        <input type="text" id="buy_account" class="form-control rounded-1" />
                    </div>
                </div>

                <div class="col-12">
                    <h3>{{ $t('label.how_to_evaluate_stock') }}</h3>

                    <div class="form-check mb-3 mt-5">
                        <input type="checkbox" checked class="form-check-input rounded-circle" id="remember1" />
                        <label class="form-check-label" for="remember1">{{ $t('label.evaluation_method.natural')
                            }}</label>
                    </div>
                    <div class="form-check mb-3">
                        <input type="checkbox" class="form-check-input rounded-circle" id="remember2" />
                        <label class="form-check-label" for="remember2">{{ $t('label.evaluation_method.no_value')
                            }}</label>
                    </div>
                    <div class="form-check mb-3">
                        <input type="checkbox" class="form-check-input rounded-circle" id="remember3" />
                        <label class="form-check-label" for="remember3">{{
                            $t('label.evaluation_method.first_purchase_price') }}</label>
                    </div>
                    <div class="form-check mb-3">
                        <input type="checkbox" class="form-check-input rounded-circle" id="remember4" />
                        <label class="form-check-label" for="remember4">{{
                            $t('label.evaluation_method.second_purchase_price') }}</label>
                    </div>
                    <div class="form-check mb-3">
                        <input type="checkbox" class="form-check-input rounded-circle" id="remember5" />
                        <label class="form-check-label" for="remember5">{{
                            $t('label.evaluation_method.third_purchase_price') }}</label>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="item mb-4 mt-3">
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
