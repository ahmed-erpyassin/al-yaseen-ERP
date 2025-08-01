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
                    <li><a class="dropdown-item" href="#">Save & Email</a></li>
                    <li><a class="dropdown-item" href="#">Save & Print</a></li>
                </ul>
            </div>
        </div>
        <form class="form">
            <div class="row">
                <div class="col-12">
                    <h3 class="mb-5">New price offer</h3>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">notebook</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Invoice NO</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Date</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Hour</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">due date</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
            </div>
            <div class="row mb-5">
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Customer NO</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Name</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Email</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Licensed Operator</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Currency</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Currency price</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
            </div>

            <h3 class="mb-5">Offer information</h3>

            <div class="table-responsive">
                <table class="table table-bordered text-center align-middle">
                    <thead class="header">
                        <tr>
                            <th>#</th>
                            <th>Offer No</th>
                            <th>Offer information</th>
                            <th>Unit</th>
                            <th>Quantity</th>
                            <th>price</th>
                            <th>Total</th>
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
                        </tr>
                    </tbody>
                </table>

            </div>
            <div class="d-flex gap-2 justify-content-end">
                <button class="btn  btn-action">Add row</button>
                <button class="btn  btn-action">remove row</button>
            </div>
            <div class="col-md-9 mt-5">
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="notes" class="form-label">Notes</label>

                        <textarea name="notes" id="notes" rows="3" class="form-control"></textarea>

                    </div>
                </div>
                <div class="item mb-4">
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

            <div class="row mt-5 justify-content-end">

                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Allowed discount</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Total bill without tax</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
                    </div>
                    <div class="item mb-4">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="mb-3 position-relative">
                                    <label for="buy_account" class="form-label">ratio%</label>

                                    <input type="text" id="buy_account" class="form-control rounded-1" />

                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="mb-3 position-relative">
                                    <label for="buy_account" class="form-label">VAT</label>

                                    <input type="text" id="buy_account" class="form-control rounded-1" />

                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="buy_account" class="form-label">Total offer amount</label>

                            <input type="text" id="buy_account" class="form-control rounded-1" />

                        </div>
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