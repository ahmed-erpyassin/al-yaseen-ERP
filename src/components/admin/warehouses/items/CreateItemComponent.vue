<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>
        <div class="d-flex align-items-center justify-content-end">
            <button class="btn btn-lg btn-outline-secondary me-3">{{ $t('buttons.cancel') }}</button>
            <button class="btn btn-lg btn-success">
                {{ $t('buttons.save') }}
            </button>

        </div>
        <form class="form">
            <div class="row">
                <div class="container pe-5 ps-5">

                    <!-- Form -->
                    <form class="form">
                        <div class="row">
                            <!-- Item Information Section -->
                            <div class="col-12">
                                <h3 class="mb-5">{{ $t('label.item_information') }}</h3>
                            </div>

                            <!-- Row: Item Number - Item Name - Manufacturing Duration -->
                            <div class="col-md-4 mb-4">
                                <label for="item_number" class="form-label">{{ $t('label.item_no') }}</label>
                                <input type="text" id="item_number" class="form-control rounded-1" />
                            </div>

                            <div class="col-md-4 mb-4">
                                <label for="item_name" class="form-label">{{ $t('label.item_name') }}</label>
                                <input type="text" id="item_name" class="form-control rounded-1" />
                            </div>

                            <div class="col-md-4 mb-4">
                                <label for="manufacturing_duration" class="form-label">{{
                                    $t('label.manufacturing_duration') }}</label>
                                <input type="text" id="manufacturing_duration" class="form-control rounded-1" />
                            </div>

                            <!-- Row: Quantity -->
                            <div class="col-md-4 mb-4">
                                <label for="quantity" class="form-label">{{ $t('label.quantity') }}</label>
                                <input type="number" id="quantity" class="form-control rounded-1" />
                            </div>

                            <!-- Warehouses Section -->
                            <div class="col-12 mt-4 mb-3">
                                <h5>{{ $t('label.warehouses') }}</h5>
                            </div>

                            <div class="col-md-4 mb-4">
                                <label for="raw_materials_warehouse" class="form-label">{{
                                    $t('label.raw_materials_warehouse') }}</label>
                                <select id="raw_materials_warehouse" class="form-control rounded-1">
                                    <option value="">{{ $t('label.select_warehouse') }}</option>
                                </select>
                            </div>

                            <div class="col-md-4 mb-4">
                                <label for="finished_product_warehouse" class="form-label">{{
                                    $t('label.finished_product_warehouse') }}</label>
                                <select id="finished_product_warehouse" class="form-control rounded-1">
                                    <option value="">{{ $t('label.select_warehouse') }}</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>

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
                    <h3 class="mb-5">{{ $t('label.item_information') }}</h3>
                </div>
                <div class="col-md-3">
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
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.catalog_number') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.item_detail') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.model') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.default_warehouse') }}</label>

                            <select name="default_warehouse" id="default_warehouse" class="form-control">
                                <option value="">{{ $t('label.default_warehouse') }}</option>
                            </select>

                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <h3 class="mb-5">{{ $t('label.units') }}</h3>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.balance_unit') }}</label>

                            <select name="default_warehouse" id="default_warehouse" class="form-control">
                                <option value="">{{ $t('label.number') }}</option>
                            </select>

                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.length') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.width') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.height') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.worker_quantity') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.second_unit') }}</label>

                            <select name="default_warehouse" id="default_warehouse" class="form-control">
                                <option value=""></option>
                            </select>

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.contains') }}</label>

                            <select name="default_warehouse" id="default_warehouse" class="form-control">
                                <option value=""></option>
                            </select>

                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label"></label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
<<<<<<< HEAD
                            <label for="buy_account" class="form-label">{{ $t('label.second_unit_item_number')
                                }}</label>
=======
                            <label for="buy_account" class="form-label">{{ $t('label.second_unit_item_number') }}</label>
>>>>>>> 5e25639469de159d12b434d70cc5162e896419f7

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.third_unit') }}</label>

                            <select name="default_warehouse" id="default_warehouse" class="form-control">
                                <option value=""></option>
                            </select>

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.contains') }}</label>

                            <select name="default_warehouse" id="default_warehouse" class="form-control">
                                <option value=""></option>
                            </select>

                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label"></label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.third_unit_item_number') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.dealing_unit') }}</label>

                            <select name="default_warehouse" id="default_warehouse" class="form-control">
                                <option value="">Main unit</option>
                            </select>

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.dealing_unit') }}</label>

                            <select name="default_warehouse" id="default_warehouse" class="form-control">
                                <option value="">Main unit</option>
                            </select>

                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <h3 class="mb-5">{{ $t('label.buying_selling_prices') }}</h3>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.first_selling_price') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.second_selling_price') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.third_selling_price') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
<<<<<<< HEAD
                            <label for="buy_account" class="form-label">{{ $t('label.selling_discount_percentage')
                                }}</label>
=======
                            <label for="buy_account" class="form-label">{{ $t('label.selling_discount_percentage') }}</label>
>>>>>>> 5e25639469de159d12b434d70cc5162e896419f7

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
<<<<<<< HEAD
                            <label for="buy_account" class="form-label">{{ $t('label.max_discount_percentage')
                                }}</label>
=======
                            <label for="buy_account" class="form-label">{{ $t('label.max_discount_percentage') }}</label>
>>>>>>> 5e25639469de159d12b434d70cc5162e896419f7

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item ">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.min_price') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-12 mb-4">
                    <div class="form-check d-flex align-items-center justify-content-end">
                        <input type="checkbox" checked class="form-check-input rounded-circle" id="remember" />
                        <label class="form-check-label" for="remember">{{ $t('label.selling_price_vat') }}</label>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.first_purchase_price') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.second_purchase_price') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.third_purchase_price') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
<<<<<<< HEAD
                            <label for="buy_account" class="form-label">{{ $t('label.purchase_discount_percentage')
                                }}</label>
=======
                            <label for="buy_account" class="form-label">{{ $t('label.purchase_discount_percentage') }}</label>
>>>>>>> 5e25639469de159d12b434d70cc5162e896419f7

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="form-check d-flex align-items-center justify-content-end">
                            <input type="checkbox" checked class="form-check-input rounded-circle" id="remember" />
                            <label class="form-check-label" for="remember">{{ $t('label.purchase_price_vat') }}</label>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="item mb-4">
                        <div class="form-check d-flex align-items-center justify-content-end">
                            <input type="checkbox" checked class="form-check-input rounded-circle" id="remember" />
                            <label class="form-check-label" for="remember">{{ $t('label.item_subject_to_vat') }}</label>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <h3 class="mb-4">{{ $t('label.other_info') }}</h3>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative group">
                            <label for="buy_account" class="form-label">{{ $t('label.barcode') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />
                            <i class="bi bi-upc"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative ">
                            <label for="buy_account" class="form-label">{{ $t('label.expire_date') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />
                        </div>
                    </div>
                </div>
                <div class="col-md-4"></div>
                <div class="col-md-4">
                    <div class="item mb-5">
                        <div class="mb-3 position-relative group">
                            <label for="buy_account" class="form-label">{{ $t('label.add_image') }}</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />
                            <i class="bi bi-image"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-5">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">{{ $t('label.category_type') }}</label>

                            <select class="form-control">
                                <option value="">{{ $t('label.category_service') }}</option>
                                <option value="">{{ $t('label.category_goods') }}</option>
                                <option value="">{{ $t('label.category_work') }}</option>
                                <option value="">{{ $t('label.category_asset') }}</option>
                                <option value="">{{ $t('label.category_transfer') }}</option>
                                <option value="">{{ $t('label.category_minium') }}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
