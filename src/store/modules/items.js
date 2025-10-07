import axios from "axios";

export const item = {
    namespaced: true,

    state: {
        items: [],
        currentItem: null,
        loading: false,
        error: null,
        searchQuery: '',
        selectedItems: [],
        tableColumns: {
            item_number: true,
            item_name: true,
            unit: true,
            quantity: true,
            category: true,
            barcode: true,
            price: true
        }
    },

    getters: {
        items: state => state.items,
        currentItem: state => state.currentItem,
        loading: state => state.loading,
        error: state => state.error,
        searchQuery: state => state.searchQuery,
        selectedItems: state => state.selectedItems,
        tableColumns: state => state.tableColumns,
        filteredItems: state => {
            if (!state.searchQuery) return state.items;
            return state.items.filter(item =>
                item.item_name?.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                item.item_number?.toString().includes(state.searchQuery) ||
                item.barcode?.includes(state.searchQuery)
            );
        }
    },

    actions: {
        fetchItems({ commit, rootState }, payload = {}) {
            commit('setLoading', true);
            commit('clearError');
            return axios.get('inventory-items', {
                headers: { 'Authorization': 'Bearer ' + rootState.auth.authToken },
                params: payload
            })
            .then(res => {
                commit('setItems', res.data.data || res.data);
                return res;
            })
            .catch(err => {
                commit('setError', err.response?.data?.message || 'Failed to fetch items');
                throw err;
            })
            .finally(() => commit('setLoading', false));
        },

        fetchItem({ commit, rootState }, itemId) {
            commit('setLoading', true);
            commit('clearError');
            return axios.get(`inventory-items/${itemId}`, {
                headers: { 'Authorization': 'Bearer ' + rootState.auth.authToken }
            })
            .then(res => {
                commit('setCurrentItem', res.data.data || res.data);
                return res;
            })
            .catch(err => {
                commit('setError', err.response?.data?.message || 'Failed to fetch item');
                throw err;
            })
            .finally(() => commit('setLoading', false));
        },

        createItem({ commit, rootState }, payload) {
            commit('setLoading', true);
            commit('clearError');
            return axios.post('inventory-items/register-inventory', payload, {
                headers: {
                    'Authorization': 'Bearer ' + rootState.auth.authToken,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                commit('addItem', res.data.data || res.data);
                return res;
            })
            .catch(err => {
                commit('setError', err.response?.data?.message || 'Failed to create item');
                throw err;
            })
            .finally(() => commit('setLoading', false));
        },

        updateItem({ commit, rootState }, payload) {
            commit('setLoading', true);
            commit('clearError');
            return axios.put(`inventory-items/${payload.id}`, payload, {
                headers: {
                    'Authorization': 'Bearer ' + rootState.auth.authToken,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                commit('updateItem', res.data.data || res.data);
                return res;
            })
            .catch(err => {
                commit('setError', err.response?.data?.message || 'Failed to update item');
                throw err;
            })
            .finally(() => commit('setLoading', false));
        },

        deleteItem({ commit, rootState }, itemId) {
            commit('setLoading', true);
            commit('clearError');
            return axios.delete(`inventory-items/${itemId}`, {
                headers: { 'Authorization': 'Bearer ' + rootState.auth.authToken }
            })
            .then(res => {
                commit('removeItem', itemId);
                return res;
            })
            .catch(err => {
                commit('setError', err.response?.data?.message || 'Failed to delete item');
                throw err;
            })
            .finally(() => commit('setLoading', false));
        },

        searchItems({ commit }, query) {
            commit('setSearchQuery', query);
        },

        selectItem({ commit }, itemId) {
            commit('selectItem', itemId);
        },

        deselectItem({ commit }, itemId) {
            commit('deselectItem', itemId);
        },

        selectAllItems({ commit }) {
            commit('selectAllItems');
        },

        clearSelection({ commit }) {
            commit('clearSelection');
        },

        toggleColumn({ commit }, columnName) {
            commit('toggleColumn', columnName);
        }
    },

    mutations: {
        setItems(state, items) { state.items = items; },
        setCurrentItem(state, item) { state.currentItem = item; },
        addItem(state, item) { state.items.unshift(item); },
        updateItem(state, updatedItem) {
            const index = state.items.findIndex(i => i.id === updatedItem.id);
            if (index !== -1) state.items.splice(index, 1, updatedItem);
            if (state.currentItem?.id === updatedItem.id) state.currentItem = updatedItem;
        },
        removeItem(state, itemId) {
            state.items = state.items.filter(i => i.id !== itemId);
            if (state.currentItem?.id === itemId) state.currentItem = null;
        },
        setLoading(state, loading) { state.loading = loading; },
        setError(state, error) { state.error = error; },
        clearError(state) { state.error = null; },
        setSearchQuery(state, query) { state.searchQuery = query; },
        selectItem(state, itemId) { if (!state.selectedItems.includes(itemId)) state.selectedItems.push(itemId); },
        deselectItem(state, itemId) { state.selectedItems = state.selectedItems.filter(id => id !== itemId); },
        selectAllItems(state) { state.selectedItems = state.items.map(i => i.id); },
        clearSelection(state) { state.selectedItems = []; },
        toggleColumn(state, columnName) { state.tableColumns[columnName] = !state.tableColumns[columnName]; }
    }
}
