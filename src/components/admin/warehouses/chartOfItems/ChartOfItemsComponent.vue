<template>
    <div class="container mx-auto p-4 bg-white shadow rounded">
        <!-- Page title with translation -->
        <h3 class="text-xl font-bold mb-4">{{ translate('label.item_tree') }}</h3>

        <!-- Tree List -->
        <ul class="list-unstyled">
            <tree-item v-for="item in items" :key="item.id" :item="item"></tree-item>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
import TreeItem from './TreeItem.vue';

const baseUrl = process.env.VUE_APP_API_BASE_URL || "http://localhost:3000";

export default {
    components: { TreeItem },
    data() {
        return {
            items: [],
            apiEnabled: false
        };
    },
    async created() {
        await this.loadItems();
    },
    methods: {
        translate(key) {
            if (this.$t) {
                try { return this.$t(key); } catch (e) { return key; }
            }
            return key;
        },

        async loadItems() {
            if (!this.apiEnabled) {
                this.items = [
                    {
                        item_name: 'Item A',
                        children: [
                            {
                                item_name: 'Sub A1',
                                children: [
                                    { item_name: 'Sub A1-1', children: [] },
                                    { item_name: 'Sub A1-2', children: [] }
                                ]
                            },
                            {
                                item_name: 'Sub A2',
                                children: [
                                    { item_name: 'Sub A2-1', children: [] },
                                    {
                                        item_name: 'Sub A2-2',
                                        children: [
                                            { item_name: 'Sub A2-2-1', children: [] },
                                            { item_name: 'Sub A2-2-2', children: [] }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        item_name: 'Item B',
                        children: [
                            { item_name: 'Sub B1', children: [] },
                            { item_name: 'Sub B2', children: [] }
                        ]
                    },
                    {
                        item_name: 'Item C',
                        children: [
                            {
                                item_name: 'Sub C1',
                                children: [
                                    {
                                        item_name: 'Sub C1-1',
                                        children: [
                                            { item_name: 'Sub C1-1-1', children: [] },
                                            { item_name: 'Sub C1-1-2', children: [] }
                                        ]
                                    }
                                ]
                            },
                            { item_name: 'Sub C2', children: [] }
                        ]
                    }
                ];

                this.assignIds(this.items);
                return;
            }

            try {
                const response = await axios.get(`${baseUrl}/AlYaseen`);
                const data = Array.isArray(response.data) ? response.data : (response.data?.items ?? []);
                this.items = data;
                this.assignIds(this.items);
            } catch (error) {
                console.error('Failed to load JSON:', error);
            }
        },

        // توليد أرقام الأصناف حسب المستويات
        assignIds(items, level = 1, parentId = 10000, childStep = 100) {
            items.forEach((item, index) => {
                if (level === 1) item.id = parentId + index; // الجد
                else if (level === 2) item.id = parentId + childStep * (index + 1); // ابن الجد
                else item.id = parentId + index + 1; // أبناء الأبناء

                if (item.children && item.children.length) {
                    this.assignIds(item.children, level + 1, item.id, childStep);
                }
            });
        }
    }
};
</script>

<style>
.container ul {
    padding-left: 1rem;
}
</style>
