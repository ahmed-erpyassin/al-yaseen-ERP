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
            <div class="row">
                <div class="col-12">
                    <h3 class="mb-5">{{ $t('label.add_manufacturing_formula') }}</h3>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.item_no') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.item_name') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.date') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.hour') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>

                <div class="col-12">
                    <h3 class="mb-5">{{ $t('label.manufacturing_formula') }}</h3>
                </div>
                <div class="table-responsive">
                    <table class="table table-bordered text-center align-middle">
                        <thead class="header">
                            <tr>
                                <th>#</th>
                                <th>{{ $t('label.item_no') }}</th>
                                <th>{{ $t('label.item_name') }}</th>
                                <th>{{ $t('label.consumed_quantity') }}</th>
                                <th>{{ $t('label.produced_quantity') }}</th>
                            </tr>
                        </thead>
                        <tbody id="tableBody form">
                            <tr>
                                <td><input type="number" class="form-control border-0 rounded-0"></td>
                                <td><input type="number" class="form-control border-0 rounded-0"></td>
                                <td><input type="text" class="form-control border-0 rounded-0"></td>
                                <td><input type="text" class="form-control border-0 rounded-0"></td>
                                <td><input type="text" class="form-control border-0 rounded-0"></td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <div class="d-flex gap-2 justify-content-end">
                    <button class="btn  btn-action">{{ $t('actions.add_row') }}</button>
                    <button class="btn  btn-action">{{ $t('actions.remove_row') }}</button>
                </div>
                <div class="col-12">
                    <h3 class="mb-4">{{ $t('label.production_cost') }}</h3>
                </div>
                <table class="table  text-center align-middle">
                    <thead class="header">
                        <tr>
                            <th>#</th>
                            <th>
                                <div class="form-check ">
                                    <input type="checkbox" checked class="form-check-input rounded-circle"
                                        id="remember" />
                                    <label class="form-check-label" for="remember">{{ $t('label.first') }}</label>
                                </div>
                            </th>
                            <th>
                                <div class="form-check ">
                                    <input type="checkbox" checked class="form-check-input rounded-circle"
                                        id="remember" />
                                    <label class="form-check-label" for="remember">{{ $t('label.second') }}</label>
                                </div>
                            </th>
                            <th>
                                <div class="form-check ">
                                    <input type="checkbox" checked class="form-check-input rounded-circle"
                                        id="remember" />
                                    <label class="form-check-label" for="remember">{{ $t('label.third') }}</label>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody id="tableBody form">
                        <tr>
                            <td>{{ $t('label.purchase_price') }}</td>
                            <td><input type="number" class="form-control text-center border-0 rounded-0" value="000" ></td>
                            <td><input type="text" class="form-control text-center border-0 rounded-0" value="000" ></td>
                            <td><input type="text" class="form-control text-center border-0 rounded-0" value="000" ></td>

                        </tr>
                        <tr>
                            <td>{{ $t('label.sale_price') }}</td>
                            <td><input type="number" class="form-control text-center border-0 rounded-0" value="000" ></td>
                            <td><input type="text" class="form-control text-center border-0 rounded-0" value="000" ></td>
                            <td><input type="text" class="form-control text-center border-0 rounded-0" value="000" ></td>

                        </tr>
                        <tr>
                            <td>{{ $t('label.labor_cost') }}</td>
                            <td><input type="number" class="form-control text-center border-0 rounded-0"  ></td>

                        </tr>
                        <tr>
                            <td>{{ $t('label.operating_cost') }}</td>
                            <td><input type="number" class="form-control text-center border-0 rounded-0"  ></td>

                        </tr>
                        <tr>
                            <td>{{ $t('label.waste_cost') }}</td>
                            <td><input type="number" class="form-control text-center border-0 rounded-0"  ></td>

                        </tr>
                        <tr>
                            <td class="text-primary">{{ $t('label.final_cost') }}</td>
                            <td><input type="number" class="form-control text-center border-0 rounded-0"  ></td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </form>
    </div>
</template>

<style scoped>
td, th {
    border: 1px solid #ccc;
}
</style>