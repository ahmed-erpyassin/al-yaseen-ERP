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
            <div class="row">
                <div class="col-12">
                    <h3>{{ $t('label.employee_data') }}</h3>
                </div>
                <div class="col-md-2 mt-4">

                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="employee_number" class="form-label">{{ $t('label.employee_number') }}</label>

                            <input type="text" id="employee_number" class="form-control rounded-1" />

                        </div>
                    </div>

                </div>
                <div class="col-md-7 mt-4">

                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="surname" class="form-label">{{ $t('label.surname') }}</label>

                            <input type="text" id="surname" class="form-control rounded-1" />

                        </div>
                    </div>

                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="firstname" class="form-label">{{ $t('label.first_name') }}</label>

                            <input type="text" id="firstname" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="secondname" class="form-label">{{ $t('label.second_name') }}</label>

                            <input type="text" id="secondname" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="thirdname" class="form-label">{{ $t('label.third_name') }}</label>

                            <input type="text" id="thirdname" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="mobile1" class="form-label">{{ $t('label.mobile_1') }}</label>

                            <input type="text" id="mobile1" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="mobile2" class="form-label">{{ $t('label.mobile_2') }}</label>

                            <input type="text" id="mobile2" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="email" class="form-label">{{ $t('label.email') }}</label>

                            <input type="email" id="email" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="date_birth" class="form-label">{{ $t('label.date_of_birth') }}</label>

                            <input type="date" id="date_birth" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="address" class="form-label">{{ $t('label.address') }}</label>

                            <input type="text" id="address" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="government_id" class="form-label">{{ $t('label.government_id') }}</label>

                            <input type="text" id="government_id" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="nid_number" class="form-label">{{ $t('label.nid_number') }}</label>

                            <input type="text" id="nid_number" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="gender" class="form-label">{{ $t('label.gender') }}</label>

                            <input type="text" id="gender" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="wifes_count" class="form-label">{{ $t('label.number_of_wifes') }}</label>

                            <input type="text" id="wifes_count" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="children_count" class="form-label">{{ $t('label.number_of_children') }}</label>

                            <input type="text" id="children_count" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="children_count" class="form-label">{{ $t('label.number_of_dependents') }}</label>

                            <input type="text" id="children_count" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="children_count" class="form-label">{{ $t('label.number_of_students') }}</label>

                            <input type="text" id="children_count" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 d-flex align-items-center">
                            <div class="form-check mb-3  me-3">
                                <input type="checkbox" checked class="form-check-input rounded-circle" id="remember" />
                                <label class="form-check-label" for="remember">{{ $t('label.driver') }}</label>
                            </div>
                            <div class="form-check mb-3">
                                <input type="checkbox" checked class="form-check-input rounded-circle" id="remember" />
                                <label class="form-check-label" for="remember">{{ $t('label.sales_representative') }}</label>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="car_number" class="form-label">{{ $t('label.car_number') }}</label>

                            <input type="text" id="car_number" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="job" class="form-label">{{ $t('label.job') }}</label>

                            <input type="text" id="job" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="job" class="form-label">{{ $t('label.date_of_appointment') }}</label>

                            <input type="text" id="job" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="job" class="form-label">{{ $t('label.employee_manger') }}</label>

                            <input type="text" id="job" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="job" class="form-label">{{ $t('label.employee_id') }}</label>

                            <input type="text" id="job" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="job" class="form-label">{{ $t('label.job_title') }}</label>

                            <input type="text" id="job" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="job" class="form-label">{{ $t('label.category') }}</label>

                            <input type="text" id="job" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="job" class="form-label">{{ $t('label.sallery') }}</label>

                            <input type="text" id="job" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="job" class="form-label">{{ $t('label.billing_rate') }}</label>

                            <input type="text" id="job" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="job" class="form-label">{{ $t('label.monthly_discount') }}</label>

                            <input type="text" id="job" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>

                <div class="col-md-8 mb-5">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="currency" class="form-label">{{ $t('label.currency')
                                }}</label>
                            <select name="currency" id="currency" class="form-control">
                                <option value="">$ USD</option>
                            </select>

                        </div>
                    </div>
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
        </form>
    </div>
</template>