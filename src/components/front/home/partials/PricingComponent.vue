<template>
  <section class="pricing-section py-5">
    <div class="container">
      <!-- Section Heading -->
      <div class="text-center">
        <p class="text-success fw-semibold mb-1 fs-4">
          <i class="bi bi-star-fill"></i> {{$t('landing.pricing.title')}}
        </p>
        <h1 class="fw-bold mb-3">{{$t('landing.pricing.choose_right_plan')}}</h1>
        <h1 class="text-main mb-3">{{$t('landing.pricing.for_business_needs')}}</h1>
        <p class="text-muted">{{$t('landing.pricing.description')}}</p>

        <!-- Billing Toggle (visual only) -->
        <div class="d-flex justify-content-between align-items-center gap-2 mb-4">
          <div class="d-flex align-items-center justify-content-center">
            <span class="fs-4 small me-2 fw-bold">{{$t('landing.pricing.pay_monthly')}}</span>
            <div class="form-check form-switch mb-0">
              <input class="form-check-input mb-0" type="checkbox" id="billingToggle" />
            </div>
          </div>
          <h2>{{$t('landing.pricing.pay_yearly_offer')}}</h2>
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-3">

        <!-- Free Trial -->
        <div class="col">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-body plan">
              <div class="plan-icon"><i class="bi bi-star"></i></div>
              <h3 class="fw-bold">{{$t('landing.pricing.free_trial')}}</h3>
              <p class="text-secondary lead">{{$t('landing.pricing.free_trial_sub')}}</p>
              <div class="d-flex align-items-end">
                <span class="plan-price text-main">{{$t('landing.pricing.free')}}</span>
                <span class="per_month">{{$t('landing.pricing.for_30_days')}}</span>
              </div>
              <ul class="list-unstyled text-start small mt-3">
                <li><i class="bi bi-check"></i> • {{$t('landing.pricing.access_1_user')}}</li>
                <li><i class="bi bi-check"></i> • {{$t('landing.pricing.limited_features')}}</li>
                <li><i class="bi bi-check"></i> • {{$t('landing.pricing.try_before')}}</li>
              </ul>
              <button class="btn btn-outline-secondary rounded-1 w-100 mt-3">{{$t('landing.pricing.start_trial')}}</button>
            </div>
          </div>
        </div>

        <!-- Basic -->
        <div class="col">
          <div class="card h-100 border-0">
            <div class="card-body plan">
              <div class="bg-main p-2 text-center mb-3 fw-bold fs-4 rounded-1">{{$t('landing.pricing.most_popular')}}</div>
              <div class="plan-icon"><i class="bi bi-check" style="color: #0FD46C"></i></div>
              <h3 class="fw-bold">{{$t('landing.pricing.basic_plan')}}</h3>
              <p class="text-secondary lead">{{$t('landing.pricing.for_small')}}</p>
              <div class="d-flex align-items-end">
                <span class="plan-price text-main">99</span>
                <span class="per_month">$ / {{$t('landing.pricing.month')}}</span>
              </div>
              <ul class="list-unstyled text-start small mt-3">
                <li><i class="bi bi-check"></i> • {{$t('landing.pricing.all_features_basic')}}</li>
                <li><i class="bi bi-check"></i> • {{$t('landing.pricing.multi_user')}}</li>
                <li><i class="bi bi-check"></i> • {{$t('landing.pricing.project_tracking')}}</li>
                <li><i class="bi bi-check"></i> • {{$t('landing.pricing.custom_roles')}}</li>
              </ul>
              <button class="btn btn-main rounded-1 w-100 mt-3">{{$t('landing.pricing.subscribe')}}</button>
            </div>
          </div>
        </div>

        <!-- Medium -->
        <div class="col">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-body plan">
              <div class="plan-icon"><i class="bi bi-briefcase"></i></div>
              <h3 class="fw-bold">{{$t('landing.pricing.medium_plan')}}</h3>
              <p class="text-secondary lead">{{$t('landing.pricing.for_medium')}}</p>
              <div class="d-flex align-items-end">
                <span class="plan-price text-main">199</span>
                <span class="per_month">$ / {{$t('landing.pricing.month')}}</span>
              </div>
              <ul class="list-unstyled text-start small mt-3">
                <li><i class="bi bi-check"></i> • {{$t('landing.pricing.all_features_basic')}}</li>
                <li><i class="bi bi-check"></i> • {{$t('landing.pricing.multi_user')}}</li>
                <li><i class="bi bi-check"></i> • {{$t('landing.pricing.project_tracking')}}</li>
                <li><i class="bi bi-check"></i> • {{$t('landing.pricing.custom_roles')}}</li>
              </ul>
              <button class="btn btn-main rounded-1 w-100 mt-3">{{$t('landing.pricing.subscribe')}}</button>
            </div>
          </div>
        </div>

        <!-- Advanced -->
        <div class="col">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-body plan">
              <div class="plan-icon"><i class="bi bi-calculator"></i></div>
              <h3 class="fw-bold">{{$t('landing.pricing.advanced_plan')}}</h3>
              <p class="text-secondary lead">{{$t('landing.pricing.for_large')}}</p>
              <div class="d-flex align-items-end">
                <span class="plan-price text-main">499</span>
                <span class="per_month">$ / {{$t('landing.pricing.month')}}</span>
              </div>
              <ul class="list-unstyled text-start small mt-3">
                <li><i class="bi bi-check"></i> • {{$t('landing.pricing.all_features_basic')}}</li>
                <li><i class="bi bi-check"></i> • {{$t('landing.pricing.multi_user')}}</li>
                <li><i class="bi bi-check"></i> • {{$t('landing.pricing.project_tracking')}}</li>
                <li><i class="bi bi-check"></i> • {{$t('landing.pricing.custom_roles')}}</li>
              </ul>
              <button class="btn btn-main rounded-1 w-100 mt-3">{{$t('landing.pricing.subscribe')}}</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>



