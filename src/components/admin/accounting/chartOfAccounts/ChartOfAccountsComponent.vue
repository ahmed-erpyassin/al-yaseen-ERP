<template>
    <div class="container-fluid pe-5 ps-5">
        <!-- العنوان -->
        <div class="d-flex align-items-center justify-content-between mb-4">
            <h1 class="text-main">
                <i class="bi bi-diagram-3 me-2"></i>{{ $t('label.chart_of_accounts') || "دليل الحسابات" }}
            </h1>
            <div>
                <button class="btn btn-outline-secondary me-3" @click="resetSelection">
                    <i class="bi bi-x-circle me-2"></i>{{ $t('buttons.cancel') || "إلغاء" }}
                </button>
                <div class="dropdown d-inline-block">
                    <button class="btn btn-main dropdown-toggle text-light" type="button" data-bs-toggle="dropdown">
                        <i class="bi bi-save2 me-2"></i>{{ $t('buttons.save') || "حفظ" }}
                    </button>
                    <ul class="dropdown-menu">
                        <li>
                            <a class="dropdown-item" href="#">
                                <i class="bi bi-printer me-2"></i>{{ $t('buttons.save&print') || "حفظ وطباعة" }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- المحتوى -->
        <div class="row">
            <!-- الشجرة -->
            <div class="col-md-8">
                <div class="tree-view p-3 border rounded bg-white shadow-sm">
                    <ul class="list-unstyled mb-0">
                        <TreeNode v-for="node in chartData" :key="node.id" :node="node" :selectedId="selectedNodeId"
                            @node-selected="selectNode" />
                    </ul>
                </div>
            </div>

            <!-- البيانات الجانبية -->
            <div class="col-md-4">
                <div class="p-3 border rounded bg-light shadow-sm">
                    <h5 class="text-main mb-3">بيانات الحساب المختار</h5>

                    <div v-if="selectedNode">
                        <p><strong>رقم الحساب:</strong> {{ selectedNode.id }}</p>
                        <p><strong>اسم الحساب:</strong> {{ selectedNode.name }}</p>
                        <p><strong>عدد الأبناء:</strong> {{ selectedNode.children?.length || 0 }}</p>
                    </div>
                    <div v-else class="text-muted">لم يتم اختيار أي حساب.</div>

                    <hr />

                    <ul class="list-unstyled fs-5">
                        <li class="mb-3 pointer" @click="expandAll">
                            <i class="bi bi-plus-circle text-success me-2"></i>توسيع الكل (F2)
                        </li>
                        <li class="mb-3 pointer" @click="collapseAll">
                            <i class="bi bi-dash-circle text-danger me-2"></i>إغلاق الكل (F3)
                        </li>
                        <li class="mb-3"><i class="bi bi-journal-text text-main me-2"></i>حركات المحاسبة (F4)</li>
                        <li class="mb-3"><i class="bi bi-box-seam text-main me-2"></i>حركات المخزن (F5)</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ChartOfAccountsComponent",
    components: {
        TreeNode: {
            name: "TreeNode",
            props: ["node", "selectedId"],
            data() {
                return { expanded: this.node._expanded ?? true };
            },
            methods: {
                toggle() {
                    this.expanded = !this.expanded;
                    this.node._expanded = this.expanded;
                },
                select() {
                    // ✅ نُرسل الحدث بشكل واضح للأب الأعلى
                    this.$emit("node-selected", this.node.id);
                },
            },
            template: `
        <li class="tree-item mb-1">
          <div
            class="item-wrapper pointer"
            :class="{'bg-selected': selectedId === node.id}"
            @click="select"
          >
            <i
              v-if="node.children && node.children.length"
              class="bi me-2"
              :class="expanded ? 'bi-folder2-open' : 'bi-folder-fill'"
              :style="{ color: expanded ? 'gold' : 'green' }"
              @click.stop="toggle"
            ></i>
            <i v-else class="bi bi-file-earmark-text me-2 text-secondary"></i>
            <span class="item-name">{{ node.id }} - {{ node.name }}</span>
          </div>

          <ul v-if="expanded && node.children && node.children.length" class="ms-4 mt-2 list-unstyled">
            <TreeNode
              v-for="child in node.children"
              :key="child.id"
              :node="child"
              :selectedId="selectedId"
              @node-selected="$emit('node-selected', $event)"
            />
          </ul>
        </li>
      `,
        },
    },
    data() {
        return {
            chartData: [
                {
                    id: 1000,
                    name: "الأصول الثابتة",
                    children: [
                        { id: 1100, name: "الأراضي", children: [] },
                        { id: 1200, name: "المباني", children: [] },
                    ],
                },
                {
                    id: 2000,
                    name: "الأصول المتداولة",
                    children: [
                        {
                            id: 2100,
                            name: "البنوك",
                            children: [
                                { id: 2110, name: "بنك فلسطين", children: [] },
                                { id: 2120, name: "البنك العربي", children: [] },
                            ],
                        },
                    ],
                },
            ],
            selectedNodeId: null,
        };
    },
    computed: {
        selectedNode() {
            return this.findNode(this.chartData, this.selectedNodeId);
        },
    },
    methods: {
        selectNode(id) {
            this.selectedNodeId = id;
        },
        expandAll() {
            this.toggleAllNodes(this.chartData, true);
        },
        collapseAll() {
            this.toggleAllNodes(this.chartData, false);
        },
        toggleAllNodes(nodes, expand) {
            nodes.forEach((node) => {
                node._expanded = expand;
                if (node.children && node.children.length) {
                    this.toggleAllNodes(node.children, expand);
                }
            });
        },
        findNode(nodes, id) {
            for (const node of nodes) {
                if (node.id === id) return node;
                if (node.children) {
                    const found = this.findNode(node.children, id);
                    if (found) return found;
                }
            }
            return null;
        },
        resetSelection() {
            this.selectedNodeId = null;
        },
    },
};
</script>

<style scoped>
.text-main {
    color: #1D7342;
}

.btn-main {
    background-color: #1D7342;
    border-color: #1D7342;
}

.btn-main:hover {
    background-color: #155b32;
}

.pointer {
    cursor: pointer;
}

.tree-view {
    font-size: 1.1rem;
    line-height: 1.8;
    max-height: 70vh;
    overflow-y: auto;
}

.item-wrapper {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
}

.item-name {
    font-weight: 500;
}

.item-name:hover {
    text-decoration: underline;
}

.bg-selected {
    background-color: rgba(29, 115, 66, 0.15);
    border-left: 4px solid #1D7342;
}
</style>
