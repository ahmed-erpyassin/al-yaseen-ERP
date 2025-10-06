<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i>{{ $t('company_undefined') }}</h1>

        <div class="d-flex align-items-center justify-content-end mb-4">
            <button type="button" class="btn btn-lg btn-outline-secondary me-3">
                {{ $t('buttons.cancel') }}
            </button>
            <button type="button" class="btn btn-lg btn-success">
                {{ $t('buttons.save') }}
            </button>
        </div>

        <form class="form">
            <div class="row">
                <div class="col-12">
                    <h3 class="mb-5">{{ $t('order.title') }}</h3>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="notebook" class="form-label">{{ $t('fields.notebook') }}</label>
                            <input type="text" id="notebook" class="form-control rounded-1" />
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="invoice_no" class="form-label">{{ $t('fields.invoice_no') }}</label>
                            <input type="text" id="invoice_no" class="form-control rounded-1" />
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="date" class="form-label">{{ $t('fields.date') }}</label>
                            <input type="text" id="date" class="form-control rounded-1" />
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="hour" class="form-label">{{ $t('fields.hour') }}</label>
                            <input type="text" id="hour" class="form-control rounded-1" />
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="due_date" class="form-label">{{ $t('fields.due_date') }}</label>
                            <input type="text" id="due_date" class="form-control rounded-1" />
                        </div>
                    </div>
                </div>

            </div>

            <div class="row mb-5">
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="customer_no" class="form-label">{{ $t('fields.customer_no') }}</label>
                            <input type="text" id="customer_no" class="form-control rounded-1" />
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="name" class="form-label">{{ $t('fields.name') }}</label>
                            <input type="text" id="name" class="form-control rounded-1" />
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="email" class="form-label">{{ $t('fields.email') }}</label>
                            <input type="text" id="email" class="form-control rounded-1" />
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="licensed_operator" class="form-label">{{ $t('fields.licensed_operator')
                                }}</label>
                            <input type="text" id="licensed_operator" class="form-control rounded-1" />
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="currency" class="form-label">{{ $t('fields.currency') }}</label>
                            <input type="text" id="currency" class="form-control rounded-1" />
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="currency_price" class="form-label">{{ $t('fields.currency_price') }}</label>
                            <input type="text" id="currency_price" class="form-control rounded-1" />
                        </div>
                    </div>
                </div>
            </div>

            <h3 class="mb-5">{{ $t('order.table.title') }}</h3>

            <div class="table-responsive">
                <table class="table table-bordered text-center align-middle">
                    <thead class="header">
                        <tr>
                            <th>{{ $t('order.table.number') }}</th>
                            <th>{{ $t('order.table.item_no') }}</th>
                            <th>{{ $t('order.table.info') }}</th>
                            <th>{{ $t('order.table.unit') }}</th>
                            <th>{{ $t('order.table.quantity') }}</th>
                            <th>{{ $t('order.table.price') }}</th>
                            <th>{{ $t('order.table.total') }}</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody form">
                        <tr>
                            <td><input type="number" class="form-control border-0 rounded-0" /></td>
                            <td><input type="number" class="form-control border-0 rounded-0" /></td>
                            <td><input type="text" class="form-control border-0 rounded-0" /></td>
                            <td><input type="text" class="form-control border-0 rounded-0" /></td>
                            <td><input type="text" class="form-control border-0 rounded-0" /></td>
                            <td><input type="number" class="form-control border-0 rounded-0" /></td>
                            <td><input type="number" class="form-control border-0 rounded-0" readonly /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="d-flex gap-2 justify-content-end">
                <button class="btn btn-action">{{ $t('actions.add_row') }}</button>
                <button class="btn btn-action">{{ $t('actions.remove_row') }}</button>
            </div>

            <div class="col-md-9 mt-5">
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="notes" class="form-label">{{ $t('order.notes') }}</label>
                        <textarea name="notes" id="notes" rows="3" class="form-control"></textarea>
                    </div>
                </div>
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="attachments" class="form-label">{{ $t('order.attachments') }}</label>
                        <div class="box-attachments d-flex align-items-center justify-content-center">
                            <div class="text-center">
                                <i class="bi bi-image"></i>
                                <p class="small">{{ $t('order.attachment_note') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-5">
                <div class="col-md-2">
                    <div class="item mb-4">
                        <label class="form-label">{{ $t('order.cash') }}</label>
                        <input type="text" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <label class="form-label">{{ $t('order.check') }}</label>
                        <input type="text" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <label class="form-label">{{ $t('order.currency_cash') }}</label>
                        <input type="text" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <label class="form-label">{{ $t('order.discount') }}</label>
                        <input type="text" class="form-control rounded-1" />
                    </div>
                    <div class="item mb-4">
                        <label class="form-label">{{ $t('order.subtotal') }}</label>
                        <input type="text" class="form-control rounded-1" />
                    </div>
                    <div class="item mb-4">
                        <div class="row">
                            <div class="col-md-4">
                                <label class="form-label">{{ $t('order.vat_ratio') }}</label>
                                <input type="text" class="form-control rounded-1" />
                            </div>
                            <div class="col-md-8">
                                <label class="form-label">{{ $t('order.vat') }}</label>
                                <input type="text" class="form-control rounded-1" />
                            </div>
                        </div>
                    </div>
                    <div class="item mb-4">
                        <label class="form-label">{{ $t('order.total_amount') }}</label>
                        <input type="text" class="form-control rounded-1" />
                    </div>
                    <div class="item mb-4">
                        <label class="form-label">{{ $t('order.remaining') }}</label>
                        <input type="text" class="form-control rounded-1" />
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<style>
.header th {
    background-color: #F4FFF0 !important;
}

.btn-action {
    background-color: #F4FFF0 !important;
}
</style>
