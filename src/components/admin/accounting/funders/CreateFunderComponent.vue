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
                <h3 class="mb-5">{{ $t('label.add_funder') }}</h3>
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
                    <div class="col-md-2">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="manager" class="form-label">{{ $t('label.manager') }}</label>

                                    <input type="text" id="manager" class="form-control rounded-1" />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="address" class="form-label">{{ $t('label.address') }}</label>

                                    <input type="text" id="address" class="form-control rounded-1" />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="work_phone" class="form-label">{{ $t('label.work_phone') }}</label>

                                    <input type="text" id="work_phone" class="form-control">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="fax" class="form-label">{{ $t('label.fax') }}</label>

                                    <input type="text" id="fax" class="form-control">

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
                                    <label for="home_phone" class="form-label">{{ $t('label.home_phone') }}</label>

                                    <input type="text" id="home_phone" class="form-control">

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="statement" class="form-label">{{ $t('label.statement') }}</label>

                                    <input type="text" id="statement" class="form-control">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="statement_en" class="form-label">{{ $t('label.statement_en') }}</label>

                                    <input type="text" id="statement_en" class="form-control">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="belongs_to_values" class="form-label">{{ $t('label.belongs_to_values')
                                        }}</label>

                                    <select name="belongs_to_values" id="belongs_to_values"
                                        class="form-control"></select>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="funder" class="form-label">{{ $t('label.funder') }}</label>

                                    <select name="funder" id="funder" class="form-control"></select>

                                </div>
                            </div>
                        </div>
                    </div>
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
                <div class="row">
                    <div class="col-md-3">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="file_open_start" class="form-label">{{ $t('label.file_open_start')
                                        }}</label>

                                    <input type="text" id="file_open_start" class="form-control">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-check  ">
                            <input type="checkbox" checked class="form-check-input rounded-circle"
                                id="active" />
                            <label class="form-check-label" for="active">{{
                                $t('label.active') }}</label>
                        </div>
                    </div>
                </div>
                <div class="row">
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