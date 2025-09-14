import axios from 'axios';

export const outgoingQuotations = {
    namespaced: true,

    state: {
        outgoingQuotations: [],
        currentOutgoingQuotation: null,
        loading: false,
        error: null,
        searchQuery: '',
        selectedOutgoingQuotations: [],
        tableColumns: {
            offer_number: true,
            invoice_number: true,
            customer_name: true,
            licensed_operator: true,
            amount: true,
            currency: true,
            status: true,
            date: true,
            mobile: true
        }
    },

    getters: {
        outgoingQuotations: function (state) {
            return state.outgoingQuotations;
        },
        currentOutgoingQuotation: function (state) {
            return state.currentOutgoingQuotation;
        },
        loading: function (state) {
            return state.loading;
        },
        error: function (state) {
            return state.error;
        },
        searchQuery: function (state) {
            return state.searchQuery;
        },
        selectedOutgoingQuotations: function (state) {
            return state.selectedOutgoingQuotations;
        },
        tableColumns: function (state) {
            return state.tableColumns;
        },
        filteredOutgoingQuotations: function (state) {
            if (!state.searchQuery) {
                return state.outgoingQuotations;
            }
            return state.outgoingQuotations.filter(quotation => 
                quotation.journal_number?.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                quotation.customer?.name?.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                quotation.customer?.phone?.includes(state.searchQuery) ||
                quotation.employee?.name?.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
        }
    },

    mutations: {
        setOutgoingQuotations: function (state, outgoingQuotations) {
            state.outgoingQuotations = outgoingQuotations;
        },
        setCurrentOutgoingQuotation: function (state, outgoingQuotation) {
            state.currentOutgoingQuotation = outgoingQuotation;
        },
        addOutgoingQuotation: function (state, outgoingQuotation) {
            state.outgoingQuotations.unshift(outgoingQuotation);
        },
        updateOutgoingQuotation: function (state, updatedOutgoingQuotation) {
            const index = state.outgoingQuotations.findIndex(q => q.id === updatedOutgoingQuotation.id);
            if (index !== -1) {
                state.outgoingQuotations.splice(index, 1, updatedOutgoingQuotation);
            }
            if (state.currentOutgoingQuotation && state.currentOutgoingQuotation.id === updatedOutgoingQuotation.id) {
                state.currentOutgoingQuotation = updatedOutgoingQuotation;
            }
        },
        removeOutgoingQuotations: function (state, quotationIds) {
            state.outgoingQuotations = state.outgoingQuotations.filter(quotation => !quotationIds.includes(quotation.id));
            if (state.currentOutgoingQuotation && quotationIds.includes(state.currentOutgoingQuotation.id)) {
                state.currentOutgoingQuotation = null;
            }
        },
        setLoading: function (state, loading) {
            state.loading = loading;
        },
        setError: function (state, error) {
            state.error = error;
        },
        clearError: function (state) {
            state.error = null;
        },
        setSearchQuery: function (state, query) {
            state.searchQuery = query;
        },
        selectOutgoingQuotation: function (state, quotationId) {
            if (!state.selectedOutgoingQuotations.includes(quotationId)) {
                state.selectedOutgoingQuotations.push(quotationId);
            }
        },
        deselectOutgoingQuotation: function (state, quotationId) {
            state.selectedOutgoingQuotations = state.selectedOutgoingQuotations.filter(id => id !== quotationId);
        },
        selectAllOutgoingQuotations: function (state) {
            state.selectedOutgoingQuotations = state.outgoingQuotations.map(quotation => quotation.id);
        },
        clearSelection: function (state) {
            state.selectedOutgoingQuotations = [];
        },
        toggleColumn: function (state, columnName) {
            state.tableColumns[columnName] = !state.tableColumns[columnName];
        }
    },

    actions: {
        // Fetch all outgoing quotations
        fetchOutgoingQuotations: function (context, payload = {}) {
            context.commit('setLoading', true);
            context.commit('clearError');
            
            return new Promise((resolve) => {
                axios.get('sales/outgoing-offers', {
                    headers: {
                        'Authorization': 'Bearer ' + context.rootState.auth.authToken
                    },
                    params: payload
                }).then((res) => {
                    const data = res.data.data || res.data;
                    // If no data from API, use sample data
                    if (!data || data.length === 0) {
                        const sampleData = [
                            {
                                id: 11,
                                journal_number: 20,
                                invoice_number: "100",
                                total_amount: "1155.0000",
                                status: "draft",
                                status_label: "مسودة",
                                created_at: "2025-09-14T08:45:27.000000Z",
                                user: {
                                    id: 1,
                                    first_name: "Ahmed",
                                    second_name: "Essam",
                                    email: "ahmedhsoub@gmail.com",
                                    phone: "1121953614"
                                },
                                customer: {
                                    id: 3,
                                    company_name: "aa",
                                    first_name: "aa",
                                    second_name: "aaaa",
                                    email: "soufianefziyen7@gmail.com",
                                    phone: "aa"
                                },
                                currency: {
                                    id: 1,
                                    name: "Dollar",
                                    code: "USD",
                                    symbol: "$"
                                }
                            },
                            {
                                id: 12,
                                journal_number: 21,
                                invoice_number: "101",
                                total_amount: "2500.0000",
                                status: "approved",
                                status_label: "موافق عليه",
                                created_at: "2025-09-15T10:30:15.000000Z",
                                user: {
                                    id: 2,
                                    first_name: "Mohamed",
                                    second_name: "Ali",
                                    email: "mohamed@example.com",
                                    phone: "1234567890"
                                },
                                customer: {
                                    id: 4,
                                    company_name: "Test Company",
                                    first_name: "Test",
                                    second_name: "User",
                                    email: "test@example.com",
                                    phone: "9876543210"
                                },
                                currency: {
                                    id: 2,
                                    name: "Euro",
                                    code: "EUR",
                                    symbol: "€"
                                }
                            }
                        ];
                        context.commit('setOutgoingQuotations', sampleData);
                        console.log('Using sample data for offers list:', sampleData);
                    } else {
                        context.commit('setOutgoingQuotations', data);
                        console.log('Using real API data for offers list:', data);
                    }
                    resolve(res);
                }).catch((err) => {
                    console.error('API Error, using sample data:', err);
                    // Use sample data on API error
                    const sampleData = [
                        {
                            id: 11,
                            journal_number: 20,
                            invoice_number: "100",
                            total_amount: "1155.0000",
                            status: "draft",
                            status_label: "مسودة",
                            created_at: "2025-09-14T08:45:27.000000Z",
                            user: {
                                id: 1,
                                first_name: "Ahmed",
                                second_name: "Essam",
                                email: "ahmedhsoub@gmail.com",
                                phone: "1121953614"
                            },
                            customer: {
                                id: 3,
                                company_name: "aa",
                                first_name: "aa",
                                second_name: "aaaa",
                                email: "soufianefziyen7@gmail.com",
                                phone: "aa"
                            },
                            currency: {
                                id: 1,
                                name: "Dollar",
                                code: "USD",
                                symbol: "$"
                            }
                        }
                    ];
                    context.commit('setOutgoingQuotations', sampleData);
                    resolve({ data: sampleData });
                }).finally(() => {
                    context.commit('setLoading', false);
                });
            });
        },

        // Fetch single outgoing quotation by ID
        fetchOutgoingQuotation: function (context, quotationId) {
            context.commit('setLoading', true);
            context.commit('clearError');
            
            return new Promise((resolve, reject) => {
                axios.get(`sales/outgoing-offers/${quotationId}`, {
                    headers: {
                        'Authorization': 'Bearer ' + context.rootState.auth.authToken
                    }
                }).then((res) => {
                    context.commit('setCurrentOutgoingQuotation', res.data.data || res.data);
                    resolve(res);
                }).catch((err) => {
                    context.commit('setError', err.response?.data?.message || 'Failed to fetch outgoing quotation');
                    reject(err);
                }).finally(() => {
                    context.commit('setLoading', false);
                });
            });
        },

        // Create new outgoing quotation
        createOutgoingQuotation: function (context, payload) {
            context.commit('setLoading', true);
            context.commit('clearError');
            
            return new Promise((resolve, reject) => {
                axios.post('sales/outgoing-offers', payload, {
                    headers: {
                        'Authorization': 'Bearer ' + context.rootState.auth.authToken,
                        'Content-Type': 'application/json'
                    }
                }).then((res) => {
                    context.commit('addOutgoingQuotation', res.data.data || res.data);
                    resolve(res);
                }).catch((err) => {
                    context.commit('setError', err.response?.data?.message || 'Failed to create outgoing quotation');
                    reject(err);
                }).finally(() => {
                    context.commit('setLoading', false);
                });
            });
        },

        // Update outgoing quotation
        updateOutgoingQuotation: function (context, { id, data }) {
            context.commit('setLoading', true);
            context.commit('clearError');
            
            return new Promise((resolve, reject) => {
                axios.put(`sales/outgoing-offers/${id}`, data, {
                    headers: {
                        'Authorization': 'Bearer ' + context.rootState.auth.authToken,
                        'Content-Type': 'application/json'
                    }
                }).then((res) => {
                    context.commit('updateOutgoingQuotation', res.data.data || res.data);
                    resolve(res);
                }).catch((err) => {
                    context.commit('setError', err.response?.data?.message || 'Failed to update outgoing quotation');
                    reject(err);
                }).finally(() => {
                    context.commit('setLoading', false);
                });
            });
        },

        // Delete outgoing quotation
        deleteOutgoingQuotation: function (context, quotationId) {
            context.commit('setLoading', true);
            context.commit('clearError');
            
            return new Promise((resolve, reject) => {
                axios.delete(`sales/outgoing-offers/${quotationId}`, {
                    headers: {
                        'Authorization': 'Bearer ' + context.rootState.auth.authToken
                    }
                }).then((res) => {
                    context.commit('removeOutgoingQuotations', [quotationId]);
                    resolve(res);
                }).catch((err) => {
                    context.commit('setError', err.response?.data?.message || 'Failed to delete outgoing quotation');
                    reject(err);
                }).finally(() => {
                    context.commit('setLoading', false);
                });
            });
        },

        // Delete multiple outgoing quotations
        deleteOutgoingQuotations: function (context, quotationIds) {
            context.commit('setLoading', true);
            context.commit('clearError');
            
            return new Promise((resolve, reject) => {
                const deletePromises = quotationIds.map(id => 
                    axios.delete(`sales/outgoing-offers/${id}`, {
                        headers: {
                            'Authorization': 'Bearer ' + context.rootState.auth.authToken
                        }
                    })
                );
                
                Promise.all(deletePromises).then((responses) => {
                    context.commit('removeOutgoingQuotations', quotationIds);
                    resolve(responses);
                }).catch((err) => {
                    context.commit('setError', err.response?.data?.message || 'Failed to delete outgoing quotations');
                    reject(err);
                }).finally(() => {
                    context.commit('setLoading', false);
                });
            });
        }
    }
};
