<template>

    <section class="stats-section py-5 text-center text-white">
        <div class="container">
            <p class="fs-5 fw-semibold mb-2">
                {{ $t('landing.stats.title') }}
            </p>
            <p class="text-white-50 mb-5">
                {{ $t('landing.stats.subtitle') }}
            </p>

            <div class="row g-4 justify-content-center">
                <div class="col-6 col-md-3">
                    <div class="stat-item">
                        <div
                            class="icon text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                            <i class="bi bi-people fs-4"></i>
                        </div>
                        <h5 class="fw-bold">10,000K+</h5>
                        <p class="small text-white-50 mb-0">{{ $t('landing.stats.items.clients') }}</p>
                    </div>
                </div>

                <div class="col-6 col-md-3">
                    <div class="stat-item">
                        <div
                            class="icon text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                            <i class="bi bi-graph-up-arrow fs-4"></i>
                        </div>
                        <h5 class="fw-bold">99.9%</h5>
                        <p class="small text-white-50 mb-0">{{ $t('landing.stats.items.accuracy') }}</p>
                    </div>
                </div>

                <div class="col-6 col-md-3">
                    <div class="stat-item">
                        <div
                            class="icon text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                            <i class="bi bi-stopwatch fs-4"></i>
                        </div>
                        <h5 class="fw-bold">50%</h5>
                        <p class="small text-white-50 mb-0">{{ $t('landing.stats.items.time_saved') }}</p>
                    </div>
                </div>

                <div class="col-6 col-md-3">
                    <div class="stat-item">
                        <div
                            class="icon text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                            <i class="bi bi-award fs-4"></i>
                        </div>
                        <h5 class="fw-bold">15+ Years</h5>
                        <p class="small text-white-50 mb-0">{{ $t('landing.stats.items.experience') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>


<script>

export default {

    name: "StatsComponent"

}


</script>

<style scoped>
.stats-section {
    background-color: #0e1d34;
}
.icon {
    width: 60px;
    height: 60px;
    background-color: #0FD46C;
}
</style>