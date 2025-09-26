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
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </div>
        </div>
        <form class="form">
            <h3>supplier Information</h3>
            <div class="row mt-5">
                <div class="col-12">
                    <div class="item mb-4">
                        <label for="client_type" class="form-label">Supplier type</label>
                        <div class="d-flex align-items-center">

                            <div class="form-check me-3">
                                <input class="form-check-input" type="radio" name="client_type" id="personal">
                                <label class="form-check-label" for="personal">
                                    Personal
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="client_type" id="business">
                                <label class="form-check-label" for="business">
                                    Business
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="supplier_number" class="form-label">supplier number</label>

                                <input type="text" id="supplier_number" class="form-control rounded-1" />

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="company_name" class="form-label">Company name</label>

                            <input type="text" id="company_name" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="first_name" class="form-label">First name</label>

                            <input type="text" id="first_name" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="last_name" class="form-label">Last name</label>

                            <input type="text" id="last_name" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="mobile" class="form-label">Mobile</label>

                            <input type="text" id="mobile
                            " class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="phone" class="form-label">Phone</label>

                            <input type="text" id="phone" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="address_1" class="form-label">Address 1</label>

                            <input type="text" id="address_1" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="addres_2" class="form-label">Address 2</label>

                            <input type="text" id="addres_2" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="city" class="form-label">City</label>

                            <input type="text" id="city" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="state" class="form-label">State</label>

                            <input type="text" id="state" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="zip" class="form-label">ZIP</label>

                            <input type="text" id="zip" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="zip" class="form-label">{{ $t('label.licensed_operator') }}</label>

                            <input type="text" id="zip" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-12 mb-5">
                    <h3>Account Information</h3>

                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="code" class="form-label">Code</label>

                            <input type="text" id="code" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="invoice_type" class="form-label">Invoice type</label>

                            <input type="text" id="invoice_type" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="currency" class="form-label">{{ $t('registerCompany.currency')
                                }}</label>
                            <select name="currency" id="currency" class="form-control">
                                <option value="">$ USD</option>
                            </select>

                        </div>
                    </div>
                </div>

                <div class="col-12">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="email" class="form-label">{{ $t('registerCompany.email')
                            }}</label>
                            <div class=" position-relative group">
                                <input type="email" id="email" class="form-control rounded-1"
                                    placeholder="yassin2029@gmail.com" />
                                <i class="bi bi-envelope"></i>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="category" class="form-label">Category</label>

                            <input type="text" id="category" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="notes" class="form-label">Notes</label>

                            <textarea name="notes" id="notes" rows="3" class="form-control"></textarea>

                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="attachments" class="form-label">Attachments</label>

                            <div class="box-attachments d-flex align-items-center justify-content-center" >
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

<style>
.box-attachments {
    height: 162px;
    border: 1px dashed #767171;
    border-radius: 3px;
}
.box-attachments i {
    font-size: 92px;
}
</style>