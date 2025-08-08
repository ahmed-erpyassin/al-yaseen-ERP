<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>
        <div class="d-flex align-items-center justify-content-end">
            <button class="btn btn-lg btn-main me-3">{{
                $t('buttons.calculation')
            }}</button>
            <button class="btn btn-danger btn-lg">
                {{ $t('buttons.cancel') }}
            </button>

        </div>
        <div class="row">
            <div class="col-12">
                <h3 class="mb-5">{{ $t('label.manufacturing') }}</h3>
            </div>
            <h4>{{ $t('label.classified_accounts') }}</h4>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-check ">
                        <input type="checkbox" checked class="form-check-input rounded-circle" id="remember" />
                        <label class="form-check-label" for="remember">{{ $t('label.items_below_minimum') }}</label>
                    </div>
                    <div class="form-check ">
                        <input type="checkbox" checked class="form-check-input rounded-circle" id="remember" />
                        <label class="form-check-label" for="remember">{{ $t('label.items_below_reorder_point')
                        }}</label>
                    </div>
                    <div class="form-check ">
                        <input type="checkbox" checked class="form-check-input rounded-circle" id="remember" />
                        <label class="form-check-label" for="remember">{{ $t('label.items_below_zero') }}</label>
                    </div>
                    <div class="form-check ">
                        <input type="checkbox" checked class="form-check-input rounded-circle" id="remember" />
                        <label class="form-check-label" for="remember">{{ $t('label.all_items') }}</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-check text-primary">
                        <input type="checkbox" checked class="form-check-input rounded-circle" id="remember" />
                        <label class="form-check-label" for="remember">{{ $t('label.default_item_warehouse') }}</label>
                    </div>
                </div>
            </div>
            <p class="mt-3">{{ $t('label.item') }}</p>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-3">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.from') }}</label>

                                <input type="text" id="from" class="form-control rounded-1" />

                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="to" class="form-label">{{ $t('label.to') }}</label>

                                <input type="text" id="to" class="form-control rounded-1" />

                            </div>
                        </div>
                    </div>
                </div>
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="manufacture_items_from_warehouse" class="form-label">{{
                            $t('label.manufacture_items_from_warehouse') }}</label>

                        <input type="text" id="manufacture_items_from_warehouse" class="form-control rounded-1" />

                    </div>
                </div>
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="raw_materials_warehouse" class="form-label">{{ $t('label.raw_materials_warehouse')
                            }}</label>

                        <input type="text" id="raw_materials_warehouse" class="form-control rounded-1" />

                    </div>
                </div>
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="date" class="form-label">{{ $t('label.date') }}</label>

                        <input type="date" id="date" class="form-control rounded-1" />

                    </div>
                </div>
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="transaction_date" class="form-label">{{ $t('label.transaction_date') }}</label>

                        <input type="date" id="transaction_date" class="form-control rounded-1" />

                    </div>
                </div>
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="cost_calculation_based_on" class="form-label">{{ $t('label.cost_calculation_based_on') }}</label>

                        <select name="cost_calculation_based_on" id="cost_calculation_based_on" class="form-control">
                            <option value="">{{ $t('label.no_calculation') }}</option>
                            <option value="">{{ $t('label.purchase_price_1') }}</option>
                            <option value="">{{ $t('label.purchase_price_2') }}</option>
                            <option value="">{{ $t('label.purchase_price_3') }}</option>
                            <option value="">{{ $t('label.first_selling_price') }}</option>
                            <option value="">{{ $t('label.second_selling_price') }}</option>
                            <option value="">{{ $t('label.third_selling_price') }}</option>
                        </select>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

export default {

    name: "AccountsListComponent",
    data() {

        return {
        }

    }

}

</script>
