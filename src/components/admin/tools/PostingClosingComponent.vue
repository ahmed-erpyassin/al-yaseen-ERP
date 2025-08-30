<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>
        <div class="d-flex align-items-center justify-content-end">
            <button class="btn btn-lg btn-success me-3 ms-3" type="button">
                {{ $t('buttons.calculation') }}
            </button>
            <button class="btn btn-lg btn-danger" type="button">
                {{ $t('buttons.cancel') }}
            </button>

        </div>
        <div class="container p-4">
            <h5 class="mb-4">{{ $t('label.posting_closing') }}</h5>
            <form class="form">

                <div class="row">
                    <div class="col-md-6">
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="closeAccounting">
                            <label class="form-check-label text-primary" for="closeAccounting">
                                {{ $t('label.close_accounting') }}
                            </label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="closeStock">
                            <label class="form-check-label text-success" for="closeStock">
                                {{ $t('label.close_accounting') }}
                            </label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="closeSend">
                            <label class="form-check-label" for="closeSend">
                                {{ $t('label.close_send') }}
                            </label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="closeSale">
                            <label class="form-check-label" for="closeSale">
                                {{ $t('label.close_sale') }}
                            </label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="closePurchase">
                            <label class="form-check-label" for="closePurchase">
                                إغلاق فواتير الشراء
                            </label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="closeReceipt">
                            <label class="form-check-label text-primary" for="closeReceipt">
                                {{ $t('label.close_receipt') }}
                            </label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="closePayment">
                            <label class="form-check-label text-primary" for="closePayment">
                                {{ $t('label.close_payment') }}
                            </label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="closeCash">
                            <label class="form-check-label text-primary" for="closeCash">
                                {{ $t('label.close_cash') }}
                            </label>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="closeEntries">
                            <label class="form-check-label text-primary" for="closeEntries">
                                {{ $t('label.close_entries') }}
                            </label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="closeIncoming">
                            <label class="form-check-label" for="closeIncoming">
                                {{ $t('label.close_incoming') }}
                            </label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="closeSaleReturn">
                            <label class="form-check-label" for="closeSaleReturn">
                                {{ $t('label.close_sale_return') }}
                            </label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="closePurchaseReturn">
                            <label class="form-check-label" for="closePurchaseReturn">
                                {{ $t('label.close_purchase_return') }}
                            </label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="closeMultiReceipt">
                            <label class="form-check-label text-primary" for="closeMultiReceipt">
                                {{ $t('label.close_multi_receipt') }}
                            </label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="closeMultiPayment">
                            <label class="form-check-label text-primary" for="closeMultiPayment">
                                {{ $t('label.close_multi_payment') }}
                            </label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="closeExpenses">
                            <label class="form-check-label" for="closeExpenses">
                                {{ $t('label.close_expenses') }}
                            </label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="closeNotifications">
                            <label class="form-check-label" for="closeNotifications">
                                {{ $t('label.close_notifications') }}
                            </label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="closePayroll">
                            <label class="form-check-label text-warning" for="closePayroll">
                                {{ $t('label.close_payroll') }}
                            </label>
                        </div>
                    </div>
                </div>

                <div class="row mt-4">
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
                </div>
            </form>
        </div>


    </div>
</template>
