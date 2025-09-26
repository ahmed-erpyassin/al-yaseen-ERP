<template>

    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> Undefined Company name</h1>
        <div class="d-flex align-items-center justify-content-end">
            <button class="btn btn-lg btn-outline-secondary me-3">Cancel</button>
            <div class="dropdown">
                <button class="btn btn-lg btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Save
                </button>
                <ul class="dropdown-menu bg-main text-light">
                    <li><a class="dropdown-item" href="#">Save & Print</a></li>
                </ul>
            </div>
        </div>
        <form class="form">

            <h3>Warehouse Information</h3>

            <div class="row mt-5">
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="warehouse_number" class="form-label">Warehouse number</label>

                                <input type="text" id="warehouse_number" class="form-control rounded-1" />

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="information" class="form-label">Information</label>

                                <input type="text" id="information" class="form-control rounded-1" />

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="warehousekeeper" class="form-label">Warehousekeeper Employee Number</label>

                                <input type="text" id="warehousekeeper" class="form-control rounded-1" />

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="warehousekeeper_employee_name" class="form-label">Employee name
                                    warehousekeeper</label>

                                <input type="text" id="warehousekeeper_employee_name" class="form-control rounded-1" />

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="mobile_number" class="form-label">Mobile number</label>

                                <input type="text" id="mobile_number" class="form-control rounded-1" />

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="fax_number" class="form-label">Fax number</label>

                                <input type="text" id="fax_number" class="form-control rounded-1" />

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="address" class="form-label">Address</label>

                                <input type="text" id="address" class="form-control rounded-1" />

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="category_number" class="form-label">Category number</label>

                                <input type="text" id="category_number" class="form-control rounded-1" />

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="category_name" class="form-label">Category name</label>

                                <input type="text" id="category_name" class="form-control rounded-1" />

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="sale_account" class="form-label">Sale account</label>

                                <input type="text" id="sale_account" class="form-control rounded-1" />

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Buy account</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">

                        <h3>How to evaluate goods in stock</h3>
                        <div class="form-check mb-3 mt-5">
                            <input type="checkbox" checked class="form-check-input rounded-circle" id="remember" />
                            <label class="form-check-label" for="remember">Natural - as determined at the time of
                                evaluation</label>
                        </div>
                        <div class="form-check mb-3 ">
                            <input type="checkbox" class="form-check-input rounded-circle" id="remember" />
                            <label class="form-check-label" for="remember">Without - The goods have no value</label>
                        </div>
                        <div class="form-check mb-3 ">
                            <input type="checkbox" class="form-check-input rounded-circle" id="remember" />
                            <label class="form-check-label" for="remember">According to the first purchase price on the
                                item card</label>
                        </div>
                        <div class="form-check mb-3 ">
                            <input type="checkbox" class="form-check-input rounded-circle" id="remember" />
                            <label class="form-check-label" for="remember">According to the second purchase price on the
                                item card</label>
                        </div>
                        <div class="form-check mb-3 ">
                            <input type="checkbox" class="form-check-input rounded-circle" id="remember" />
                            <label class="form-check-label" for="remember">According to the third purchase price on the
                                item card</label>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="item mb-4 mt-3">
                        <div class="mb-3 position-relative">
                            <label for="attachments" class="form-label">Attachments</label>

                            <div class="box-attachments d-flex align-items-center justify-content-center">
                                <div class="text-center">

                                    <i class="bi bi-image"></i>
                                    <p class="small">Drop the file here or select from your device.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </form>
    </div>

</template>
