<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>
        <div class="d-flex align-items-center justify-content-end">
            <button class="btn btn-lg btn-success me-3 ms-3" type="button">
                {{ $t('buttons.copy') }}
            </button>
            <button class="btn btn-lg btn-danger" type="button">
                {{ $t('buttons.cancel') }}
            </button>
        </div>

        <div class="row">
            <div class="col-12">
                <h3 class="mb-5">{{ $t('label.copy_accounts_and_items_from_group') }}</h3>
                <p>{{ $t('label.source_group') }}</p>
            </div>
        </div>
        <form class="form">
            <div class="row mb-5">
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="main_group_name" class="form-label">{{ $t('label.main_group_name') }}</label>
                            <input type="text" id="main_group_name" class="form-control rounded-1" />
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="sub_group_name" class="form-label">{{ $t('label.sub_group_name') }}</label>
                            <input type="text" id="sub_group_name" class="form-control rounded-1" />
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="fiscal_year" class="form-label">{{ $t('label.fiscal_year') }}</label>
                            <input type="text" id="fiscal_year" class="form-control rounded-1" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row pt-3 pb-3" style="border-bottom: 1px solid #ccc;">
                <div class="col-md-6">
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="sales_invoices" />
                        <label class="form-check-label" for="sales_invoices">{{ $t('label.sales_invoices')
                            }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle"
                            id="sales_return_invoices" />
                        <label class="form-check-label" for="sales_return_invoices">{{ $t('label.sales_return_invoices')
                        }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="service_invoices" />
                        <label class="form-check-label" for="service_invoices">{{ $t('label.service_invoices')
                        }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="debit_notes" />
                        <label class="form-check-label" for="debit_notes">{{ $t('label.debit_notes')
                        }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="copy_customs_data" />
                        <label class="form-check-label" for="copy_customs_data">{{ $t('label.copy_customs_data')
                        }}</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="purchase_invoices" />
                        <label class="form-check-label" for="purchase_invoices">{{ $t('label.purchase_invoices')
                            }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle"
                            id="purchase_return_invoices" />
                        <label class="form-check-label" for="purchase_return_invoices">{{
                            $t('label.purchase_return_invoices')
                        }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="expense_invoices" />
                        <label class="form-check-label" for="expense_invoices">{{ $t('label.expense_invoices')
                        }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="credit_notes" />
                        <label class="form-check-label" for="credit_notes">{{ $t('label.credit_notes')
                        }}</label>
                    </div>
                </div>

            </div>
            <div class="row pt-3 pb-3" style="border-bottom: 1px solid #ccc;">
                <div class="col-12">
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle"
                            id="salaries_and_wages" />
                        <label class="form-check-label" for="salaries_and_wages">{{ $t('label.salaries_and_wages')
                        }}</label>
                    </div>
                </div>
            </div>
            <div class="row pt-3 pb-3" style="border-bottom: 1px solid #ccc;">
                <div class="col-6">
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="outgoing_orders" />
                        <label class="form-check-label" for="outgoing_orders">{{ $t('label.outgoing_orders')
                        }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle"
                            id="outgoing_quotations" />
                        <label class="form-check-label" for="outgoing_quotations">{{ $t('label.outgoing_quotations')
                        }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="item_orders" />
                        <label class="form-check-label" for="item_orders">{{ $t('label.item_orders')
                        }}</label>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="incoming_orders" />
                        <label class="form-check-label" for="incoming_orders">{{ $t('label.incoming_orders')
                        }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle"
                            id="incoming_quotations" />
                        <label class="form-check-label" for="incoming_quotations">{{ $t('label.incoming_quotations')
                        }}</label>
                    </div>

                </div>
            </div>
            <div class="row pt-3 pb-3" style="border-bottom: 1px solid #ccc;">
                <div class="col-md-6">
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle"
                            id="outgoing_shipments" />
                        <label class="form-check-label" for="outgoing_shipments">{{ $t('label.outgoing_shipments')
                        }}</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle"
                            id="incoming_shipments" />
                        <label class="form-check-label" for="incoming_shipments">{{ $t('label.incoming_shipments')
                            }}</label>
                    </div>
                </div>
            </div>
            <div class="row pt-3 pb-3" style="border-bottom: 1px solid #ccc;">
                <div class="col-md-12">
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle"
                            id="inventory_transactions" />
                        <label class="form-check-label" for="inventory_transactions">{{
                            $t('label.inventory_transactions')
                            }}</label>
                    </div>
                </div>
            </div>
            <div class="row pt-3 pb-3" style="border-bottom: 1px solid #ccc;">
                <div class="col-md-6">
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="receipt_vouchers" />
                        <label class="form-check-label" for="receipt_vouchers">{{ $t('label.receipt_vouchers')
                        }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle"
                            id="multiple_receipt_vouchers" />
                        <label class="form-check-label" for="multiple_receipt_vouchers">{{
                            $t('label.multiple_receipt_vouchers')
                        }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="cash_transactions" />
                        <label class="form-check-label" for="cash_transactions">{{ $t('label.cash_transactions')
                        }}</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="payment_vouchers" />
                        <label class="form-check-label" for="payment_vouchers">{{ $t('label.payment_vouchers')
                            }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle"
                            id="multiple_payment_vouchers" />
                        <label class="form-check-label" for="multiple_payment_vouchers">{{
                            $t('label.multiple_payment_vouchers')
                        }}</label>
                    </div>
                </div>
            </div>
            <div class="row pt-3 pb-3" style="border-bottom: 1px solid #ccc;">
                <div class="col-md-6">
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle"
                            id="accounting_entries" />
                        <label class="form-check-label" for="accounting_entries">{{ $t('label.accounting_entries')
                        }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="copy_budgets" />
                        <label class="form-check-label" for="copy_budgets">{{ $t('label.copy_budgets')
                        }}</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle"
                            id="copy_journal_vouchers" />
                        <label class="form-check-label" for="copy_journal_vouchers">{{ $t('label.copy_journal_vouchers')
                            }}</label>
                    </div>
                </div>
            </div>
            <div class="row mt-5 mb-5">
                <div class="col-md-6">


                    <div class="item mb-4" style="margin-top: 40px;">
                        <div class="mb-3 position-relative">
                            <label for="notebook" class="form-label">{{ $t('label.notebook') }}</label>

                            <input type="text" id="notebook" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row ">
                        <h5 class="mb-3">{{ $t('label.numbers') }}</h5>
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
                    <div class="row ">
                        <h5 class="mb-3">{{ $t('label.duration') }}</h5>
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
                    <div class="row ">
                        <h5 class="mb-3">{{ $t('label.accounts') }}</h5>
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
                    <div class="row ">
                        <h5 class="mb-3">{{ $t('label.department') }}</h5>
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
                    <div class="row ">
                        <h5 class="mb-3">{{ $t('label.funder') }}</h5>
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
                    <div class="row ">
                        <h5 class="mb-3">{{ $t('label.primary_classification') }}</h5>
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
                    <div class="row ">
                        <h5 class="mb-3">{{ $t('label.secondary_classification') }}</h5>
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
                        <label for="user_transactions" class="col-sm-4 col-form-label">{{ $t('label.user_transactions')
                        }}</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="user_transactions">
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row mb-3">
                        <label for="reference" class="col-sm-2 col-form-label">{{ $t('label.reference') }}</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="reference">
                        </div>
                    </div>
                </div>

                <div class="col-12 mt-4">
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="renumber_outgoing_documents" />
                        <label class="form-check-label" for="renumber_outgoing_documents">{{ $t('label.renumber_outgoing_documents')
                        }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="do_not_copy_existing_documents" />
                        <label class="form-check-label" for="do_not_copy_existing_documents">{{ $t('label.do_not_copy_existing_documents')
                            }}</label>
                    </div>
                </div>

            </div>
        </form>
    </div>
</template>