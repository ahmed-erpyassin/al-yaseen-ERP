<template>
    <li class="tree-item">
        <div class="item-wrapper">
            <!-- أيقونة المجلد: للتحكم بفتح/إغلاق الأبناء -->
            <i class="bi" :class="isOpen ? 'bi-folder2-open' : 'bi-folder-fill'"
                :style="{ color: isOpen ? 'gold' : 'green' }" @click.stop="toggleOpen"></i>

            <!-- رقم الصنف واسم الصنف -->
            <span class="item-name" @click="goToAddItem(item)">
                {{ item.id }} - {{ item.item_name }}
            </span>
        </div>

        <!-- عرض الأبناء بشكل متكرر عند فتح المجلد -->
        <ul v-if="item.children && item.children.length && isOpen">
            <tree-item v-for="child in item.children" :key="child.id" :item="child" />
        </ul>
    </li>
</template>

<script>
export default {
    name: "TreeItem",
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isOpen: false, // حالة فتح/إغلاق الأبناء
        };
    },
    methods: {
        toggleOpen() {
            this.isOpen = !this.isOpen;
        },
        goToAddItem(item) {
            this.$router.push({
                path: "/admin/warehouses/items/create",
                query: {
                    parentName: item.item_name,
                    parentId: item.id,
                },
            });
        },
    },
};
</script>

<style scoped>
.tree-item {
    list-style: none;
    margin-bottom: 0.5rem;
}

.item-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
}

/* أيقونة المجلد */
.item-wrapper .bi {
    font-size: 1.2rem;
    margin-right: 8px;
    flex-shrink: 0;
}

/* النص */
.item-name {
    font-weight: 500;
    cursor: pointer;
}

/* تأثير hover على الاسم */
.item-name:hover {
    text-decoration: underline;
}
</style>
