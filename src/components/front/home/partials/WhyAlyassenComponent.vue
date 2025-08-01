<template>
    <section class="why-alyaseen py-5 text-center">
        <div class="container">
            <h2 class="mb-4 fw-bold">{{ $t('landing.why_alyaseen.title') }}</h2>
            <p class="text-muted mb-5">
                {{ $t('landing.why_alyaseen.description') }}
            </p>

            <div class="row g-4">
                <div class="col-md-4" v-for="(feature, key) in features" :key="key">
                    <div class="feature-box p-4 bg-light rounded shadow-sm h-100">
                        <i :class="feature.icon + ' fs-1 text-success mb-3'"></i>
                        <h5 class="fw-bold mb-2">{{ $t(feature.title) }}</h5>
                        <p class="text-muted small">
                            {{ $t(feature.desc) }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const features = [
    {
        icon: 'bi bi-calculator',
        title: 'landing.why_alyaseen.features.smart_accounting.title',
        desc: 'landing.why_alyaseen.features.smart_accounting.desc'
    },
    {
        icon: 'bi bi-file-earmark-text',
        title: 'landing.why_alyaseen.features.invoice_management.title',
        desc: 'landing.why_alyaseen.features.invoice_management.desc'
    },
    {
        icon: 'bi bi-bar-chart',
        title: 'landing.why_alyaseen.features.financial_reports.title',
        desc: 'landing.why_alyaseen.features.financial_reports.desc'
    },
    {
        icon: 'bi bi-wallet2',
        title: 'landing.why_alyaseen.features.expense_tracking.title',
        desc: 'landing.why_alyaseen.features.expense_tracking.desc'
    },
    {
        icon: 'bi bi-people',
        title: 'landing.why_alyaseen.features.customer_management.title',
        desc: 'landing.why_alyaseen.features.customer_management.desc'
    },
    {
        icon: 'bi bi-shield-lock',
        title: 'landing.why_alyaseen.features.high_security.title',
        desc: 'landing.why_alyaseen.features.high_security.desc'
    },
    {
        icon: 'bi bi-clock-history',
        title: 'landing.why_alyaseen.features.time_management.title',
        desc: 'landing.why_alyaseen.features.time_management.desc'
    },
    {
        icon: 'bi bi-graph-up',
        title: 'landing.why_alyaseen.features.smart_analytics.title',
        desc: 'landing.why_alyaseen.features.smart_analytics.desc'
    },
    {
        icon: 'bi bi-pie-chart',
        title: 'landing.why_alyaseen.features.statistics_insights.title',
        desc: 'landing.why_alyaseen.features.statistics_insights.desc'
    }
];
</script>


<style scoped>
.feature-box {
    transition: 0.3s;
}

.feature-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}
</style>