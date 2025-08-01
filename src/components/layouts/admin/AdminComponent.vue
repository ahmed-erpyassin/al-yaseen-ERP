<!-- src/components/Dashboard.vue -->
<template>
    <div class="d-flex min-vh-100 ">

        <AsideComponent />
        <!-- Main content -->
        <main class="flex-fill ">
            <!-- Top bar -->
            <NavbarComponent />
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import AsideComponent from './partials/AsideComponent.vue';
import NavbarComponent from './partials/NavbarComponent.vue';

export default {
    name: "AdminComponent",
    components: {
        AsideComponent,
        NavbarComponent
    },
    data() {
        return {

        }
    },
}
</script>
<style scoped></style>