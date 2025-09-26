<template>

    <section class="hero">
        <div class="container">

            <div class="row">
                <div class="col-md-6">
                    <div class="img">
                        <img src="@/assets/hero.png" alt="hero" class="w-100">
                    </div>
                </div>
                <div class="col-md-6">
                    <h1 class="mb-5 fw-bold">{{ $t('landing.hero_heading') }}</h1>
                    <p>{{ $t('landing.hero_lead') }}</p>
                    <div class="d-flex align-items-center justify-content-end">
                        <button class="btn btn-main rounded-1">{{ $t('label.subscribe_now') }}</button>
                    </div>
                </div>
            </div>
        </div>

    </section>

</template>


<script>

export default {

    name: "HeroComponent",


}

</script>

<style scoped>

    
</style>