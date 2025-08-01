<template>

    <div class="d-flex justify-content-between align-items-center mb-4 navbar">
        <div class="container">

            <div>
                <i class="bi bi-chevron-left fw-bold aside-trigger me-2"></i>
            </div>
            <div>
                <div class="links d-flex align-items-center">
                    <!-- Gear Icon -->
                    <i class="bi bi-gear-fill fs-4 me-3"></i>

                    <!-- Checklist Icon -->
                    <i class="bi bi-clipboard-check fs-4 me-3"></i>

                    <!-- Bell Icon with Red Notification Dot -->
                    <div class="position-relative me-3">
                        <i class="bi bi-bell-fill fs-4"></i>
                        <span
                            class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                            <span class="visually-hidden">New alerts</span>
                        </span>
                    </div>

                    <!-- Grid Icon -->
                    <i class="bi bi-grid-3x3-gap-fill fs-4 me-3"></i>

                    <!-- Person Icon -->
                    <i class="bi bi-person-circle fs-4 me-3"></i>

                    <!-- Search Icon -->
                    <i class="bi bi-search fs-4 me-3"></i>
                    <div class="user d-flex align-items-center">
                        <img src="@/assets/avatar.jpg" alt="User" class="rounded-circle" width="40" height="40" />
                        <div class="info ms-3">
                            <p class="mb-0">Ahmed Essam</p>
                            <div class="d-flex align-items-center ">
                                <p class="mb-0 me-2">17.10.2026</p>
                                <p class="mb-0">15:30 Pm</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

</template>

<script>

export default {

    name: "NavbarComponent",

}

</script>

<style scoped>
.navbar {
    background-color: #1D7342;
    height: 96px;
    border-radius: 0 10px 10px 0;
    color: #FFF;
}

.aside-trigger {
    font-size: 35px;
}

.links>i {
    font-size: 30px;
}

.info {
    color: #DBD9D9;
}
</style>