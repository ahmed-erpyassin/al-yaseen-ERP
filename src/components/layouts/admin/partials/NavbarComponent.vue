<template>
    <div class="d-flex justify-content-between align-items-center mb-4 navbar">
        <div class="container">
            <div class="d-flex align-items-center">
                <i class="bi bi-chevron-left fw-bold aside-trigger me-2" :class="{ 'rtl-icon': $i18n.locale === 'ar' }"
                    @click="goBack" style="cursor: pointer;"></i>
                <!-- Breadcrumb -->
                <BreadcrumbComponent :items="breadcrumbItems" />
            </div>

            <div>
                <div class="links d-flex align-items-center">
                    <!-- Gear Icon -->
                    <i class="bi bi-gear-fill fs-4 me-3" data-bs-toggle="modal" data-bs-target="#settings"></i>

                    <!-- Checklist Icon -->
                    <router-link :to="{ name: 'admin.tasks' }" class="text-white">
                        <i class="bi bi-clipboard-check fs-4 me-3"></i>
                    </router-link>

                    <!-- Bell Icon with Dropdown -->
                    <!-- Notifications (Bell Icon with Badge + Custom Dropdown) -->
                    <div class="position-relative me-3" ref="bellWrapper">
                        <!-- Bell with badge -->
                        <i class="bi bi-bell-fill fs-4" style="cursor:pointer;" @click="toggleNotifications"></i>
                        <span v-if="notifications.length > 0" class="notifications-badge">
                            {{ notifications.length > 99 ? '99+' : notifications.length }}
                        </span>


                        <!-- Custom Dropdown -->
                        <div v-if="showNotifications" class="notifications-dropdown shadow rounded p-3">
                            <h6 class="fw-bold text-success mb-2">📢 {{ $t('label.notifications') }}</h6>
                            <div v-if="notifications.length === 0" class="text-muted small text-center">لا يوجد إشعارات
                            </div>
                            <ul v-else class="list-unstyled mb-0">
                                <li v-for="(n, index) in notifications" :key="index" class="border-bottom py-2 small">
                                    {{ n }}
                                </li>
                            </ul>
                        </div>
                    </div>


                    <!-- Grid Icon (Popup) -->
                    <i class="bi bi-grid-3x3-gap-fill fs-4 me-3" data-bs-toggle="modal" data-bs-target="#appsPopup"></i>

                    <!-- Person Icon (WhatsApp Support) -->
                    <a :href="`https://wa.me/${supportNumber}`" target="_blank">
                        <i class="bi bi-headset fs-4 me-3 text-white"></i>
                    </a>

                    <!-- Search Icon -->
                    <i class="bi bi-search fs-4 me-3" @click="openSearchModal"></i>

                    <!-- User Info -->
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

        <!-- Settings Modal -->
        <div class="modal fade" id="settings" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" style="max-width: 800px;">
                <div class="modal-content p-4 custom-modal">
                    <div class="modal-header border-0">
                        <h4 class="fw-bold text-success"><i class="bi bi-gear-fill me-2"></i>{{ $t('label.settings') }}
                        </h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body row">
                        <div class="col-6 border-end pe-4">
                            <h6 class="fw-bold mb-3 text-success"><i class="bi bi-people-fill me-2"></i> {{
                                $t('label.account_settings') }}</h6>
                            <ul class="list-unstyled lh-lg">
                                <li><router-link :to="{ name: 'admin.tools.group-settings' }">{{
                                    $t('label.group_settings') }}</router-link></li>
                                <li><router-link :to="{ name: 'admin.tools.users' }">{{ $t('label.user_management')
                                        }}</router-link></li>
                                <li><a href="#">{{ $t('label.switch_users') }}</a></li>
                                <li> <a href="#" @click.prevent="changeLanguage">{{ $t('label.change_language') }}</a>
                                </li>
                                <li><a href="#">{{ $t('label.identifier_number') }}</a></li>
                                <li><a href="#" @click="logout" class="text-danger">{{ $t('label.logout') || 'Logout'
                                        }}</a></li>
                            </ul>
                        </div>
                        <div class="col-6 ps-4">
                            <h6 class="fw-bold mb-3 text-success"><i class="bi bi-tools me-2"></i> {{ $t('label.tools')
                                }}</h6>
                            <ul class="list-unstyled lh-lg">
                                <li><router-link :to="{ name: 'admin.tools.group-data-copy' }">{{
                                    $t('label.copy_group_data') }}</router-link></li>
                                <li><router-link :to="{ name: 'admin.tools.group-data-restore' }">{{
                                    $t('label.restore_group_data') }}</router-link></li>
                                <li><router-link :to="{ name: 'admin.tools.copy-accounts-and-items' }">{{
                                    $t('label.copy_accounts_from_other_group') }}</router-link></li>
                                <li><router-link :to="{ name: 'admin.tools.group-transaction-copy' }">{{
                                    $t('label.copy_transactions_from_other_group') }}</router-link></li>
                                <li><router-link :to="{ name: 'admin.tools.currency-revaluation' }">{{
                                    $t('label.calculate_account_currency_diff') }}</router-link></li>
                                <li><router-link :to="{ name: 'admin.tools.checks-currency-revaluation' }">{{
                                    $t('label.calculate_network_currency_diff') }}</router-link></li>
                                <li><router-link :to="{ name: 'admin.tools.file-maintenance' }">{{
                                    $t('label.check_and_maintain_files') }}</router-link></li>
                                <li><router-link :to="{ name: 'admin.tools.group-data-audit' }">{{
                                    $t('label.audit_group_data') }}</router-link></li>
                                <li><router-link :to="{ name: 'admin.tools.posting-closing' }">{{
                                    $t('label.post_and_close_transactions') }}</router-link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Apps Popup -->
        <div class="modal fade" id="appsPopup" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" style="max-width:600px;">
                <div class="modal-content p-4 text-center">
                    <h5 class="text-muted">📦 التطبيقات (قريباً)</h5>
                </div>
            </div>
        </div>

        <!-- Search Modal -->
        <div class="modal fade" id="searchModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" style="max-width:600px;">
                <div class="modal-content p-4">
                    <input type="text" class="form-control" placeholder="🔍 ابحث بين الصفحات..." v-model="searchQuery"
                        @keyup.enter="searchPage" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
