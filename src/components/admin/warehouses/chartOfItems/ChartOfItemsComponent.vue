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

export default {
    components: { TreeItem },
    data() {
        return {
            items: [
                {
                    id: 10000,
                    name: 'الأصول الثابتة',
                    children: [
                        {
                            name: 'رأس المال',
                            children: [
                                { name: 'رأس المال الفرعي 1' },
                                { name: 'رأس المال الفرعي 2' }
                            ]
                        },
                        {
                            name: '2 رأس المال',
                            children: []
                        }
                    ]
                },
                {
                    id: 20000,
                    name: 'الأصول المتداولة',
                    children: [
                        {
                            name: 'أصول أخرى',
                            children: [
                                { name: 'أصول فرعية أ' },
                                { name: 'أصول فرعية ب' }
                            ]
                        }
                    ]
                }
            ]
        };
    },
    created() {
        // Call the method to assign IDs after the component is created
        this.assignIds(this.items);
    },
    methods: {
        /**
         * Dynamically assign numeric IDs to tree items
         * @param {Array} items - Array of tree items
         * @param {Number} level - Current depth level (1=root, 2=children, 3=grandchildren)
         * @param {Number} parentId - ID of the parent item
         * @param {Number} childStep - Increment step for direct children
         */
        assignIds(items, level = 1, parentId = null, childStep = 100) {
            items.forEach((item, index) => {
                if (level === 1) {
                    // Root item: keep its original ID
                    item.id = item.id || 10000;
                } else if (level === 2) {
                    // Direct children: ID = parent ID + step * (index + 1)
                    item.id = parentId + childStep * (index + 1);
                } else {
                    // Grandchildren and deeper: ID = parent ID + index + 1
                    item.id = parentId + index + 1;
                }

                // If the item has children, recursively assign IDs
                if (item.children && item.children.length) {
                    this.assignIds(item.children, level + 1, item.id, childStep);
                }
            });
        }
    }
}
</script>
