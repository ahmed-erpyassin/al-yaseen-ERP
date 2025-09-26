<template>

    <section class="industry-support py-5 text-center">
        <div class="container">
            <p class="fs-4 fw-bold mb-2">
                {{ $t('landing.industry_support.title') }}
            </p>

            <h2 class="fw-bold mb-3">
                {{ $t('landing.industry_support.headline.part1') }}
                <span class="text-success">{{ $t('landing.industry_support.headline.company') }}</span>,
                {{ $t('landing.industry_support.headline.part2') }}
                <span class="text-success">{{ $t('landing.industry_support.headline.efficiency') }}</span>
                {{ $t('landing.industry_support.headline.and') }}
                <span class="text-success">{{ $t('landing.industry_support.headline.professionalism') }}</span>
            </h2>

            <p class="text-muted mx-auto" style="max-width: 700px;">
                {{ $t('landing.industry_support.description') }}
            </p>

            <p class="fw-semibold mt-4">
                {{ $t('landing.industry_support.slogan.part1') }}
                <span class="text-success">{{ $t('landing.industry_support.slogan.elevate') }}</span>
                {{ $t('landing.industry_support.slogan.part2') }}
                <span class="text-success">{{ $t('landing.industry_support.slogan.grow') }}</span>,
                {{ $t('landing.industry_support.slogan.part3') }}
                <span class="text-success">{{ $t('landing.industry_support.slogan.top') }}</span>.
            </p>

            <a href="#" class="btn btn-link text-primary text-decoration-none fw-semibold mt-3">
                {{ $t('landing.industry_support.link') }} →
            </a>

            <div class="mt-5">
                <img src="@/assets/industry.png" alt="Professionals from different industries" class="img-fluid"
                    style="max-height: 300px" />
            </div>
        </div>
    </section>

</template>


<script>

export default {

    name: "IndustryComponent"

}

</script>

<style scoped>
.industry-support {
    background-color: #f6fdfb;
}

</style>