<script>

export default {

    name: "PricingComponent"

}


</script>

<style scoped>
.form-switch .form-check-input {
    width: 87px;
    height: 44px;
}

.form-switch .form-check-input:focus {
    background-image: var(--bs-form-switch-bg) !important;
}

.switch input:checked+.slider {
    background-color: #1D7342;
}

.switch input:checked+.slider::before {
    transform: translateX(18px);
}

.plan .plan-icon {

    text-align: left;
    width: 56px;
    height: 56px;
    background-color: #F2F0F0;
    display: flex;
    align-items: center;
    justify-content: center;

}

.plan .plan-icon i::before {
    font-size: 40px;
}

.plan h3 {
    font-size: 36px;
    margin-top: 20px;
}

.plan .plan-price {
    font-size: 64px;
    font-weight: 500;
}

.plan .per_month {
    color: #9A9A9A;
    font-size: 20px
}

.plan ul {
    list-style: none;
}

.plan ul li i {
    font-size: 24px;
    color: #0FD46C;
}

.plan-header {
    color: #18c184;
    font-weight: 600;
    margin-bottom: 10px;
}

.highlight {
    color: #18c184;
}

.discount-text {
    color: #555;
    font-size: 0.9rem;
}

.card {
    box-shadow: none !important;

}

.plan-card {
    background: white;
    border: none;
    box-shadow: none;
    border-radius: 10px;
    padding: 25px;
    position: relative;
    transition: all 0.3s ease-in-out;

}

.plan-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.popular {
    border: 2px solid #18c184;
}

.popular-badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #18c184;
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 4px 12px;
    border-radius: 20px;
}

.plan-type {
    font-size: 1.1rem;
    margin-bottom: 10px;
}

.price {
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 15px;
}

.price span {
    font-size: 0.9rem;
    color: #777;
}
.features {
    text-align: left;
    list-style: none;
    padding: 0;
    margin: 0 0 20px 0;
    color: #333;
    font-size: 0.9rem;
}

.features li {
    margin-bottom: 8px;
}

.billing-toggle .switch {
    position: relative;
    display: inline-block;
    width: 42px;
    height: 22px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.3s;
    border-radius: 34px;
}

.slider::before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
}

</style>