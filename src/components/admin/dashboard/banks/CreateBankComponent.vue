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
                <h3 class="mb-5">{{ $t('label.banks') }}</h3>
                <div class="col-md-4">
                    <div class="row ">
                        <h5 class="mb-3">{{ $t('label.bank') }}</h5>
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
                <div class="col-md-4">
                    <div class="row ">
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
                <div class="col-md-4">
                    <div class="row ">
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
                <div class="col-md-8">
                    <div class="mb-3 position-relative">
                        <label for="address" class="form-label">{{ $t('label.address') }}</label>
                        <input type="text" id="address" class="form-control rounded-1" />

                    </div>
                    <div class="mb-3 position-relative">
                        <label for="po_box" class="form-label">{{ $t('label.po_box') }}</label>
                        <input type="text" id="po_box" class="form-control rounded-1" />

                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="mobile" class="form-label">{{ $t('label.mobile') }}</label>
                        <input type="text" id="mobile" class="form-control rounded-1" />

                    </div>
                    <div class="mb-3 position-relative">
                        <label for="fax_number" class="form-label">{{ $t('label.fax_number') }}</label>
                        <input type="text" id="fax_number" class="form-control rounded-1" />

                    </div>
                </div>
                <div class="col-md-8">
                    <div class="mb-3 position-relative">
                        <label for="email" class="form-label">{{ $t('label.email') }}</label>
                        <input type="text" id="email" class="form-control rounded-1" />

                    </div>
                </div>
                <div class="col-md-8">
                    <div class="mb-3 position-relative">
                        <label for="website" class="form-label">{{ $t('label.website') }}</label>
                        <input type="text" id="website" class="form-control rounded-1" />

                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="swift_code" class="form-label">{{ $t('SWIFT code') }}</label>
                        <input type="text" id="swift_code" class="form-control rounded-1" />

                    </div>
                </div>
                <h3 class="mb-5">{{ $t('label.other_info') }}</h3>
                <div class="col-md-8">
                    <div class="mb-3 position-relative">
                        <label for="general_manager" class="form-label">{{ $t('label.general_manager') }}</label>
                        <input type="text" id="general_manager" class="form-control rounded-1" />

                    </div>
                    <div class="mb-3 position-relative">
                        <label for="chairman" class="form-label">{{ $t('label.chairman') }}</label>
                        <input type="text" id="chairman" class="form-control rounded-1" />

                    </div>
                    <div class="mb-3 position-relative">
                        <label for="special_alert" class="form-label">{{ $t('label.special_alert') }}</label>
                        <input type="text" id="special_alert" class="form-control rounded-1" />

                    </div>
                    <div class="mb-3 position-relative">
                        <label for="check_cash_days" class="form-label">{{ $t('label.check_cash_days') }}</label>
                        <input type="text" id="check_cash_days" class="form-control rounded-1" />

                    </div>
                </div>
            </div>
        </form>
    </div>

</template>