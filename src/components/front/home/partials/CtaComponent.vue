<template>
  <section class="feature-cta-section mb-5">
    <div class="container">
      <div class="bg-dark text-white p-5 rounded-1 mt-5 main">

        <div class="mb-3 mb-md-0">
          <h4 class="fw-bold mb-2">{{$t('landing.feature_cta.title')}}</h4>
          <p class="mb-0">
            {{$t('landing.feature_cta.description')}}
          </p>
        </div>

        <div class="d-flex align-items-center justify-content-end mt-2">
          <button class="btn btn-main btn-lg rounded-0 fw-bold px-3 py-2">
            {{$t('landing.feature_cta.button')}}
          </button>
        </div>

      </div>
    </div>
  </section>
</template>



<script>

export default {

    name: "CtaComponent",

}

</script>

<style scoped>
.feature-cta-section .main {
    background-color: #1C283F;
}
</style>