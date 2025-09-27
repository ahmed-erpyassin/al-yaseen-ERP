<template>
    <div class="container mx-auto p-4 bg-white shadow rounded">
        <h3 class="text-xl font-bold mb-4">شجرة الأصناف</h3>
        <ul class="list-unstyled">
            <tree-item v-for="item in items" :key="item.id" :item="item"></tree-item>
        </ul>
    </div>
</template>
<script>
import TreeItem from './TreeItem.vue';
import axios from 'axios'; // أو يمكنك استخدام fetch

export default {
    components: { TreeItem },
    data() {
        return {
            items: []
        };
    },
    async created() {
        await this.loadItems();
    },
    methods: {
        async loadItems() {
            try {
                const response = await axios.get('/api/AlYaseen.json'); // بدون "public/"
                this.items = response.data;
                this.assignIds(this.items);
            } catch (error) {
                console.error('Failed to load JSON:', error);
            }
        },
        assignIds(items, level = 1, parentId = null, childStep = 100) {
            items.forEach((item, index) => {
                if (level === 1) {
                    item.id = item.id || 10000;
                } else if (level === 2) {
                    item.id = parentId + childStep * (index + 1);
                } else {
                    item.id = parentId + index + 1;
                }

                if (item.children && item.children.length) {
                    this.assignIds(item.children, level + 1, item.id, childStep);
                }
            });
        }
    }
}
</script>
