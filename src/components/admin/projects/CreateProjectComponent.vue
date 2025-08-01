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
                    <li><a class="dropdown-item" href="#">{{ $t('actions.save&email') }}</a></li>
                    <li><a class="dropdown-item" href="#">{{ $t('actions.save&print') }}</a></li>
                </ul>
            </div>
        </div>
        <form class="form">
            <div class="row">
                <div class="col-12">
                    <h3 class="mb-5">{{ $t('label.new_project') }}</h3>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.notebook') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.invoice_no') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.date') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.hour') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>

            </div>
            <div class="row mb-5">
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.customer_no') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.name') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.email') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.licensed_operator') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.currency') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.currency') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
            </div>

            <h3 class="mb-5">{{ $t('label.project_information') }}</h3>



            <div class="row mt-5">
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.project_name') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.project_manager_name') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.project_value') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.statement') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.project_start_date') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.project_end_date') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.country') }}</label>

                            <select type="text" id="buy_account" class="form-control rounded-1">
                                <option value=""></option>
                            </select>

                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.project_status') }}</label>

                            <select type="text" id="buy_account" class="form-control rounded-1">
                                <option value="">{{ $t('label.not_started') }}</option>
                                <option value="">{{ $t('label.in_progress') }}</option>
                                <option value="">{{ $t('label.completed') }}</option>
                                <option value="">{{ $t('label.cancelled') }}</option>
                            </select>

                        </div>
                    </div>
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
        </form>
    </div>
</template>

<style>
.header th {

    background-color: #F4FFF0 !important;

}

.btn-action {
    background-color: #F4FFF0 !important;
}
</style>