// import router from '@/router';
import BreadcrumbComponent from '@/components/components/BreadcrumbComponent.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from 'bootstrap';


export default {
    name: "NavbarComponent",
    components: { BreadcrumbComponent },
    data() {
        return {
            breadcrumbItems: [],
            notifications: ["تمت إضافة مستخدم جديد", "نسخة احتياطية مكتملة ✅"],
            supportNumber: "972599000000", // رقم واتساب الدعم الفني
            searchQuery: "",
            showNotifications: false, // للتحكم في ظهور الإشعارات
        };
    },
    computed: {
        currentBreadcrumb() {
            const route = this.$route;
            const items = [];
            items.push({ label: 'breadcrumb.home', route: { name: 'admin.dashboard' } });

            if (route.path.includes('/customers') || route.path.includes('/sales') || route.path.includes('/outgoing-offers')) {
                items.push({ label: 'breadcrumb.sales', route: { name: 'admin.customers' } });
            }

            if (route.name === 'admin.customers') items.push({ label: 'breadcrumb.customers', route: null });
            else if (route.name === 'admin.tasks') items.push({ label: 'breadcrumb.tasks', route: null });

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
        goBack() {
            this.$router.go(-1);
        },
        loadStyle(href, id) {
            let link = document.getElementById(id);
            if (link) {
                link.href = href;
            } else {
                link = document.createElement("link");
                link.id = id;
                link.rel = "stylesheet";
                link.href = href;
                document.head.appendChild(link);
            }
        },
        // دالة تغيير اللغة
        changeLanguage() {
            const newLang = this.$i18n.locale === 'ar' ? 'en' : 'ar';

            // تغيير لغة i18n
            this.$i18n.locale = newLang;

            // حفظ اللغة في localStorage
            localStorage.setItem("lang", newLang);

            // تغيير اتجاه الصفحة
            document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";

            // إعادة تحميل CSS حسب اللغة
            if (newLang === "ar") {
                this.loadStyle("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css", "bootstrap-css");
                this.loadStyle("/css/rtl.css", "rtl-css");
            } else {
                this.loadStyle("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css", "bootstrap-css");
            }
        },
        openSearchModal() {
            const modalEl = document.getElementById('searchModal');
            if (modalEl) {
                let modalInstance = Modal.getInstance(modalEl);
                if (!modalInstance) {
                    modalInstance = new Modal(modalEl, { backdrop: 'true' });
                }
                modalInstance.show();
            }
        },
        handleClickOutside(event) {
            const bellWrapper = this.$refs.bellWrapper;
            if (bellWrapper && !bellWrapper.contains(event.target)) {
                this.showNotifications = false;
            }
        },
        searchPage() {
            if (this.searchQuery) {
                this.$router.push({ name: 'admin.search', query: { q: this.searchQuery } });
                this.searchQuery = "";

                // إخفاء المودال بعد البحث
                const modalEl = document.getElementById('searchModal');
                const modalInstance = Modal.getInstance(modalEl);
                if (modalInstance) modalInstance.hide();
            }
        },
        toggleNotifications() {
            this.showNotifications = !this.showNotifications;
        }
    },
    mounted() {
        document.addEventListener("click", this.handleClickOutside);

        const modal = document.getElementById('searchModal');
        if (modal) {
            modal.addEventListener('hidden.bs.modal', () => {
                const backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) backdrop.remove();
                document.body.classList.remove('modal-open');
            });

            // إضافة حدث للنقر في أي مكان لإغلاق المودال
            document.addEventListener("click", this.handleClickOutsideSearch);
        }
    },
    beforeUnmount() {
        document.removeEventListener("click", this.handleClickOutside);
        document.removeEventListener("click", this.handleClickOutsideSearch);
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

.links>i {
    cursor: pointer;
}

.custom-modal {
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.custom-modal a {
    text-decoration: none;
    color: #333;
}

.custom-modal a:hover {
    color: #1d7342;
    font-weight: bold;
}

.rtl-icon {
    transform: scaleX(-1);
}

.notifications-dropdown {
    position: absolute;
    top: 40px;
    color: #000;
    right: 0;
    width: 280px;
    background: #fff;
    border-radius: 8px;
    z-index: 1000;
    max-height: 300px;
    overflow-y: auto;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.notifications-badge {
    position: absolute;
    top: -5px;
    /* قرب أعلى الجرس */
    right: -5px;
    /* قرب يمين الجرس */
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    /* مساحة داخلية مناسبة */
    font-size: 0.75rem;
    font-weight: bold;
    color: #fff;
    background-color: #dc3545;
    /* أحمر جذاب */
    border-radius: 50%;
    /* دائرة كاملة */
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
</style>
