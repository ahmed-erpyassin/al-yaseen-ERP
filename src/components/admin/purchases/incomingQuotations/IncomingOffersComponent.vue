<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>
        <div class="d-flex align-items-center justify-content-end">
            <router-link :to="{ name: 'admin.outgoing-offers.create' }" class="btn btn-lg btn-main me-3">{{ $t('buttons.create') }}</router-link>
            <button class="btn btn-lg btn-outline-danger" type="button">
                {{ $t('buttons.delete') }}
            </button>

        </div>
        <div class="row">
            <div class="col-12">
                <h3 class="mb-5">{{ $t('label.incoming_offers') }}</h3>
            </div>
        </div>
        <div class="d-flex align-items-center actions mb-3">
            <div class='search me-2 mb-3'>
                <i class="bi bi-search me-2"></i>
                <span class="text-main">{{ $t('label.search_supplier') }}</span>
            </div>
            <div class='edit me-4 mb-3'>
                <i class="bi bi-pencil me-2"></i>
                <span class="text-main">{{ $t('label.edit') }}</span>
            </div>
            <div class="dropdown mb-3">
                <i class="bi bi-gear" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                </i>
                <ul class="dropdown-menu align-center rounded-0 p-2" style="width: 250px;">
                    <li>
                        <div class="form-check"><input class="form-check-input" type="checkbox" checked id="col0"><label
                                class="form-check-label" for="col0">{{ $t('label.offer_number') }}</label></div>
                    </li>
                    <li>
                        <div class="form-check"><input class="form-check-input" type="checkbox" checked id="col1"><label
                                class="form-check-label" for="col1">{{ $t('label.supplier_name') }}</label></div>
                    </li>
                    <li>
                        <div class="form-check"><input class="form-check-input" type="checkbox" checked id="col2"><label
                                class="form-check-label" for="col2">{{ $t('label.licensed_operator') }}</label></div>
                    </li>
                    <li>
                        <div class="form-check"><input class="form-check-input" type="checkbox" checked id="col3"><label
                                class="form-check-label" for="col3">{{ $t('label.amount') }}</label></div>
                    </li>
                    <li>
                        <div class="form-check"><input class="form-check-input" type="checkbox" checked id="col4"><label
                                class="form-check-label" for="col4">{{ $t('label.currency') }}</label></div>
                    </li>
                    <li>
                        <div class="form-check"><input class="form-check-input" type="checkbox" checked id="col5"><label
                                class="form-check-label" for="col5">{{ $t('label.date') }}</label></div>
                    </li>
                    <li>
                        <div class="form-check"><input class="form-check-input" type="checkbox" checked id="col6"><label
                                class="form-check-label" for="col6">{{ $t('label.mobile') }}</label></div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th>{{ $t('label.offer_number') }}</th>
                        <th>{{ $t('label.supplier_name') }}</th>
                        <th>{{ $t('label.licensed_operator') }}</th>
                        <th>{{ $t('label.amount') }}</th>
                        <th>{{ $t('label.currency') }}</th>
                        <th>{{ $t('label.date') }}</th>
                        <th>{{ $t('label.mobile') }}</th>
                    </tr>
                </thead>
                <tbody class="table-body form">
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

        </div>

    </div>
</template>

<style>
.header th {

    background-color: #F4FFF0 !important;

}

.btn-action {
    background-color: #F4FFF0 !important;
}

.actions i {
    font-size: 30px;
}

.actions span {
    font-size: 24px;
}

.dropdown .show {
    color: #1D7342
}

.form-check-input:checked[type=checkbox] {
    border-radius: 50%;
    background-color: #1D7342 !important;
}
.pages p {
    font-size: 25px;
}
</style>