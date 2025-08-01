<template>

    <section class="consultation-cta py-5 text-center">
        <div class="container">
            <p class="fs-5 fw-semibold">
                {{ $t('landing.consultation_cta.text') }}
            </p>

            <div class="d-flex justify-content-center flex-wrap gap-3 mt-4">
                <button class="btn btn-main px-4">
                    {{ $t('landing.consultation_cta.buttons.free_consultation') }}
                </button>
                <button class="btn btn-transparent text-main px-4">
                    {{ $t('landing.consultation_cta.buttons.talk_to_expert') }}
                </button>
            </div>
        </div>
    </section>

</template>


<script>

export default {

    name: "ConsultationComponent",
}
</script>

<style scoped>

</style>