<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>
        
        <!-- Main Content -->
        <div class="payment-content">

            <!-- Form Sections -->
            <div class="form-sections">
                <!-- Right Column: Personal Information -->
                <div class="form-column personal-info">
                    <h4 class="section-title">{{ $t('label.personal_information') }}</h4>
                    
                    <div class="form-group">
                        <label for="fullName">{{ $t('label.full_name') }}</label>
                        <input type="text" id="fullName" class="form-control" v-model="form.fullName" />
                    </div>
                    
                    <div class="form-group">
                        <label for="email">{{ $t('label.email') }}</label>
                        <input type="email" id="email" class="form-control" v-model="form.email" />
                    </div>
                    
                    <div class="form-group">
                        <label for="mobile">{{ $t('label.mobile') }}</label>
                        <input type="tel" id="mobile" class="form-control" v-model="form.mobile" />
                    </div>
                </div>

                <!-- Middle Column: Card Information -->
                <div class="form-column card-info">
                    <h4 class="section-title">{{ $t('label.card_information') }}</h4>
                    <div class="instruction-text">يرجى ملء جميع معلومات بطاقتك</div>
                    
                    <!-- Card Display -->
                    <div class="card-display">
                        <div class="card-image-container">
                            <img src="@/assets/card.png" alt="Credit Card" class="card-image" />
                        </div>
                    </div>
                    
                    <!-- Card Form -->
                    <div class="card-form">
                        <div class="form-group">
                            <label for="cardNumber">{{ $t('label.card_number') }}</label>
                            <input 
                                type="text" 
                                id="cardNumber" 
                                class="form-control" 
                                v-model="form.cardNumber"
                                @input="formatCardNumber"
                                placeholder="0000 0000 0000 0000"
                                maxlength="19"
                            />
                        </div>
                        
                        <div class="form-group">
                            <label for="cardHolder">{{ $t('label.card_holder') }}</label>
                            <input type="text" id="cardHolder" class="form-control" v-model="form.cardHolder" />
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="expiryMonth">{{ $t('label.expiry_date') }}</label>
                                <div class="expiry-inputs">
                                    <input 
                                        type="text" 
                                        id="expiryMonth" 
                                        class="form-control" 
                                        v-model="form.expiryMonth"
                                        placeholder="00"
                                        maxlength="2"
                                    />
                                    <span>/</span>
                                    <input 
                                        type="text" 
                                        id="expiryYear" 
                                        class="form-control" 
                                        v-model="form.expiryYear"
                                        placeholder="00"
                                        maxlength="2"
                                    />
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="cvc">{{ $t('label.cvc') }}</label>
                                <input 
                                    type="text" 
                                    id="cvc" 
                                    class="form-control" 
                                    v-model="form.cvc"
                                    maxlength="4"
                                />
                            </div>
                        </div>
                    </div>
                    
                    <!-- Payment Frequency -->
                    <div class="payment-frequency">
                        <h5>{{ $t('label.payment_frequency') }}</h5>
                        <div class="radio-group">
                            <label class="radio-option">
                                <input type="radio" v-model="form.paymentFrequency" value="once" />
                                <span class="radio-custom"></span>
                                {{ $t('label.one_time') }}
                            </label>
                            <label class="radio-option">
                                <input type="radio" v-model="form.paymentFrequency" value="monthly" />
                                <span class="radio-custom"></span>
                                {{ $t('label.monthly') }}
                            </label>
                            <label class="radio-option">
                                <input type="radio" v-model="form.paymentFrequency" value="yearly" />
                                <span class="radio-custom"></span>
                                {{ $t('label.yearly') }}
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Left Column: How did you reach us -->
                <div class="form-column reach-info">
                    <h4 class="section-title">{{ $t('label.how_did_you_reach_us') }}</h4>
                    
                    <div class="form-group">
                        <label for="source">{{ $t('label.how_did_you_reach_us') }}</label>
                        <select id="source" class="form-control" v-model="form.source">
                            <option value="">اختر --</option>
                            <option value="google">جوجل</option>
                            <option value="facebook">فيسبوك</option>
                            <option value="instagram">انستجرام</option>
                            <option value="friend">صديق</option>
                            <option value="other">أخرى</option>
                        </select>
                    </div>
                    
                    <div class="payment-confirmation">
                        سوف يتم سحبها من بطاقتكم
                    </div>
                    
                    <div class="form-group">
                        <label for="totalAmount">{{ $t('label.total_amount') }}</label>
                        <div class="amount-input-group">
                            <input 
                                type="text" 
                                id="totalAmount" 
                                class="form-control" 
                                v-model="form.totalAmount"
                                placeholder="$ Another Money"
                            />
                            <select class="form-control currency-select" v-model="form.currency">
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="SAR">SAR</option>
                                <option value="EGP">EGP</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="notes">{{ $t('label.notes') }}</label>
                        <textarea 
                            id="notes" 
                            class="form-control" 
                            rows="4" 
                            v-model="form.notes"
                            placeholder="أي ملاحظات إضافية..."
                        ></textarea>
                    </div>
                    
                    <!-- Pay Now Button -->
                    <button type="button" class="btn-pay-now" @click="handlePayment">
                        {{ $t('label.pay_now') }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Verification Code Modal -->
        <div v-if="showVerificationModal" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <div>
                        <h4 class="modal-title">{{ $t('label.verification_code') }}</h4>
                        <p class="modal-subtitle">{{ $t('label.verification_instruction') }}</p>
                    </div>
                </div>
                
                <div class="verification-inputs">
                    <input 
                        v-for="(digit, index) in verificationCode" 
                        :key="index" 
                        type="text" 
                        class="code-input"
                        maxlength="1" 
                        v-model="verificationCode[index]" 
                        @input="onCodeInput(index)"
                        @keydown.backspace="onCodeBackspace(index, $event)" 
                        @paste="onCodePaste" 
                        ref="codeInputs" 
                    />
                </div>
                
                <div v-if="verificationError" class="error-message">
                    {{ verificationError }}
                </div>
                
                <button type="button" class="btn-verify rounded-0" @click="verifyCode" :disabled="!isCodeComplete">
                    {{ $t('label.verify_now') }}
                </button>
                
                <div class="resend-section">
                    <p class="resend-text">{{ $t('label.didnt_receive_code') }}</p>
                    <button 
                        type="button" 
                        class="btn-resend" 
                        @click="resendCode"
                        :disabled="resendTimer > 0"
                    >
                        {{ resendTimer > 0 ? `${$t('label.resend')} ${formattedTime}` : $t('label.resend') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PaymentFormComponent',
    data() {
        return {
            form: {
                fullName: '',
                email: '',
                mobile: '',
                cardNumber: '',
                cardHolder: 'Essam Ahmed',
                expiryMonth: '',
                expiryYear: '',
                cvc: '',
                paymentFrequency: 'once',
                source: '',
                totalAmount: '$ Another Money',
                currency: 'USD',
                notes: ''
            },
            showVerificationModal: false,
            verificationCode: ['', '', '', '', ''],
            verificationError: null,
            resendTimer: 0,
            timer: null
        }
    },
    computed: {
        cardNumberGroups() {
            const cleaned = this.form.cardNumber.replace(/\s/g, '');
            const groups = [];
            for (let i = 0; i < cleaned.length; i += 4) {
                groups.push(cleaned.substr(i, 4));
            }
            return groups;
        },
        isCodeComplete() {
            return this.verificationCode.every(digit => digit !== '');
        },
        formattedTime() {
            let minutes = String(Math.floor(this.resendTimer / 60)).padStart(2, "0");
            let seconds = String(this.resendTimer % 60).padStart(2, "0");
            return `${minutes}:${seconds}`;
        }
    },
    methods: {
        formatCardNumber(event) {
            let value = event.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            this.form.cardNumber = formattedValue;
        },
        
        handlePayment() {
            console.log('Processing payment...', this.form);
            // Show verification modal
            this.showVerificationModal = true;
            this.startResendTimer();
        },
        
        closeModal() {
            this.showVerificationModal = false;
            this.verificationCode = ['', '', '', '', ''];
            this.verificationError = null;
        },
        
        onCodeInput(index) {
            const input = this.verificationCode[index];
            // Only digits allowed
            if (!/^\d$/.test(input)) {
                this.verificationCode[index] = '';
                return;
            }
            
            // Move focus to next input
            if (index < this.verificationCode.length - 1) {
                this.$refs.codeInputs[index + 1].focus();
            }
        },
        
        onCodeBackspace(index) {
            if (this.verificationCode[index] === '') {
                if (index > 0) {
                    this.$refs.codeInputs[index - 1].focus();
                }
            }
        },
        
        onCodePaste(event) {
            event.preventDefault();
            const paste = event.clipboardData.getData('text');
            const digits = paste.replace(/\D/g, '').slice(0, this.verificationCode.length);
            
            digits.split('').forEach((digit, i) => {
                this.verificationCode[i] = digit;
            });
            
            // Focus the last filled input
            const nextIndex = digits.length < this.verificationCode.length ? digits.length : this.verificationCode.length - 1;
            this.$nextTick(() => {
                this.$refs.codeInputs[nextIndex].focus();
            });
        },
        
        verifyCode() {
            const code = this.verificationCode.join('');
            console.log('Verifying code:', code);
            
            // Simulate verification
            if (code === '56727') {
                this.verificationError = null;
                alert('تم التحقق بنجاح! سيتم معالجة الدفع.');
                this.closeModal();
                // Here you would process the actual payment
            } else {
                this.verificationError = 'رمز التحقق غير صحيح';
            }
        },
        
        resendCode() {
            console.log('Resending verification code...');
            this.verificationError = null;
            this.startResendTimer();
            // Here you would call API to resend code
        },
        
        startResendTimer() {
            this.resendTimer = 60;
            this.timer = setInterval(() => {
                if (this.resendTimer > 0) {
                    this.resendTimer--;
                } else {
                    clearInterval(this.timer);
                }
            }, 1000);
        }
    },
    beforeUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}
</script>

<style scoped>
/* Main Content */
.payment-content {
    padding: 2rem 0;
    max-width: 1400px;
    margin: 0 auto;
}


/* Form Sections */
.form-sections {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
    margin-top: 2rem;
}

.form-column {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.section-title {
    color: #2d5a27;
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid #2d5a27;
    padding-bottom: 0.5rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #333;
}

.sub-label {
    font-size: 0.9rem;
    color: #666;
    font-weight: 400;
}

.form-control {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.form-control:focus {
    outline: none;
    border-color: #2d5a27;
    box-shadow: 0 0 0 3px rgba(45, 90, 39, 0.1);
}

/* Card Information Styles */

.card-display {
    margin-bottom: 1.5rem;
    position: relative;
    display: flex;
    justify-content: center;
}

.card-image-container {
    position: relative;
    max-width: 100%;
    transition: all 0.3s ease;
}

.card-image {
    width: 100%;
    height: auto;
    max-width: 400px;
    display: block;
}

/* Card Hover Effects */
.card-display:hover .card-image-container {
    transform: translateY(-5px);
}

.form-row {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
}

.expiry-inputs {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.expiry-inputs input {
    flex: 1;
}

.expiry-inputs span {
    font-weight: 600;
    color: #666;
}

/* Payment Frequency */
.payment-frequency {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #eee;
}

.payment-frequency h5 {
    color: #333;
    margin-bottom: 1rem;
    font-weight: 600;
}

.radio-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.radio-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 8px;
    transition: background-color 0.3s;
}

.radio-option:hover {
    background-color: #f8f9fa;
}

.radio-option input[type="radio"] {
    display: none;
}

.radio-custom {
    width: 20px;
    height: 20px;
    border: 2px solid #ddd;
    border-radius: 50%;
    position: relative;
    transition: all 0.3s;
}

.radio-option input[type="radio"]:checked + .radio-custom {
    border-color: #2d5a27;
    background-color: #2d5a27;
}

.radio-option input[type="radio"]:checked + .radio-custom::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background-color: white;
    border-radius: 50%;
}

/* Reach Info Styles */
.payment-confirmation {
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
    color: #666;
    font-size: 0.95rem;
    text-align: center;
}

.amount-input-group {
    display: flex;
    gap: 0.5rem;
}

.amount-input-group input {
    flex: 2;
}

.currency-select {
    flex: 1;
    min-width: 80px;
}

textarea.form-control {
    resize: vertical;
    min-height: 100px;
}

/* Pay Now Button */
.btn-pay-now {
    width: 100%;
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 1rem;
}

.btn-pay-now:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
}

.btn-pay-now:active {
    transform: translateY(0);
}

/* Verification Modal Styles */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
    text-align: center;
    margin-bottom: 2rem;
}

.modal-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
}

