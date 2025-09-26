<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>
        <div class="d-flex align-items-center justify-content-end">
            <button class="btn btn-lg btn-success me-3 ms-3" type="button">
                {{ $t('buttons.check') }}
            </button>
            <button class="btn btn-lg btn-danger" type="button">
                {{ $t('buttons.cancel') }}
            </button>

        </div>
        <h4>{{ $t('label.file_check_and_maintenance') }}</h4>
        <form class="form">
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="reindex_data_files" />
                <label class="form-check-label" for="reindex_data_files">{{ $t('label.reindex_data_files')
                }}</label>
            </div>
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="defragment_data" />
                <label class="form-check-label" for="defragment_data">{{ $t('label.defragment_data')
                }}</label>
            </div>
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="recalculate_account_balances" />
                <label class="form-check-label" for="recalculate_account_balances">{{ $t('label.recalculate_account_balances')
                }}</label>
            </div>
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="recalculate_balances_customers_suppliers_employees" />
                <label class="form-check-label" for="recalculate_balances_customers_suppliers_employees">{{ $t('label.recalculate_balances_customers_suppliers_employees')
                }}</label>
            </div>
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="rebuild_transactions_file_customers_suppliers_employees" />
                <label class="form-check-label" for="rebuild_transactions_file_customers_suppliers_employees">{{ $t('label.rebuild_transactions_file_customers_suppliers_employees')
                }}</label>
            </div>
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="recalculate_item_balances" />
                <label class="form-check-label" for="recalculate_item_balances">{{ $t('label.recalculate_item_balances')
                }}</label>
            </div>
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="rebuild_item_data_file" />
                <label class="form-check-label" for="rebuild_item_data_file">{{ $t('label.rebuild_item_data_file')
                }}</label>
            </div>
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="check_file_relationships" />
                <label class="form-check-label" for="check_file_relationships">{{ $t('label.check_file_relationships')
                }}</label>
            </div>
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="check_transaction_totals" />
                <label class="form-check-label" for="check_transaction_totals">{{ $t('label.check_transaction_totals')
                }}</label>
            </div>
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="fix_file_relationships" />
                <label class="form-check-label" for="fix_file_relationships">{{ $t('label.fix_file_relationships')
                }}</label>
            </div>
        </form>

    </div>
</template>

<script>

export default {
    name: "CurrencyRevaluationComponent",
    data() {

        return {

        };

    }
}

</script>

<style></style>