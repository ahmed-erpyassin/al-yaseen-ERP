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
            <div class="row">
                <div class="col-12">
                    <h3 class="mb-5">Item information</h3>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Item NO</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Item name</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Catalog number</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Item detail</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Model</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Default warehouse</label>

                            <select name="default_warehouse" id="default_warehouse" class="form-control">
                                <option value="">Default warehouse</option>
                            </select>

                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <h3 class="mb-5">Units</h3>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Balance unit</label>

                            <select name="default_warehouse" id="default_warehouse" class="form-control">
                                <option value="">number</option>
                            </select>

                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Length</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Width</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Height</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Worker * Quantity</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Second unit</label>

                            <select name="default_warehouse" id="default_warehouse" class="form-control">
                                <option value=""></option>
                            </select>

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Contains</label>

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
                            <label for="buy_account" class="form-label">Second unit item number</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Third unit</label>

                            <select name="default_warehouse" id="default_warehouse" class="form-control">
                                <option value=""></option>
                            </select>

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Contains</label>

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
                            <label for="buy_account" class="form-label">Third unit item number</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Dealing unit</label>

                            <select name="default_warehouse" id="default_warehouse" class="form-control">
                                <option value="">Main unit</option>
                            </select>

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Dealing unit</label>

                            <select name="default_warehouse" id="default_warehouse" class="form-control">
                                <option value="">Main unit</option>
                            </select>

                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <h3 class="mb-5">Buying and selling prices</h3>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">First selling price</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Second selling price</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Third selling price</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Discount percentage when selling</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Highest discount rate when selling</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item ">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Lowest allowed price</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-12 mb-4">
                    <div class="form-check d-flex align-items-center justify-content-end">
                        <input type="checkbox" checked class="form-check-input rounded-circle" id="remember" />
                        <label class="form-check-label" for="remember">The mentioned selling prices include VAT.</label>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">First purchase price</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Second purchase price</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Third purchase price</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Discount percentage when purchasing</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="form-check d-flex align-items-center justify-content-end">
                            <input type="checkbox" checked class="form-check-input rounded-circle" id="remember" />
                            <label class="form-check-label" for="remember">The mentioned purchase prices include
                                VAT.</label>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="item mb-4">
                        <div class="form-check d-flex align-items-center justify-content-end">
                            <input type="checkbox" checked class="form-check-input rounded-circle" id="remember" />
                            <label class="form-check-label" for="remember">The item is subject to VAT.</label>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <h3 class="mb-4">Other information</h3>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative group">
                            <label for="buy_account" class="form-label">Barcode</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />
                            <i class="bi bi-upc"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative ">
                            <label for="buy_account" class="form-label">Expire date</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />
                        </div>
                    </div>
                </div>
                <div class="col-md-4"></div>
                <div class="col-md-4">
                    <div class="item mb-5">
                        <div class="mb-3 position-relative group">
                            <label for="buy_account" class="form-label">Add item image</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />
                            <i class="bi bi-image"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-5">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Category type</label>

                            <select class="form-control">
                                <option value="">Service</option>
                                <option value="">Goods</option>
                                <option value="">Work</option>
                                <option value="">Asset</option>
                                <option value="">Transfer</option>
                                <option value="">Minium</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
