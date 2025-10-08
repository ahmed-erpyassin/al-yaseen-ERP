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
            <h3>{{ $t('label.create_entry') }}</h3>
            <div class="row mt-5">

                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="customer_number" class="form-label">{{ $t('label.entry_number') }}</label>

                                <input type="text" id="customer_number" class="form-control rounded-1" />

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="company_name" class="form-label">{{ $t('label.entry_date') }}</label>

                            <input type="text" id="company_name" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="first_name" class="form-label">{{ $t('label.hour') }}</label>

                            <input type="text" id="first_name" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="last_name" class="form-label">{{ $t('label.second_date') }}</label>

                            <input type="text" id="last_name" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="mobile" class="form-label">{{ $t('label.document_number') }}</label>

                            <input type="text" id="mobile
                            " class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="phone" class="form-label">{{ $t('label.entry_description') }}</label>

                            <input type="text" id="phone" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="address_1" class="form-label">{{ $t('label.reference') }}</label>

                            <input type="text" id="address_1" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>


            </div>
            <h4>{{ $t('label.entry_information') }}</h4>
            <div class="table-responsive">
                <table class="table table-bordered text-center align-middle">
                    <thead class="header">
                        <tr>
                            <th>#</th>
                            <th>{{ $t('label.account_number') }}</th>
                            <th>{{ $t('label.account_name') }}</th>
                            <th>{{ $t('label.balance_statement') }}</th>
                            <th>{{ $t('label.debit') }}</th>
                            <th>{{ $t('label.credit') }}</th>
                            <th>{{ $t('label.currency_price') }}</th>
                            <th>{{ $t('label.account_rate') }}</th>
                            <th>{{ $t('label.account_amount') }}</th>
                            <th>{{ $t('label.account_statement') }}</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody form">
                        <tr>
                            <td><input type="number" class="form-control border-0 rounded-0"></td>
                            <td><input type="number" class="form-control border-0 rounded-0"></td>
                            <td><input type="text" class="form-control border-0 rounded-0"></td>
                            <td><input type="text" class="form-control border-0 rounded-0"></td>
                            <td><input type="text" class="form-control border-0 rounded-0"></td>
                            <td><input type="number" class="form-control border-0 rounded-0"></td>
                            <td><input type="number" class="form-control border-0 rounded-0" readonly></td>
                            <td><input type="number" class="form-control border-0 rounded-0" readonly></td>
                            <td><input type="number" class="form-control border-0 rounded-0" readonly></td>
                            <td><input type="number" class="form-control border-0 rounded-0" readonly></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="d-flex gap-2 justify-content-end">
                <button class="btn  btn-action">{{ $t('actions.add_row') }}</button>
                <button class="btn  btn-action">{{ $t('actions.remove_row') }}</button>
            </div>
            <div class="row mt-3">
                <div class="col-md-2">
                    <p class="mb-0 text-main">{{ $t('label.in_account_currency') }}</p>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="address_1" class="form-label">{{ $t('label.total_credit') }}</label>

                            <input type="text" id="address_1" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="address_1" class="form-label">{{ $t('label.total_debit') }}</label>

                            <input type="text" id="address_1" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <p class="mb-0 text-main">{{ $t('label.in_entry_currency') }}</p>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="address_1" class="form-label">{{ $t('label.total_credit') }}</label>

                            <input type="text" id="address_1" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="address_1" class="form-label">{{ $t('label.total_debit') }}</label>

                            <input type="text" id="address_1" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<style>
.box-attachments {
    height: 162px;
    border: 1px dashed #767171;
    border-radius: 3px;
}

.box-attachments i {
    font-size: 92px;
}

.header th {

    background-color: #F4FFF0 !important;

}

.btn-action {
    background-color: #F4FFF0 !important;
}
</style>
