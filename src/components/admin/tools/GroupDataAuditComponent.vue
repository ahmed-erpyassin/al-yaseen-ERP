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
        <h4 class="mb-5">{{ $t('label.group_data_audit') }}</h4>
        <form class="form">
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="check_transactions_outside_fiscal_period" />
                <label class="form-check-label" for="check_transactions_outside_fiscal_period">{{ $t('label.check_transactions_outside_fiscal_period')
                }}</label>
            </div>
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="compare_invoice_date_with_shipment_date" />
                <label class="form-check-label" for="compare_invoice_date_with_shipment_date">{{ $t('label.compare_invoice_date_with_shipment_date')
                }}</label>
            </div>
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="compare_invoice_date_with_receipts_payments_date" />
                <label class="form-check-label" for="compare_invoice_date_with_receipts_payments_date">{{ $t('label.compare_invoice_date_with_receipts_payments_date')
                }}</label>
            </div>
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="check_department_supplier_budget_number" />
                <label class="form-check-label" for="check_department_supplier_budget_number">{{ $t('label.check_department_supplier_budget_number')
                }}</label>
            </div>
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="check_store_number" />
                <label class="form-check-label" for="check_store_number">{{ $t('label.check_store_number')
                }}</label>
            </div>
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="check_identity_number_validity" />
                <label class="form-check-label" for="check_identity_number_validity">{{ $t('label.check_identity_number_validity')
                }}</label>
            </div>
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="compare_checks_total_with_account_balance" />
                <label class="form-check-label" for="compare_checks_total_with_account_balance">{{ $t('label.compare_checks_total_with_account_balance')
                }}</label>
            </div>
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="compare_accounts_with_their_transactions" />
                <label class="form-check-label" for="compare_accounts_with_their_transactions">{{ $t('label.compare_accounts_with_their_transactions')
                }}</label>
            </div>
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="compare_accounts_with_their_balances" />
                <label class="form-check-label" for="compare_accounts_with_their_balances">{{ $t('label.compare_accounts_with_their_balances')
                }}</label>
            </div>
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="compare_income_expenses_with_invoices" />
                <label class="form-check-label" for="compare_income_expenses_with_invoices">{{ $t('label.compare_income_expenses_with_invoices')
                }}</label>
            </div>
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="check_vat_in_invoices" />
                <label class="form-check-label" for="check_vat_in_invoices">{{ $t('label.check_vat_in_invoices')
                }}</label>
            </div>
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="check_debit_only_accounts_turned_credit" />
                <label class="form-check-label" for="check_debit_only_accounts_turned_credit">{{ $t('label.check_debit_only_accounts_turned_credit')
                }}</label>
            </div>
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="check_account_transactions_in_other_currencies" />
                <label class="form-check-label" for="check_account_transactions_in_other_currencies">{{ $t('label.check_account_transactions_in_other_currencies')
                }}</label>
            </div>
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="check_account_balance_equality_with_group_currency" />
                <label class="form-check-label" for="check_account_balance_equality_with_group_currency">{{ $t('label.check_account_balance_equality_with_group_currency')
                }}</label>
            </div>
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="check_incorrect_currency_rate_in_transactions" />
                <label class="form-check-label" for="check_incorrect_currency_rate_in_transactions">{{ $t('label.check_incorrect_currency_rate_in_transactions')
                }}</label>
            </div>
            <div class="form-check mb-3 ">
                <input checked type="checkbox" class="form-check-input rounded-circle" id="check_trading_accounts_defined_in_group_or_items" />
                <label class="form-check-label" for="check_trading_accounts_defined_in_group_or_items">{{ $t('label.check_trading_accounts_defined_in_group_or_items')
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