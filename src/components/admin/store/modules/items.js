export const items = {
    state: () => ({
        allItems: []
    }),
    getters: {
        allItems: state => state.allItems
    },
    mutations: {
        setItems(state, items) {
            state.allItems = items;
        }
    },
    actions: {
        fetchItems({ commit }) {
            // مثال: جلب البيانات من API أو ثابتة
            const data = [
                { id: 1, item_name: 'Item 1', balance: 10 },
                { id: 2, item_name: 'Item 2', balance: 20 },
                // ...
            ];
            commit('setItems', data);
        }
    }
};
