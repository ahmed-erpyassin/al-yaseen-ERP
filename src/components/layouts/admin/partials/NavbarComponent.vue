<template>
    <div class="d-flex justify-content-between align-items-center mb-4 navbar">
        <div class="container">
            <div class="d-flex align-items-center">
                <i class="bi bi-chevron-left fw-bold aside-trigger me-2" 
                   :class="{ 'rtl-icon': $i18n.locale === 'ar' }"
                   @click="goBack"
                   style="cursor: pointer;"></i>
                <!-- Breadcrumb -->
                <BreadcrumbComponent :items="breadcrumbItems" />
            </div>
            <div>
                <div class="links d-flex align-items-center">
                    <!-- Gear Icon -->
                    <i class="bi bi-gear-fill fs-4 me-3" data-bs-toggle="modal" data-bs-target="#settings"></i>

                    <!-- Checklist Icon -->
                     <router-link :to="{ name: 'admin.tasks' }" class="text-white"><i class="bi bi-clipboard-check fs-4 me-3"></i></router-link>
                    

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

        <div class="modal fade " id="settings" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered " style="max-width: 900px;">
                <div class="modal-content p-4 custom-modal rounded-0">
                    <div class="modal-body">
                        <div class="row text-center">
                            <div class="col-6 border-end pe-4">
                                <h5 class="fw-bold mb-3 text-success">
                                    <i class="bi bi-people-fill me-2"></i> {{ $t('label.account_settings') }}
                                </h5>
                                <ul class="list-unstyled lh-lg">
                                    <li><router-link :to="{ name: 'admin.tools.group-settings' }">{{
                                        $t('label.group_settings') }}</router-link></li>
                                    <li><router-link :to="{ name: 'admin.tools.users' }">{{ $t('label.user_management') }}</router-link></li>
                                    <li><a href="#">{{ $t('label.switch_users') }}</a></li>
                                    <li><a href="#">{{ $t('label.change_language') }}</a></li>
                                    <li><a href="#">{{ $t('label.identifier_number') }}</a></li>
                                    <li><a href="#" @click="logout" class="text-danger">{{ $t('label.logout') || 'Logout' }}</a></li>
                                </ul>
                            </div>

                            <div class="col-6 ps-4">
                                <h5 class="fw-bold mb-3 text-success">
                                    <i class="bi bi-tools me-2"></i> {{ $t('label.tools') }}
                                </h5>
                                <ul class="list-unstyled lh-lg">
                                    <li>
                                        <router-link :to="{ name: 'admin.tools.group-data-copy' }">
                                            {{ $t('label.copy_group_data') }}
                                        </router-link>
                                    </li>

                                    <li>
                                        <router-link :to="{ name: 'admin.tools.group-data-restore' }">
                                            {{ $t('label.restore_group_data') }}
                                        </router-link>
                                    </li>

                                    <li>
                                        <router-link :to="{ name: 'admin.tools.copy-accounts-and-items' }">
                                            {{ $t('label.copy_accounts_from_other_group') }}
                                        </router-link>
                                    </li>

                                    <li>
                                        <router-link :to="{ name: 'admin.tools.group-transaction-copy' }">
                                            {{ $t('label.copy_transactions_from_other_group') }}
                                        </router-link>
                                    </li>

                                    <li>
                                        <router-link :to="{ name: 'admin.tools.currency-revaluation' }">
                                            {{ $t('label.calculate_account_currency_diff') }}
                                        </router-link>
                                    </li>

                                    <li>
                                        <router-link :to="{ name: 'admin.tools.checks-currency-revaluation' }">
                                            {{ $t('label.calculate_network_currency_diff') }}
                                        </router-link>
                                    </li>

                                    <li>
                                        <router-link :to="{ name: 'admin.tools.file-maintenance' }">
                                            {{ $t('label.check_and_maintain_files') }}
                                        </router-link>
                                    </li>

                                    <li>
                                        <router-link :to="{ name: 'admin.tools.group-data-audit' }">
                                            {{ $t('label.audit_group_data') }}
                                        </router-link>
                                    </li>

                                    <li>
                                        <router-link :to="{ name: 'admin.tools.posting-closing' }">
                                            {{ $t('label.post_and_close_transactions') }}
                                        </router-link>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import router from '@/router';
