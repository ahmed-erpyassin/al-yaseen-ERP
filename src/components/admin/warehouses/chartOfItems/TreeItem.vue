<template>
    <li class="tree-item">
        <!-- Tree label (clickable to toggle children) -->
        <div @click="toggle" class="tree-label">

            <!-- Folder icon using Bootstrap Icons -->
            <!-- Blue when closed, yellow when open -->
            <i v-if="hasChildren" :class="open ? 'bi bi-folder2-open folder-icon open' : 'bi bi-folder folder-icon'">
            </i>

            <!-- Item ID -->
            <span class="item-number">{{ item.id }}</span>

            <!-- Item name -->
            <span class="item-name">{{ item.name }}</span>
        </div>

        <!-- Children items -->
        <ul v-show="open" v-if="hasChildren" class="tree-children">
            <TreeItem v-for="child in item.children" :key="child.id" :item="child" ref="treeItems" />
        </ul>
    </li>
</template>

<script>
export default {
    name: 'TreeItem',
    props: {
        item: { type: Object, required: true }
    },
    components: {
        TreeItem: () => import('./TreeItem.vue')
    },
    data() {
        return { open: false };
    },
    computed: {
        // Check if the item has children
        hasChildren() {
            return this.item?.children?.length > 0;
        }
    },
    methods: {
        // Toggle open state
        toggle() {
            if (this.hasChildren) this.open = !this.open;
        },
        // Recursively open/close all children
        setOpen(value) {
            this.open = value;
            if (this.hasChildren && this.$refs.treeItems)
                this.$refs.treeItems.forEach(child => child.setOpen(value));
        }
    }
}
</script>

<style scoped>
.tree-item {
    margin-bottom: 0.25rem;
    position: relative;
}

.tree-children {
    padding-left: 1.5rem;
    border-left: 2px dashed #e5e7eb;
    margin-left: 0.5rem;
}

.tree-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.6rem;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
}

.tree-label:hover {
    background-color: #f0f9ff;
    transform: scale(1.02);
}

/* Folder icon styling */
.folder-icon {
    font-size: 2rem;
    /* Large icon */
    color: green;
    /* Default green */
    transition: color 0.2s;
    /* Smooth color transition */
}

/* Folder icon color when open */
.folder-icon.open {
    color: #facc15;
    /* Yellow when open */
}

/* Item ID */
.item-number {
    font-size: 0.8rem;
    color: #6b7280;
    width: 45px;
    text-align: right;
    flex-shrink: 0;
}

/* Item name */
.item-name {
    font-size: 1rem;
    color: #111827;
    white-space: nowrap;
}
</style>
