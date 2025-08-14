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
            <h3 class="mb-5">{{ $t('label.item_balances') }}</h3>

            <div class="row">
                <div class="col-md-6">
                    <div class="row mb-3">
                        <h5 class="mb-3">{{ $t('label.item_number') }}</h5>
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
                        <h5 class="mb-3">{{ $t('label.branch') }}</h5>
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
                        <h5 class="mb-3">{{ $t('label.date') }}</h5>
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
                        <h5 class="mb-3">{{ $t('label.warehouse') }}</h5>
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
                        <h5 class="mb-3">{{ $t('label.item_type') }}</h5>
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
                    <div class="row mb-5">
                        <div class="col-md-2">
                            <label class="form-label fw-bold">{{ $t('label.period') }} :</label>

                        </div>
                        <div class="col-12 d-flex flex-wrap gap-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="currently" value="currently">
                                <label class="form-check-label" for="currently">{{ $t('label.currently')
                                }}</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                    id="by_specified_period_department_funder"
                                    value="by_specified_period_department_funder">
                                <label class="form-check-label" for="by_specified_period_department_funder">{{
                                    $t('label.by_specified_period_department_funder')
                                    }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <h5 class="mb-3">{{ $t('label.supplier') }}</h5>
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
                        <h5 class="mb-3">{{ $t('label.value') }}</h5>
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
                    <label class="form-label fw-bold">{{ $t('label.balances_with') }} :</label>
                    <div class="col-12 d-flex flex-wrap gap-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="quantities_only" value="quantities_only">
                            <label class="form-check-label" for="quantities_only">{{ $t('label.quantities_only') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="purchase_value" value="purchase_value">
                            <label class="form-check-label" for="purchase_value">{{ $t('label.purchase_value') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="sale_value"
                                value="sale_value">
                            <label class="form-check-label" for="sale_value">{{ $t('label.sale_value')
                                }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="purchase_and_sale_value"
                                value="purchase_and_sale_value">
                            <label class="form-check-label" for="purchase_and_sale_value">{{ $t('label.purchase_and_sale_value')
                                }}</label>
                        </div>
                    </div>
                </div>
                <div class="row mb-5">
                    <label class="form-label fw-bold">{{ $t('label.price') }} :</label>
                    <div class="col-12 d-flex flex-wrap gap-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="first" value="first">
                            <label class="form-check-label" for="first">{{ $t('label.first') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="second" value="second">
                            <label class="form-check-label" for="second">{{ $t('label.second') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="third" value="third">
                            <label class="form-check-label" for="third">{{ $t('label.third') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="first_to_third" value="first_to_third">
                            <label class="form-check-label" for="first_to_third">{{ $t('label.first_to_third')
                                }}</label>
                        </div>
                    </div>
                </div>

                <div class="row mb-5">
                    <label class="form-label fw-bold">{{ $t('label.sort_by') }} :</label>
                    <div class="col-12 d-flex flex-wrap gap-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="item_number" value="item_number">
                            <label class="form-check-label" for="item_number">{{ $t('label.item_number') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="item_name" value="item_name">
                            <label class="form-check-label" for="item_name">{{ $t('label.item_name') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="catalog_number" value="catalog_number">
                            <label class="form-check-label" for="catalog_number">{{ $t('label.catalog_number')
                            }}</label>
                        </div>
                    </div>
                </div>
            </div>


        </form>
    </div>
</template>
