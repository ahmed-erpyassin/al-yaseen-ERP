<template>
    <nav aria-label="breadcrumb" class="breadcrumb-nav" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
        <ol class="breadcrumb" :class="{ 'rtl-breadcrumb': locale === 'ar' }">
            <li v-for="(item, index) in breadcrumbItems" :key="index" 
                class="breadcrumb-item" 
                :class="{ 'active': index === breadcrumbItems.length - 1 }">
                <router-link v-if="index < breadcrumbItems.length - 1" 
                            :to="item.route" 
                            class="breadcrumb-link">
                    {{ item.label }}
                </router-link>
                <span v-else class="breadcrumb-current">
                    {{ item.label }}
                </span>
            </li>
        </ol>
    </nav>
</template>

<script>
export default {
    name: 'BreadcrumbComponent',
    props: {
        items: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    computed: {
        breadcrumbItems() {
            return this.items.map(item => ({
                label: this.$t(item.label),
                route: item.route
            }));
        },
        locale() {
            return this.$i18n.locale;
        }
    }
}
</script>

<style scoped>

.breadcrumb {
    background: transparent;
    padding: 0;
    margin: 0;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    direction: ltr;
}

.breadcrumb-item {
    display: flex;
    align-items: center;
}

.breadcrumb-item:not(:last-child)::after {
    content: ">";
    margin: 0 0.5rem;
    color: white;
    font-weight: 500;
}

.breadcrumb-item.active .breadcrumb-current {
    color: white;
    font-weight: 500;
}

.breadcrumb-link {
    color: white;
    text-decoration: none;
    transition: color 0.2s ease;
    opacity: 0.8;
}

.breadcrumb-link:hover {
    color: white;
    text-decoration: underline;
    opacity: 1;
}

/* RTL Support */
.rtl-breadcrumb {
    direction: rtl;
}

.rtl-breadcrumb .breadcrumb-item:not(:last-child)::after {
    content: "<";
    margin: 0 0.5rem;
}

/* Global RTL Support */
[dir="rtl"] .breadcrumb {
    direction: rtl;
}

[dir="rtl"] .breadcrumb-item:not(:last-child)::after {
    content: "<";
    margin: 0 0.5rem;
}

/* LTR Support - English */
[dir="ltr"] .breadcrumb-item:not(:last-child)::after {
    content: ">";
    margin: 0 0.5rem;
}
</style>
