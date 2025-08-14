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
            <h3 class="mb-5">{{ $t('label.price_list') }}</h3>

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


                </div>
            </div>
            <div class="container mt-4">

                <div class="row mb-5">
                    <label class="form-label fw-bold">{{ $t('label.price_list') }} :</label>
                    <div class="col-12 d-flex flex-wrap gap-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="sale" value="sale">
                            <label class="form-check-label" for="sale">{{ $t('label.sale') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="purchase" value="purchase">
                            <label class="form-check-label" for="purchase">{{ $t('label.purchase') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="sale_and_purchase"
                                value="sale_and_purchase">
                            <label class="form-check-label" for="sale_and_purchase">{{ $t('label.sale_and_purchase')
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
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="for_the_specified_account"
                                value="for_the_specified_account">
                            <label class="form-check-label" for="for_the_specified_account">{{
                                $t('label.for_the_specified_account') }}</label>
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
                <div class="row mb-5">

                    <label class="form-label fw-bold">{{ $t('label.account_number') }} :</label>

                    <div class="col-md-3">
                        <div class="mb-3 position-relative">
                            <label for="from" class="form-label">{{ $t('label.from') }}</label>
                            <input type="text" id="fax_number" class="form-control rounded-1" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="mb-3 position-relative">
                            <label for="from" class="form-label">{{ $t('label.to') }}</label>
                            <input type="text" id="from" class="form-control rounded-1" />
                        </div>
                    </div>
                </div>
            </div>


        </form>
    </div>
</template>
