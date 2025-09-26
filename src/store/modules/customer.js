import axios from "axios";

export const customer = {
    namespaced: true,

    state: {
        customers: [],
        currentCustomer: null,
        loading: false,
        error: null,
        searchQuery: '',
        selectedCustomers: [],
        tableColumns: {
            customer_number: true,
            customer_name: true,
            balance: true,
            currency: true,
            branch: true,
            date_of_last_movement: true,
            mobile: true,
            sales_representative: true
        }
    },

    getters: {
        customers: function (state) {
            return state.customers;
        },
        currentCustomer: function (state) {
            return state.currentCustomer;
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
        selectedCustomers: function (state) {
            return state.selectedCustomers;
        },
        tableColumns: function (state) {
            return state.tableColumns;
        },
        filteredCustomers: function (state) {
            if (!state.searchQuery) {
                return state.customers;
            }
            return state.customers.filter(customer => 
                customer.customer_name?.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                customer.customer_number?.toString().includes(state.searchQuery) ||
                customer.mobile?.includes(state.searchQuery) ||
                customer.email?.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
        }
    },

    actions: {
        // Fetch all customers
        fetchCustomers: function (context, payload = {}) {
            context.commit('setLoading', true);
            context.commit('clearError');
            
            return new Promise((resolve, reject) => {
                axios.get('customers', {
                    headers: {
                        'Authorization': 'Bearer ' + context.rootState.auth.authToken
                    },
                    params: payload
                }).then((res) => {
                    context.commit('setCustomers', res.data.data || res.data);
                    resolve(res);
                }).catch((err) => {
                    context.commit('setError', err.response?.data?.message || 'Failed to fetch customers');
                    reject(err);
                }).finally(() => {
                    context.commit('setLoading', false);
                });
            });
        },

        // Fetch single customer by ID
        fetchCustomer: function (context, customerId) {
            context.commit('setLoading', true);
            context.commit('clearError');
            
            return new Promise((resolve, reject) => {
                axios.get(`customers/${customerId}`, {
                    headers: {
                        'Authorization': 'Bearer ' + context.rootState.auth.authToken
                    }
                }).then((res) => {
                    context.commit('setCurrentCustomer', res.data.data || res.data);
                    resolve(res);
                }).catch((err) => {
                    context.commit('setError', err.response?.data?.message || 'Failed to fetch customer');
                    reject(err);
                }).finally(() => {
                    context.commit('setLoading', false);
                });
            });
        },

        // Create new customer
        createCustomer: function (context, payload) {
            context.commit('setLoading', true);
            context.commit('clearError');
            
            // Prepare JSON payload - exact match with backend validation
            const apiPayload = {
                company_id: payload.company_id || 1,
                branch_id: payload.branch_id || 1,
                currency_id: payload.currency_id || 1,
                employee_id: payload.employee_id || 1,
                country_id: payload.country_id || 1,
                region_id: payload.region_id || 1,
                city_id: payload.city_id || 1,
                customer_number: payload.customer_number || '',
                company_name: payload.company_name || '',
                first_name: payload.first_name || '',
                second_name: payload.second_name || '',
                contact_name: payload.contact_name || '',
                email: payload.email || '',
                phone: payload.phone || '',
                mobile: payload.mobile || '',
                address_one: payload.address_one || '',
                address_two: payload.address_two || '',
                postal_code: payload.postal_code || '',
                licensed_operator: payload.licensed_operator || '',
                tax_number: payload.tax_number || '',
                notes: payload.notes || '',
                status: payload.status || 'active',
                code: payload.code || '',
                invoice_type: payload.invoice_type || '',
                category: payload.category || ''
            };
            
            return new Promise((resolve, reject) => {
                axios.post('customers', apiPayload, {
                    headers: {
                        'Authorization': 'Bearer ' + context.rootState.auth.authToken,
                        'Content-Type': 'application/json'
                    }
                }).then((res) => {
                    context.commit('addCustomer', res.data.data || res.data);
                    resolve(res);
                }).catch((err) => {
                    context.commit('setError', err.response?.data?.message || 'Failed to create customer');
                    reject(err);
                }).finally(() => {
                    context.commit('setLoading', false);
                });
            });
        },

        // Update customer
        updateCustomer: function (context, payload) {
            context.commit('setLoading', true);
            context.commit('clearError');
            
            // Prepare JSON payload - exact match with backend validation
            const apiPayload = {
                company_id: payload.company_id || 1,
                branch_id: payload.branch_id || 1,
                currency_id: payload.currency_id || 1,
                employee_id: payload.employee_id || 1,
                country_id: payload.country_id || 1,
                region_id: payload.region_id || 1,
                city_id: payload.city_id || 1,
                customer_number: payload.customer_number || '',
                company_name: payload.company_name || '',
                first_name: payload.first_name || '',
                second_name: payload.second_name || '',
                contact_name: payload.contact_name || '',
                email: payload.email || '',
                phone: payload.phone || '',
                mobile: payload.mobile || '',
                address_one: payload.address_one || '',
                address_two: payload.address_two || '',
                postal_code: payload.postal_code || '',
                licensed_operator: payload.licensed_operator || '',
                tax_number: payload.tax_number || '',
                notes: payload.notes || '',
                status: payload.status || 'active',
                code: payload.code || '',
                invoice_type: payload.invoice_type || '',
                category: payload.category || ''
            };
            
            return new Promise((resolve, reject) => {
                axios.put(`customers/${payload.id}`, apiPayload, {
                    headers: {
                        'Authorization': 'Bearer ' + context.rootState.auth.authToken,
                        'Content-Type': 'application/json'
                    }
                }).then((res) => {
                    context.commit('updateCustomer', res.data.data || res.data);
                    resolve(res);
                }).catch((err) => {
                    context.commit('setError', err.response?.data?.message || 'Failed to update customer');
                    reject(err);
                }).finally(() => {
                    context.commit('setLoading', false);
                });
            });
        },

        // Delete customer
        deleteCustomer: function (context, customerId) {
            context.commit('setLoading', true);
            context.commit('clearError');
            
            return new Promise((resolve, reject) => {
                axios.delete(`customers/${customerId}`, {
                    headers: {
                        'Authorization': 'Bearer ' + context.rootState.auth.authToken
                    }
                }).then((res) => {
                    context.commit('removeCustomer', customerId);
                    resolve(res);
                }).catch((err) => {
                    context.commit('setError', err.response?.data?.message || 'Failed to delete customer');
                    reject(err);
                }).finally(() => {
                    context.commit('setLoading', false);
                });
            });
        },

        // Search customers
        searchCustomers: function (context, query) {
            context.commit('setSearchQuery', query);
        },

        // Select customer(s)
        selectCustomer: function (context, customerId) {
            context.commit('selectCustomer', customerId);
        },

        // Deselect customer(s)
        deselectCustomer: function (context, customerId) {
            context.commit('deselectCustomer', customerId);
        },

        // Select all customers
        selectAllCustomers: function (context) {
            context.commit('selectAllCustomers');
        },

        // Clear selection
        clearSelection: function (context) {
            context.commit('clearSelection');
        },

        // Toggle table column visibility
        toggleColumn: function (context, columnName) {
            context.commit('toggleColumn', columnName);
        },

        // Get customer financial movements
        getCustomerFinancialMovements: function (context, customerId) {
            context.commit('setLoading', true);
            context.commit('clearError');
            
            return new Promise((resolve, reject) => {
                axios.get(`customers/${customerId}/financial-movements`, {
                    headers: {
                        'Authorization': 'Bearer ' + context.rootState.auth.authToken
                    }
                }).then((res) => {
                    resolve(res);
                }).catch((err) => {
                    context.commit('setError', err.response?.data?.message || 'Failed to fetch financial movements');
                    reject(err);
                }).finally(() => {
                    context.commit('setLoading', false);
                });
            });
        },

        // Get customer store movements
        getCustomerStoreMovements: function (context, customerId) {
            context.commit('setLoading', true);
            context.commit('clearError');
            
            return new Promise((resolve, reject) => {
                axios.get(`customers/${customerId}/store-movements`, {
                    headers: {
                        'Authorization': 'Bearer ' + context.rootState.auth.authToken
                    }
                }).then((res) => {
                    resolve(res);
                }).catch((err) => {
                    context.commit('setError', err.response?.data?.message || 'Failed to fetch store movements');
                    reject(err);
                }).finally(() => {
                    context.commit('setLoading', false);
                });
            });
        }
    },

    mutations: {
        setCustomers: function (state, customers) {
            state.customers = customers;
        },
        setCurrentCustomer: function (state, customer) {
            state.currentCustomer = customer;
        },
        addCustomer: function (state, customer) {
            state.customers.unshift(customer);
        },
        updateCustomer: function (state, updatedCustomer) {
            const index = state.customers.findIndex(c => c.id === updatedCustomer.id);
            if (index !== -1) {
                state.customers.splice(index, 1, updatedCustomer);
            }
            if (state.currentCustomer && state.currentCustomer.id === updatedCustomer.id) {
                state.currentCustomer = updatedCustomer;
            }
        },
        removeCustomers: function (state, customerIds) {
            state.customers = state.customers.filter(customer => !customerIds.includes(customer.id));
            if (state.currentCustomer && customerIds.includes(state.currentCustomer.id)) {
                state.currentCustomer = null;
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
        selectCustomer: function (state, customerId) {
            if (!state.selectedCustomers.includes(customerId)) {
                state.selectedCustomers.push(customerId);
            }
        },
        deselectCustomer: function (state, customerId) {
            state.selectedCustomers = state.selectedCustomers.filter(id => id !== customerId);
        },
        selectAllCustomers: function (state) {
            state.selectedCustomers = state.customers.map(customer => customer.id);
        },
        clearSelection: function (state) {
            state.selectedCustomers = [];
        },
        toggleColumn: function (state, columnName) {
            state.tableColumns[columnName] = !state.tableColumns[columnName];
        }
    }
}
