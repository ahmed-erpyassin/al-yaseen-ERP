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
            <h3 class="mb-5">{{ $t('label.warehouse_movements') }}</h3>

            <div class="row">
                <div class="col-md-6">
                    <div class="row mb-3">
                        <h5 class="mb-3">{{ $t('label.movement_number') }}</h5>
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


                </div>
            </div>
            <div class="container mt-4">

                <div class="row mb-5">
                    <label class="form-label fw-bold">{{ $t('label.report_type') }} :</label>
                    <div class="col-12 d-flex flex-wrap gap-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="table" value="table">
                            <label class="form-check-label" for="table">{{ $t('label.table') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="detailed" value="detailed">
                            <label class="form-check-label" for="detailed">{{ $t('label.detailed') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="detailed_each_transaction" value="detailed_each_transaction">
                            <label class="form-check-label" for="detailed_each_transaction">{{ $t('label.detailed_each_transaction')
                            }}</label>
                        </div>
                    </div>
                </div>
                <div class="row mb-5">
                    <label class="form-label fw-bold">{{ $t('label.transaction_type') }} :</label>
                    <div class="col-12 d-flex flex-wrap gap-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="all_transactions" value="all_transactions">
                            <label class="form-check-label" for="all_transactions">{{ $t('label.all_transactions') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="incoming" value="incoming">
                            <label class="form-check-label" for="incoming">{{ $t('label.incoming') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="outgoing" value="outgoing">
                            <label class="form-check-label" for="outgoing">{{ $t('label.outgoing')
                            }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="transfer" value="transfer">
                            <label class="form-check-label" for="transfer">{{ $t('label.transfer')
                            }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="manufacturing" value="manufacturing">
                            <label class="form-check-label" for="manufacturing">{{ $t('label.manufacturing')
                            }}</label>
                        </div>
                    </div>
                </div>
                <div class="row mb-5">
                    <label class="form-label fw-bold">{{ $t('label.sort_by') }} :</label>
                    <div class="col-12 d-flex flex-wrap gap-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="entry_number" value="entry_number">
                            <label class="form-check-label" for="entry_number">{{ $t('label.entry_number') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="date" value="date">
                            <label class="form-check-label" for="date">{{ $t('label.date') }}</label>
                        </div>
                    </div>
                </div>
            </div>


        </form>
    </div>
</template>
