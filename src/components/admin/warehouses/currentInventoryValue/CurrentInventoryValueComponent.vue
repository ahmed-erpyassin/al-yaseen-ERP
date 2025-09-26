<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>

        <div class="d-flex align-items-center justify-content-end b-5">
            <button class="btn btn-lg btn-success me-3">{{ $t('buttons.calculation') }}</button>
        </div>

        <form method="post" class="form">

            <div class="row mb-3">

                <div class="mb-3">{{ $t('label.date') }}</div>
                <div class="col-md-6">
                    <div class="mb-3 position-relative">
                        <label for="fax_number" class="form-label">{{ $t('label.until') }}</label>
                        <input type="text" id="fax_number" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3 position-relative">
                        <label for="fax_number" class="form-label">{{ $t('label.currency') }}</label>
                        <input type="text" id="fax_number" class="form-control rounded-1" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="group_by" class="form-label">{{ $t('label.group_by') }}</label>
                        <select name="group_by" id="group_by" class="form-control">
                            <option value="">{{ $t('label.price_level_1') }}</option>
                            <option value="">{{ $t('label.price_level_2') }}</option>
                            <option value="">{{ $t('label.price_level_3') }}</option>
                            <option value="">{{ $t('label.sale_price_1') }}</option>
                            <option value="">{{ $t('label.sale_price_2') }}</option>
                            <option value="">{{ $t('label.sale_price_3') }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="valuation_method" class="form-label">{{ $t('label.valuation_method') }}</label>
                        <select name="valuation_method" id="valuation_method" class="form-control">
                            <option value="">{{ $t('label.selected_price') }}</option>
                            <option value="">{{ $t('label.price_source_1') }}</option>
                            <option value="">{{ $t('label.price_source_2') }}</option>
                            <option value="">{{ $t('label.price_source_3') }}</option>
                            <option value="">{{ $t('label.price_source_4') }}</option>
                            <option value="">{{ $t('label.price_source_5') }}</option>
                            <option value="">{{ $t('label.average_price') }}</option>
                            <option value="">{{ $t('label.min_price') }}</option>
                            <option value="">{{ $t('label.max_price') }}</option>
                            <option value="">{{ $t('label.last_movement_price') }}</option>
                            <option value="">{{ $t('label.last_movement_price') }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="costing_method" class="form-label">{{ $t('label.costing_method') }}</label>
                        <select name="costing_method" id="costing_method" class="form-control">
                            <option value="">{{ $t('label.without_cost') }}</option>
                            <option value="">{{ $t('label.class_cost') }}</option>
                            <option value="">{{ $t('label.purchase_invoice_cost') }}</option>
                            <option value="">{{ $t('label.purchase_cost_allocation') }}</option>
                            <option value="">{{ $t('label.admin_expense_cost') }}</option>
                            <option value="">{{ $t('label.selling_price') }}</option>

                        </select>
                    </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <div class="form-check ">
                        <input type="checkbox" checked class="form-check-input rounded-circle" id="remember" />
                        <label class="form-check-label" for="remember">{{ $t('label.lower_of_cost_or_market') }}</label>
                    </div>
                    <div class="form-check ">
                        <input type="checkbox" checked class="form-check-input rounded-circle" id="remember" />
                        <label class="form-check-label" for="remember">{{ $t('label.inventory_zero_valued_items')
                            }}</label>
                    </div>
                    <div class="form-check ">
                        <input type="checkbox" checked class="form-check-input rounded-circle" id="remember" />
                        <label class="form-check-label" for="remember">{{ $t('label.use_item_card_price') }}</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-check ">
                        <input type="checkbox" checked class="form-check-input rounded-circle" id="remember" />
                        <label class="form-check-label" for="remember">{{ $t('label.inventory_per_warehouse') }}</label>
                    </div>
                    <div class="form-check ">
                        <input type="checkbox" checked class="form-check-input rounded-circle" id="remember" />
                        <label class="form-check-label" for="remember">{{ $t('label.include_returned_goods') }}</label>
                    </div>
                    <div class="form-check ">
                        <input type="checkbox" checked class="form-check-input rounded-circle" id="remember" />
                        <label class="form-check-label" for="remember">{{ $t('label.check_shipments_without_invoices')
                            }}</label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-5">
                    <div class="row mb-3">
                        <div class="mb-3">{{ $t('label.item') }}</div>
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
                        <div class="mb-3">{{ $t('label.warehouse') }}</div>
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
                        <div class="mb-3">{{ $t('label.department') }}</div>
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
                    <div class="row">
                        <div class="mb-3">{{ $t('label.primary_classification') }}</div>
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
                <div class="col-md-7">
                    <div class="row mb-3">
                        <div class="mb-3">{{ $t('label.branch') }}</div>
                        <div class="col-md-4">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.from') }}</label>
                                <input type="text" id="fax_number" class="form-control rounded-1" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.to') }}</label>
                                <input type="text" id="from" class="form-control rounded-1" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.supplier_name') }}</label>
                                <input type="text" id="from" class="form-control rounded-1" />
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="mb-3">{{ $t('label.department_warehouse') }}</div>
                        <div class="col-md-4">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.from') }}</label>
                                <input type="text" id="fax_number" class="form-control rounded-1" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.to') }}</label>
                                <input type="text" id="from" class="form-control rounded-1" />
                            </div>
                        </div>

                    </div>
                    <div class="row mb-3">
                        <div class="mb-3">{{ $t('label.funder') }}</div>
                        <div class="col-md-4">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.from') }}</label>
                                <input type="text" id="fax_number" class="form-control rounded-1" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.to') }}</label>
                                <input type="text" id="from" class="form-control rounded-1" />
                            </div>
                        </div>

                    </div>
                    <div class="row mb-3">
                        <div class="mb-3">{{ $t('label.secondary_classification') }}</div>
                        <div class="col-md-4">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.from') }}</label>
                                <input type="text" id="fax_number" class="form-control rounded-1" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.to') }}</label>
                                <input type="text" id="from" class="form-control rounded-1" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </form>

    </div>
</template>
