<template>

    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>
        <div class="d-flex align-items-center justify-content-end">
            <button class="btn btn-lg btn-outline-secondary me-3">{{ $t('buttons.save_as_draft') }}</button>
            <button class="btn btn-lg btn-success me-3" type="button">
                {{ $t('buttons.save') }}
            </button>
            <button class="btn btn-danger btn-lg me-3">{{ $t('buttons.delete') }}</button>

        </div>
        <form class="form">

            <div class="row mt-5">
                <h3>{{ $t('label.automatic_disbursement') }}</h3>

                <div class="row mt-4">
                    <div class="col-12 mb-3">
                        <label class='form-label fs-4'>{{ $t('label.check_disbursement') }}</label>
                        <div class="form-check mb-3 ">
                            <input checked type="checkbox" class="form-check-input rounded-circle" id="remember" />
                            <label class="form-check-label" for="remember">{{
                                $t('label.incoming_under_collection') }}</label>
                        </div>
                        <div class="form-check mb-3 ">
                            <input checked type="checkbox" class="form-check-input rounded-circle" id="remember" />
                            <label class="form-check-label" for="remember">{{
                                $t('label.issued_unpaid') }}</label>
                        </div>

                    </div>
                    <div class="col-md-6">
                        <p class='fs-4'>{{ $t('label.collection_fee_check_account') }}</p>
                        <div class="row">
                            <div class="col-md-3 mb-3 position-relative mb-4">
                                <label for="from" class="form-label">{{ $t('label.from') }}</label>
                                <input type="text" id="from" class="form-control rounded-1" />
                            </div>

                            <div class="col-md-6 mb-3 position-relative mb-4">
                                <label for="to" class="form-label">{{ $t('label.to')
                                }}</label>
                                <input type="text" id="to" class="form-control rounded-1" />
                            </div>

                        </div>
                        <p class='fs-4'>{{ $t('label.bank_number') }}</p>
                        <div class="row">
                            <div class="col-md-3 mb-3 position-relative mb-4">
                                <label for="from" class="form-label">{{ $t('label.from') }}</label>
                                <input type="text" id="from" class="form-control rounded-1" />
                            </div>

                            <div class="col-md-6 mb-3 position-relative mb-4">
                                <label for="to" class="form-label">{{ $t('label.to')
                                }}</label>
                                <input type="text" id="to" class="form-control rounded-1" />
                            </div>

                        </div>
                    </div>
                    <div class="col-md-6">
                        <p class='fs-4'>{{ $t('label.bank_account') }}</p>
                        <div class="row">
                            <div class="col-md-3 mb-3 position-relative mb-4">
                                <label for="from" class="form-label">{{ $t('label.from') }}</label>
                                <input type="text" id="from" class="form-control rounded-1" />
                            </div>

                            <div class="col-md-6 mb-3 position-relative mb-4">
                                <label for="to" class="form-label">{{ $t('label.to')
                                }}</label>
                                <input type="text" id="to" class="form-control rounded-1" />
                            </div>
                            <p class='fs-4'>{{ $t('label.checks') }}</p>
                            <div class="row">
                                <div class="col-md-3 mb-3 position-relative mb-4">
                                    <label for="from" class="form-label">{{ $t('label.due_date_from') }}</label>
                                    <input type="text" id="from" class="form-control rounded-1" />
                                </div>

                                <div class="col-md-6 ">
                                    <div class="mb-3 position-relative mb-4">

                                        <label for="to" class="form-label">{{ $t('label.to')
                                        }}</label>
                                        <input type="text" id="to" class="form-control rounded-1" />
                                    </div>
                                    <div class="row ">
                                        <div class="col-md-12 d-flex justify-content-end w-100">
                                            <div class="form-check mb-3 ">
                                                <input checked type="checkbox" class="form-check-input rounded-circle"
                                                    id="remember" />
                                                <label class="form-check-label" for="remember">{{
                                                    $t('label.use_due_date') }}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="col-md-3 mb-3 position-relative mb-4">
                                <label for="from" class="form-label">{{ $t('label.number_from') }}</label>
                                <input type="text" id="from" class="form-control rounded-1" />
                            </div>

                            <div class="col-md-6 mb-3 position-relative mb-4">
                                <label for="to" class="form-label">{{ $t('label.to')
                                }}</label>
                                <input type="text" id="to" class="form-control rounded-1" />
                            </div>
                        </div>

                    </div>



                </div>
            </div>

            <div class="row mt-3">
                <div class="row">

                    <div class="col-md-3 mb-3 position-relative">
                        <label for="cheque_date" class="form-label">{{ $t('label.transaction_fee') }}</label>
                        <input type="text" id="cheque_date" class="form-control rounded-1" />
                    </div>
    
                    <div class="col-md-3 mb-3 position-relative mb-4">
                        <label for="transaction_date" class="form-label">{{ $t('label.bank_fee_account') }}</label>
                        <input type="text" id="transaction_date" class="form-control rounded-1" />
                    </div>
    
                    <div class="col-md-3 mb-3 position-relative mb-4">
                        <label for="cheque_number" class="form-label">{{ $t('label.fee_details') }}</label>
                        <input type="text" id="cheque_number" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="row mb-5">

                    <div class="col-md-3 mb-3 position-relative">
                        <label for="cheque_date" class="form-label">{{ $t('label.disbursement_date') }}</label>
                        <input type="text" id="cheque_date" class="form-control rounded-1" />
                    </div>
    
                    <div class="col-md-3 mb-3 position-relative mb-4">
                        <label for="transaction_date" class="form-label">{{ $t('label.time') }}</label>
                        <input type="text" id="transaction_date" class="form-control rounded-1" />
                    </div>
    
                    <div class="col-md-4 mb-3 position-relative mb-4">
                        <label for="cheque_number" class="form-label">{{ $t('label.fill_due_date') }}</label>
                        <input type="text" id="cheque_number" class="form-control rounded-1" />
                    </div>
                </div>


            </div>
        </form>
    </div>

</template>