import BreadcrumbComponent from '@/components/components/BreadcrumbComponent.vue';

export default {
    name: "NavbarComponent",
    components: {
        BreadcrumbComponent
    },
    data() {
        return {
            breadcrumbItems: []
        };
    },
    computed: {
        currentBreadcrumb() {
            const route = this.$route;
            const items = [];
            
            // Add home/dashboard
            items.push({ label: 'breadcrumb.home', route: { name: 'admin.dashboard' } });
            
            // Add sales for sales-related routes
            if (route.path.includes('/customers') || route.path.includes('/sales') || route.path.includes('/outgoing-offers')) {
                items.push({ label: 'breadcrumb.sales', route: { name: 'admin.customers' } });
            }
            
            // Add specific page
            if (route.name === 'admin.customers') {
                items.push({ label: 'breadcrumb.customers', route: null });
            } else if (route.name === 'admin.customers.create') {
                items.push({ label: 'breadcrumb.customers', route: { name: 'admin.customers' } });
                items.push({ label: 'breadcrumb.create_customer', route: null });
            } else if (route.name === 'admin.outgoing-offers') {
                items.push({ label: 'breadcrumb.outgoing_offers', route: null });
            } else if (route.name === 'admin.outgoing-offers.create') {
                items.push({ label: 'breadcrumb.outgoing_offers', route: { name: 'admin.outgoing-offers' } });
                items.push({ label: 'breadcrumb.create_offer', route: null });
            } else if (route.name === 'admin.outgoing-offers.edit') {
                items.push({ label: 'breadcrumb.outgoing_offers', route: { name: 'admin.outgoing-offers' } });
                items.push({ label: 'label.edit_offer', route: null });
            } else if (route.name === 'admin.payment-form') {
                items.push({ label: 'breadcrumb.sales', route: { name: 'admin.customers' } });
                items.push({ label: 'breadcrumb.payment_form', route: null });
            } else if (route.name === 'admin.tasks') {
                items.push({ label: 'breadcrumb.tasks', route: null });
            }
            
            return items;
        }
    },
    watch: {
        currentBreadcrumb: {
            handler(newItems) {
                this.breadcrumbItems = newItems;
            },
            immediate: true
        }
    },
    methods: {
        ...mapActions('auth', ['logout']),
        async logout() {
            try {
                // First, close the modal and remove overlay
                const modal = document.getElementById('settings');
                if (modal) {
                    // Check if Bootstrap is available
                    if (window.bootstrap && window.bootstrap.Modal) {
                        const modalInstance = window.bootstrap.Modal.getInstance(modal);
                        if (modalInstance) {
                            modalInstance.hide();
                        }
                    } else {
                        // Fallback: manually hide the modal
                        modal.classList.remove('show');
                        modal.style.display = 'none';
                        modal.setAttribute('aria-hidden', 'true');
                        modal.removeAttribute('aria-modal');
                    }
                    
                    // Immediately remove modal backdrop and reset body classes
                    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
                        backdrop.remove();
                    });
                    
                    // Remove modal-open class from body
                    document.body.classList.remove('modal-open');
                    document.body.style.removeProperty('padding-right');
                    document.body.style.overflow = '';
                }
                
                // Then logout and redirect
                await this.$store.dispatch('auth/logout');
                
                // Small delay to ensure modal cleanup is complete
                setTimeout(() => {
                    router.push({ name: 'auth.login' });
                }, 100);
                
            } catch (error) {
                console.error('Logout error:', error);
            }
        },
        
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>

<style scoped>
.navbar {
    background-color: #1d7342;
    height: 96px;
    border-radius: 0 10px 10px 0;
    color: #fff;
}

.aside-trigger {
    font-size: 35px;
}

.links>i {
    font-size: 30px;
}

.info {
    color: #dbd9d9;
}

/* تنسيق المودال */
.custom-modal {
    background-color: #f8f8f8;
    border-radius: 12px;
    min-height: 500px;
}

.custom-modal h5 {
    color: #1d7342;
}

.custom-modal a {
    text-decoration: none;
    color: #000;
}

.custom-modal a:hover {
    color: #1d7342;
    font-weight: bold;
}

/* RTL Icon Reflection */
.rtl-icon {
    transform: scaleX(-1);
    display: inline-block;
}
</style>



