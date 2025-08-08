<template>

    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>
        <div class="d-flex align-items-center justify-content-end">
            <button class="btn btn-lg btn-outline-secondary me-3">{{ $t('buttons.cancel') }}</button>
            <div class="dropdown">
                <button class="btn btn-lg btn-main dropdown-toggle text-light" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {{ $t('buttons.save') }}
                </button>
                <ul class="dropdown-menu bg-main text-light">
                    <li><a class="dropdown-item" href="#">{{ $t('buttons.save&print') }}</a></li>
                </ul>
            </div>
        </div>
        <h3>{{ $t('label.chart_of_items') }}</h3>
        <ul class="list-unstyled mt-3 fs-3">
            <li class="mb-2">
                <i class="bi bi-plus-circle text-success"></i> {{ $t('label.expand_all') }}
            </li>
            <li class="mb-2">
                <i class="bi bi-dash-circle text-danger"></i> {{ $t('label.collapse_all') }}
            </li>
            <li class="mb-2">{{ $t('label.item_movements') }}</li>
            <li class="mb-2">{{ $t('label.item_notes') }}</li>
            <li class="mb-2">{{ $t('label.add_new_item') }}</li>
            <li class="mb-2">{{ $t('label.test') }}</li>
            <li class="mb-2">{{ $t('label.cancel') }}</li>
            <li class="mb-2">{{ $t('label.help') }}</li>
        </ul>
        <div class="img mt-5 mb-5">
            <img src="@/assets/chartOfAccounts.jpg" alt="chartOfAccounts" class="w-50 ">
        </div>
    </div>

</template>