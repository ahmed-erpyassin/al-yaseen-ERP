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
                </ul>
            </div>
        </div>

        <form class="form">
            <h3>{{ $t('label.add_cash_movement') }}</h3>

            <div class="row mt-5">
                <div class="col-md-3">
                    <div class="mb-3 position-relative">
                        <label for="warehouse_number" class="form-label">{{ $t('label.movement_number') }}</label>
                        <input type="text" id="warehouse_number" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3 position-relative">
                        <label for="information" class="form-label">{{ $t('label.movement_date') }}</label>
                        <input type="text" id="information" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3 position-relative">
                        <label for="warehousekeeper" class="form-label">{{ $t('label.movement_time')
                            }}</label>
                        <input type="text" id="warehousekeeper" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="mb-3 position-relative">
                        <label for="movement_type" class="form-label">{{
                            $t('label.movement_type') }}</label>
                        <select name="movement_type" id="movement_type" class="form-control">
                            <option value="">{{ $t('label.movement_type_outgoing') }}</option>
                            <option value="">{{ $t('label.movement_type_incoming') }}</option>
                            <option value="">{{ $t('label.movement_type_transfer') }}</option>
                            <option value="">{{ $t('label.movement_type_manufacturing') }}</option>
                            <option value="">{{ $t('label.movement_type_adjustment') }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <div class="mb-3 position-relative">
                        <label for="mobile_number" class="form-label">{{ $t('label.supplier_name') }}</label>
                        <input type="text" id="mobile_number" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3 position-relative">
                        <label for="fax_number" class="form-label">{{ $t('label.movement_description') }}</label>
                        <input type="text" id="fax_number" class="form-control rounded-1" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <div class="mb-3 position-relative">
                        <label for="address" class="form-label">{{ $t('label.invoice_number') }}</label>
                        <input type="text" id="address" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3 position-relative">
                        <label for="category_number" class="form-label">{{ $t('label.dispatch_number') }}</label>
                        <input type="text" id="category_number" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3 position-relative">
                        <label for="category_name" class="form-label">{{ $t('label.reference_number') }}</label>
                        <input type="text" id="category_name" class="form-control rounded-1" />
                    </div>
                </div>
            </div>
            <h3 class="mb-3">{{ $t('label.movement_details') }}</h3>
            <div class="table-responsive">
                <table class="table table-bordered text-center align-middle">
                    <thead class="header">
                        <tr>
                            <th>#</th>
                            <th>{{ $t('label.item_number') }}</th>
                            <th>{{ $t('label.item_name') }}</th>
                            <th>{{ $t('label.item_description') }}</th>
                            <th>{{ $t('label.unit_name') }}</th>
                            <th>{{ $t('label.quantity') }}</th>
                            <th>{{ $t('label.inventory_balance') }}</th>
                            <th>{{ $t('label.warehouse_number') }}</th>
                            <th>{{ $t('label.warehouse_name') }}</th>
                            <th>{{ $t('label.unit_price') }}</th>
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
            <div class="row">
                <div class="col-md-9">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="notes" class="form-label">{{ $t('label.notes') }}</label>

                            <textarea name="notes" id="notes" rows="3" class="form-control"></textarea>

                        </div>
                    </div>
                    <div class="item mb-4 mt-3">
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
        </form>
    </div>
</template>
