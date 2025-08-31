<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('company_undefined') }}</h1>
        <div class="d-flex align-items-center justify-content-end">
            <button class="btn btn-lg btn-outline-secondary me-3">{{ $t('buttons.cancel') }}</button>
            <button class="btn btn-lg btn-success" type="button">
                {{ $t('buttons.save') }}
            </button>

        </div>
        <form class="form">
            <h3 class="mb-3">{{ $t('label.user_data') }}</h3>
            <div class="tabs">
                <ul class="nav nav-pills justify-content-start rounded-2" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="user_options-tab" data-bs-toggle="tab"
                            data-bs-target="#user_options" type="button" role="tab" aria-controls="user_options"
                            aria-selected="true">
                            {{ $t('label.user_options') }}
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="permissions_review_edit_input-tab" data-bs-toggle="tab"
                            data-bs-target="#permissions_review_edit_input" type="button" role="tab"
                            aria-controls="permissions_review_edit_input" aria-selected="false">
                            {{ $t('label.permissions_review_edit_input') }}
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="other_permissions-tab" data-bs-toggle="tab"
                            data-bs-target="#other_permissions" type="button" role="tab"
                            aria-controls="other_permissions" aria-selected="false">
                            {{ $t('label.other_permissions') }}
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="other-tab" data-bs-toggle="tab" data-bs-target="#other"
                            type="button" role="tab" aria-controls="other" aria-selected="false">
                            {{ $t('label.other') }}
                        </button>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="user_options" role="tabpanel"
                        aria-labelledby="user_options-tab">
                        <div class="row mt-3">
                            <div class="col-md-3 mb-3">
                                <div class="mb-3 position-relative">
                                    <label for="from" class="form-label">{{
                                        $t('label.user_number') }}</label>
                                    <input type="text" id="from" class="form-control rounded-1" />

                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="mb-3 position-relative">
                                    <label for="from" class="form-label">{{
                                        $t('label.username') }}</label>
                                    <input type="text" id="from" class="form-control rounded-1" />

                                </div>
                            </div>
                            <div class="col-md-3 mb-3">
                                <div class="mb-3 position-relative">
                                    <label for="from" class="form-label">{{
                                        $t('label.employee_number') }}</label>
                                    <input type="text" id="from" class="form-control rounded-1" />

                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-12 mb-3">
                                <div class="mb-3 position-relative">
                                    <label for="from" class="form-label">{{
                                        $t('label.statement') }}</label>
                                    <input type="text" id="from" class="form-control rounded-1" />

                                </div>
                            </div>
                            <div class="col-md-4 mb-3">
                                <div class="mb-3 position-relative">
                                    <label for="from" class="form-label">{{
                                        $t('label.account_open_date') }}</label>
                                    <input type="text" id="from" class="form-control rounded-1" />

                                </div>
                            </div>
                            <div class="col-md-4 mb-3">
                                <div class="mb-3 position-relative">
                                    <label for="from" class="form-label">{{
                                        $t('label.last_login_date') }}</label>
                                    <input type="text" id="from" class="form-control rounded-1" />

                                </div>
                            </div>
                            <div class="col-md-4 mb-3">
                                <div class="mb-3 position-relative">
                                    <label for="from" class="form-label">{{
                                        $t('label.time') }}</label>
                                    <input type="text" id="from" class="form-control rounded-1" />

                                </div>
                            </div>

                            <h4 class="mb-3 text-primary">{{ $t('label.user_type') }}</h4>

                            <div class="d-flex gap-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="user_type" id="type1"
                                        value="confusing">
                                    <label class="form-check-label" for="type1">{{ $t('label.confusing') }}</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="user_type" id="type2"
                                        value="normal">
                                    <label class="form-check-label" for="type2">{{ $t('label.normal') }}</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="user_type" id="type3"
                                        value="cashier">
                                    <label class="form-check-label" for="type3">{{ $t('label.cashier') }}</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="user_type" id="type4"
                                        value="active">
                                    <label class="form-check-label" for="type4">{{ $t('label.active') }}</label>
                                </div>
                            </div>

                            <h3 class="mb-3 text-primary mt-3">{{ $t('label.allowed_login_period') }}</h3>
                            <div class="col-md-6 mb-3">
                                <div class="mb-3 position-relative">
                                    <label for="from_time" class="form-label">{{
                                        $t('label.from_time') }}</label>
                                    <input type="text" id="from_time" class="form-control rounded-1" />

                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="mb-3 position-relative">
                                    <label for="to_time" class="form-label">{{
                                        $t('label.to_time') }}</label>
                                    <input type="text" id="to_time" class="form-control rounded-1" />

                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="mb-3 position-relative">
                                    <label for="from_date" class="form-label">{{
                                        $t('label.from_date') }}</label>
                                    <input type="text" id="from_date" class="form-control rounded-1" />

                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="mb-3 position-relative">
                                    <label for="to_date" class="form-label">{{
                                        $t('label.to_date') }}</label>
                                    <input type="text" id="to_date" class="form-control rounded-1" />

                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="mb-3 position-relative">
                                    <label for="password" class="form-label">{{
                                        $t('label.password') }}</label>
                                    <input type="text" id="password" class="form-control rounded-1" />

                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="mb-3 position-relative">
                                    <label for="confirm_password" class="form-label">{{
                                        $t('label.confirm_password') }}</label>
                                    <input type="text" id="confirm_password" class="form-control rounded-1" />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade show" id="permissions_review_edit_input" role="tabpanel"
                        aria-labelledby="user_options-tab">
                        <table class="table table-bordered">
                            <thead class="table-light">
                                <tr>
                                    <th>البيان</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td><span class="icon icon-yes me-2">✔</span><span class="icon icon-no">✖</span></td>
                                </tr>

                            </tbody>
                        </table>
                    </div>


                </div>
            </div>
        </form>
    </div>
</template>

<style scoped>
.tabs {
    margin-top: 20px;

}

.nav-pills {
    background-color: #1D263B;
}

.nav-pills .nav-link {
    border-radius: 0;
    background-color: #1D263B;
    color: #fff !important;
    margin: 0 5px;
}

.accounts .nav-pills {
    background-color: #1D7342;
}

.accounts .nav-pills .nav-link {
    border-radius: 0;
    background-color: #1D7342;
    color: #fff !important;
    margin: 0 5px;
}

.nav-pills .nav-link.active {
    background-color: #FFF;
    color: #333 !important;
}

.tab-content {
    margin-top: 20px;
    padding: 10px;
    border-top: none;
}

.tab-content {
    margin-top: 7px;
}

.list-group-item {
    border: none;
    padding: 0.5rem 1rem;
}

body {
    font-family: "Tajawal", sans-serif;
    background-color: #f9f9f9;
}

.nav-tabs .nav-link {
    font-weight: bold;
}

table td,
table th {
    vertical-align: middle;
    text-align: center;
}

thead tr th {
    background-color: #fff;
}

.icon {
    font-size: 18px;
    cursor: pointer;
}

.icon-yes {
    color: green;
}

.icon-no {
    color: red;
}
</style>
