<!-- 
type 
client_num 
commercial_name
first_name
last_name
phone
telephone
first_address
last_address
city
area
postal_code
licensed_worker
code_number
pill_type
currency
email
classification
notes
attachments -->
<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('company_undefined') }}</h1>
        <div class="d-flex align-items-center justify-content-end">
            <button class="btn btn-lg btn-outline-secondary me-3">{{ $t('buttons.cancel') }}</button>
            <div class="dropdown">
                <button class="btn btn-lg btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {{ $t('buttons.save') }}
                </button>
                <ul class="dropdown-menu bg-main text-light">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </div>
        </div>
        <form @submit.prevent="createCustomer" class="form">
            <h3>Customer Information</h3>
            <div class="row mt-5">
                <div class="col-12">
                    <div class="item mb-4">
                        <label for="client_type" class="form-label">Client type</label>
                        <div class="d-flex align-items-center">

                            <div class="form-check me-3">
                                <input class="form-check-input" type="radio" name="client_type" v-model="form.type" id="personal">
                                <label class="form-check-label" for="personal">
                                    Personal
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="client_type" v-model="form.type" id="business">
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
                                <label for="customer_number" class="form-label">Customer number</label>

                                <input type="text" v-model="form.client_num" id="customer_number" class="form-control rounded-1" />

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="company_name" class="form-label">Company name</label>

                            <input type="text" v-model="form.commercial_name" id="company_name" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="first_name" class="form-label">First name</label>

                            <input type="text" v-model="form.first_name" id="first_name" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="last_name" class="form-label">Last name</label>

                            <input type="text" v-model="form.last_name" id="last_name" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="mobile" class="form-label">Mobile</label>

                            <input type="text" v-model="form.phone" id="mobile" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="phone" class="form-label">Phone</label>

                            <input type="text" v-model="form.telephone" id="phone" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="address_1" class="form-label">Address 1</label>

                            <input type="text" v-model="form.first_address" id="address_1" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="addres_2" class="form-label">Address 2</label>

                            <input type="text" v-model="form.last_address" id="addres_2" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="city" class="form-label">City</label>

                            <input type="text" v-model="form.city" id="city" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="state" class="form-label">State</label>

                            <input type="text" v-model="form.area" id="state" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="zip" class="form-label">ZIP</label>

                            <input type="text" v-model="form.postal_code" id="zip" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="zip" class="form-label">{{ $t('label.licensed_operator') }}</label>

                            <input type="text" v-model="form.licensed_worker" id="zip" class="form-control rounded-1" />

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

                            <input type="text" v-model="form.code_number" id="code" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="invoice_type" class="form-label">Invoice type</label>

                            <input type="text" v-model="form.pill_type" id="invoice_type" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="currency" class="form-label">{{ $t('registerCompany.currency')
                            }}</label>
                            <select v-model="form.currency" name="currency" id="currency" class="form-control">
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
                                <input type="email" v-model="form.email" id="email" class="form-control rounded-1"
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

                            <input type="text" v-model="form.classification" id="category" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="notes" class="form-label">Notes</label>

                            <textarea name="notes" v-model="form.notes" id="notes" rows="3" class="form-control"></textarea>

                        </div>
                    </div>
                </div>
                <div class="col-md-12">
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

<script>
    import axios from '@/axios';
    export default {
    data() {
        return {
            form: {
                type:'',
                client_num:'',
                commercial_name:'',
                first_name:'',
                last_name:'',
                phone:'',
                telephone:'',
                first_address:'',
                last_address:'',
                city:'',
                area:'',
                postal_code:'',
                licensed_worker:'',
                code_number:'',
                pill_type:'',
                currency:'',
                email:'',
                classification:'',
                notes:'',
                attachments:'',
            },
            iti: {},
        };
    },
    methods: {
            async createCustomer() {
            try {
                const formData = {
                    type: this.form.type,
                    client_num: this.form.client_num,
                    commercial_name: this.form.commercial_name,
                    first_name: this.form.first_name,
                    last_name: this.form.last_name,
                    phone: this.form.phone,
                    telephone: this.form.telephone,
                    first_address: this.form.first_address,
                    last_address: this.form.last_address,
                    city: this.form.city,
                    area: this.form.area,
                    postal_code: this.form.postal_code,
                    licensed_worker: this.form.licensed_worker,
                    code_number: this.form.code_number,
                    pill_type: this.form.pill_type,
                    currency: this.form.currency,
                    email: this.form.email,
                    classification: this.form.classification,
                    notes: this.form.notes,
                    attachments: this.form.attachments,
                };
                const response = await axios.post('/api/new-customer', formData);
                alert(response.data.message);
                localStorage.setItem("token", response.data.new_token);
                this.$router.push({name: 'admin.dashboard'});
            } catch (error) {
                    if (error.response && error.response.data && error.response.data.message) {
                        alert(`خطأ: ${error.response.data.message}`);
                    } else if (error.response && error.response.data && error.response.data.errors) {
                        const errors = error.response.data.errors;
                        let errorMessages = '';
                        for (const key in errors) {
                            if (Object.prototype.hasOwnProperty.call(errors, key)) {
                                errorMessages += `${errors[key].join(', ')}\n`;
                            }
                        }
                        alert(`أخطاء في البيانات:\n${errorMessages}`);
                    } else {
                        alert("حدث خطأ أثناء إنشاء العميل.");
                    }
                    console.error(error);
                }
            },

        },

    }   
</script>

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