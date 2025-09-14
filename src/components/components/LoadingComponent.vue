<template>

    <div class="overlay" v-if="isLoading">

        <div class="d-flex  flex-row align-items-center justify-content-center loading w-100 h-100">
            <div class="text-center">

                <img src="@/assets/logo.png" alt="Logo" width="112px" height="99px">
                <p class = 'fw-bold fs-3'>Al Yaseen ERP</p>
                <p class = 'fw-bold fs-4'>Loading...</p>
            </div>
        </div>
    </div>

</template>

<script>

export default {

    name: "LoadingComponent",
    props: ['isLoading'],
    data() {

        return {

            

        }
        
    }

}

</script>


<style scoped>

.overlay {
    position: fixed;
    z-index: 9999;
    background-color: #fff;
    width: 100%;
    height: 100vh;
}
.loading {

    position: relative;
    z-index: 2;

}
</style>