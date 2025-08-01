<template>

    <section class="workflow-section py-5 position-relative">
        <div class="container">
            <div class="row align-items-center g-5 flex-lg-row-reverse">
                <div class="col-lg-6 text-center">
                    <img src="@/assets/work-flow.png" alt="Workflow Illustration" class="img-fluid" />
                </div>

                <div class="col-lg-6">
                    <h2 class="fw-bold mb-2">
                        {{ $t('landing.workflow.title.part1') }}
                        <span class="text-success">{{ $t('landing.workflow.title.part2') }}</span><br />
                        {{ $t('landing.workflow.title.part3') }}
                    </h2>

                    <p class="text-muted">
                        {{ $t('landing.workflow.description') }}
                    </p>

                    <ul class="text-warning mt-4 ps-3">
                        <li>{{ $t('landing.workflow.features.time_tracking') }}</li>
                        <li>{{ $t('landing.workflow.features.content_management') }}</li>
                        <li>{{ $t('landing.workflow.features.work_orders') }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

</template>


<script>

export default {

    name: "WorkFlowComponent"

}

</script>

<style scoped>
.workflow-section {
    background-color: #f6fdfb;
}
</style>