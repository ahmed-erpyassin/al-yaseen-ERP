<template>

    <section class="accounting-system-section py-5 position-relative">
        <div class="container">
            <div class="row align-items-center g-5">
                <div class="col-lg-6">
                    <h2 class="fw-bold mb-4">
                        {{ $t('landing.accounting.title.part1') }}
                        <span class="text-success">{{ $t('landing.accounting.title.part2') }}</span>
                        {{ $t('landing.accounting.title.part3') }}
                    </h2>

                    <p class="text-muted">
                        {{ $t('landing.accounting.description') }}
                    </p>

                    <ul class="text-warning mt-4 ps-3">
                        <li>{{ $t('landing.accounting.features.chart') }}</li>
                        <li>{{ $t('landing.accounting.features.expense') }}</li>
                        <li>{{ $t('landing.accounting.features.asset') }}</li>
                        <li>{{ $t('landing.accounting.features.cost') }}</li>
                        <li>{{ $t('landing.accounting.features.invoice') }}</li>
                    </ul>
                </div>

                <div class="col-lg-6 text-center">
                    <img src="@/assets/accounting.png" alt="Accounting dashboard illustration" class="img-fluid"
                        style="max-width: 100%; height: auto" />
                </div>
            </div>
        </div>
    </section>

</template>



<script>

export default {
    name: "AccountingComponent"
}

</script>

<style scoped></style>