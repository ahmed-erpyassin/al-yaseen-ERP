<template>

    <div class="container">

        <div class="container">

            <!-- No Company Name -->
            <div class="heading text-center my-4">
                <i class="bi bi-building-slash fs-1 text-secondary"></i>
                <h5>No company name</h5>
            </div>

            <!-- Cards Grid -->
            <!-- <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4">
                <div class="col" v-for="card in cards" :key="card.title">
                    <div class="card h-100 shadow-sm">
                        <div class="card-body">
                            <div class="d-flex justify-content-between mb-2">
                                <small>{{ card.date }}</small>
                                <small>{{ card.title }}</small>
                            </div>
                            <div>
                                <img :src="card.chart" alt="Chart" class="img-fluid mb-2" />
                                <h5 class="fw-bold">${{ card.amount }}</h5>
                                <p class="text-muted small">{{ card.subtitle }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->

        </div>
    </div>

</template>

<script>

export default {

    name: "DashboardComponent",


}


</script>

<style scoped></style>