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
                    <li><a class="dropdown-item" href="#">{{ $t('label.save&print') }}</a></li>
                </ul>
            </div>
        </div>
        <form class="form">
            <div class="row mt-5">
                <h3 class="mb-5">{{ $t('label.add_contact') }}</h3>
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="name" class="form-label">{{ $t('label.name') }}</label>
                        <input type="text" id="name" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="statement" class="form-label">{{ $t('label.statement') }}</label>
                        <input type="text" id="statement" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="from" class="form-label">{{ $t('label.address') }}</label>
                        <input type="text" id="address" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="phone" class="form-label">{{ $t('label.phone') }}</label>
                        <input type="text" id="phone" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="mobile" class="form-label">{{ $t('label.mobile') }}</label>
                        <input type="text" id="mobile" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="email" class="form-label">{{ $t('label.email') }}</label>
                        <input type="text" id="email" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="notes" class="form-label">{{ $t('label.notes') }}</label>
                        <input type="text" id="notes" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="category" class="form-label">{{ $t('label.category') }}</label>
                        <select type="text" id="category" class="form-control rounded-1" >
                            <option value="customer">{{ $t('label.customer') }}</option>
                            <option value="empolyee">{{ $t('label.employee') }}</option>
                            <option value="supplier">{{ $t('label.supplier') }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="fax_number" class="form-label">{{ $t('label.fax_number') }}</label>
                        <input type="text" id="fax_number" class="form-control rounded-1" />
                    </div>
                </div>
            </div>
        </form>
    </div>

</template>