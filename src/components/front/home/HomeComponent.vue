<template>
    <header class='top-header'>
        <nav class="navbar navbar-expand-lg bg-white border-bottom shadow-sm">
            <div class="container">
                <!-- Right side: Logo and Name -->
                <a class="navbar-brand d-flex align-items-center" href="#">
                    <NavbarLogoComponent />
                </a>

                <!-- Left side: Links -->
                <div class="ms-auto d-flex align-items-center">
                    <div class="d-flex align-items-center justify-content-start me-5 cursor-pointer"
                        style="cursor: pointer;" @click="switchLanguage">
                        <img src="@/assets/icons/translate.png" alt="translate" width="24" height="24">
                        <span>{{ $t('label.language') }}</span>
                    </div>
                    <router-link :to="{ name: 'auth.login' }" class="nav-link text-dark me-5">
                        {{ $t('label.login') }}
                    </router-link>
                    <router-link :to="{ name: 'auth.register' }" class="btn btn-main rounded-1">
                        {{ $t('label.trial') }}
                    </router-link>
                </div>
            </div>
        </nav>
    </header>

    <!-- Sections -->
    <HeroComponent />
    <WhyAlyassenComponent />
    <ConsultationComponent />
    <StatsComponent />
    <IndustryComponent />
    <AccountingComponent />
    <WorkFlowComponent />
    <PricingComponent />
    <CtaComponent />
</template>

<script>
import { useI18n } from 'vue-i18n';
import HeroComponent from './partials/HeroComponent.vue';
import WhyAlyassenComponent from './partials/WhyAlyassenComponent.vue';
import PricingComponent from './partials/PricingComponent.vue';
import ConsultationComponent from './partials/ConsultationComponent.vue';
import StatsComponent from './partials/StatsComponent.vue';
import IndustryComponent from './partials/IndustryComponent.vue';
import AccountingComponent from './partials/AccountingComponent.vue';
import WorkFlowComponent from './partials/WorkFlowComponent.vue';
import CtaComponent from './partials/CtaComponent.vue';
import NavbarLogoComponent from '../components/NavbarLogoComponent.vue';

export default {
    name: "HomeComponent",
    components: {
        NavbarLogoComponent,
        HeroComponent,
        WhyAlyassenComponent,
        ConsultationComponent,
        StatsComponent,
        IndustryComponent,
        AccountingComponent,
        WorkFlowComponent,
        PricingComponent,
        CtaComponent
    },
    setup() {
        const { locale } = useI18n()

        const switchLanguage = () => {
            locale.value = locale.value === 'ar' ? 'en' : 'ar'
            localStorage.setItem('lang', locale.value)
            document.dir = locale === 'ar' ? 'rtl' : 'ltr';
            document.lang = locale;
            window.location.reload();
        }

        return {
            switchLanguage
        }
    }
}
</script>

<style scoped>
header,
.navbar {
    height: 96px;
}

.navbar {
    box-shadow: none !important;
    border: none !important;
}

.circle-decor {
    bottom: 0;
    left: 0;
    width: 188px;
    height: 188px;
    position: absolute;
}

.circle-decor::before,
.circle-decor::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    width: 188px;
    height: 188px;
}

.circle-decor::before {
    background-color: #1e1e2f;
    bottom: -70.58px;
    left: 30px;
}

.circle-decor::after {
    background-color: #1D7342;
    bottom: 30px;
    left: -32.04px;
}
</style>