.modal-subtitle {
    color: #666;
    font-size: 0.95rem;
    margin: 0;
}

.verification-inputs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.code-input {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
    text-align: center;
    border: 2px solid #dee2e6;
    border-radius: 12px;
    transition: all 0.3s ease;
    font-weight: 600;
}

.code-input:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    outline: none;
}

.error-message {
    color: #dc3545;
    text-align: center;
    margin-bottom: 1rem;
    font-size: 0.9rem;
}

.btn-verify {
    width: 100%;
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 1.5rem;
}

.btn-verify:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
}

.btn-verify:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

.resend-section {
    text-align: center;
}

.resend-text {
    color: #666;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}

.btn-resend {
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    font-size: 0.9rem;
    text-decoration: underline;
    transition: color 0.3s ease;
}

.btn-resend:hover:not(:disabled) {
    color: #0056b3;
}

.btn-resend:disabled {
    color: #999;
    cursor: not-allowed;
    text-decoration: none;
}

/* Responsive Design */
@media (max-width: 1200px) {
    .form-sections {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .form-row {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .payment-content {
        padding: 1rem 0;
    }
    
    .form-column {
        padding: 1.5rem;
    }
    
    .modal-content {
        padding: 1.5rem;
        margin: 1rem;
    }
    
    .verification-inputs {
        gap: 0.5rem;
    }
    
    .code-input {
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
    }
}
</style>
