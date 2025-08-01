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
                    <h3>Employee data</h3>
                </div>
                <div class="col-md-2 mt-4">

                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="employee_number" class="form-label">Employee number</label>

                            <input type="text" id="employee_number" class="form-control rounded-1" />

                        </div>
                    </div>

                </div>
                <div class="col-md-7 mt-4">

                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="surname" class="form-label">Surname</label>

                            <input type="text" id="surname" class="form-control rounded-1" />

                        </div>
                    </div>

                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="firstname" class="form-label">Firstname</label>

                            <input type="text" id="firstname" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="secondname" class="form-label">Secondname</label>

                            <input type="text" id="secondname" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="thirdname" class="form-label">Thirdname</label>

                            <input type="text" id="thirdname" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="mobile1" class="form-label">Mobile 1</label>

                            <input type="text" id="mobile1" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="mobile2" class="form-label">Mobile 2</label>

                            <input type="text" id="mobile2" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="email" class="form-label">Email</label>

                            <input type="email" id="email" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="date_birth" class="form-label">Date of birth</label>

                            <input type="date" id="date_birth" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="address" class="form-label">Address</label>

                            <input type="text" id="address" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="government_id" class="form-label">Government ID</label>

                            <input type="text" id="government_id" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="nid_number" class="form-label">NID number</label>

                            <input type="text" id="nid_number" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="gender" class="form-label">Gender</label>

                            <input type="text" id="gender" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="wifes_count" class="form-label">Number of wifes</label>

                            <input type="text" id="wifes_count" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="children_count" class="form-label">Number of children</label>

                            <input type="text" id="children_count" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="children_count" class="form-label">Number of dependents</label>

                            <input type="text" id="children_count" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="children_count" class="form-label">Number of students</label>

                            <input type="text" id="children_count" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 d-flex align-items-center">
                            <div class="form-check mb-3  me-3">
                                <input type="checkbox" checked class="form-check-input rounded-circle" id="remember" />
                                <label class="form-check-label" for="remember">Driver</label>
                            </div>
                            <div class="form-check mb-3">
                                <input type="checkbox" checked class="form-check-input rounded-circle" id="remember" />
                                <label class="form-check-label" for="remember">sales representative</label>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="car_number" class="form-label">Car number</label>

                            <input type="text" id="car_number" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="job" class="form-label">Job</label>

                            <input type="text" id="job" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="job" class="form-label">Date of appointment</label>

                            <input type="text" id="job" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="job" class="form-label">Employee Manager</label>

                            <input type="text" id="job" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="job" class="form-label">Employee ID</label>

                            <input type="text" id="job" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="job" class="form-label">Job title</label>

                            <input type="text" id="job" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="job" class="form-label">Category</label>

                            <input type="text" id="job" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="job" class="form-label">Sallery</label>

                            <input type="text" id="job" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="job" class="form-label">Billing rate</label>

                            <input type="text" id="job" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="job" class="form-label">Monthly discount</label>

                            <input type="text" id="job" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>

                <div class="col-md-8 mb-5">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="currency" class="form-label">{{ $t('registerCompany.currency')
                                }}</label>
                            <select name="currency" id="currency" class="form-control">
                                <option value="">$ USD</option>
                            </select>

                        </div>
                    </div>
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
            </div>
        </form>
    </div>
</template>