
import axios from "axios";

export const options = {
    namespaced: true,

    state: {
        currencies: [],
        workTypes: [],
        companyTypes: []
    },
    getters: {
        currencies: function (state) {
            return state.currencies;
        },
        workTypes: function (state) {
            return state.workTypes;
        },
        companyTypes: function (state) {
            return state.companyTypes;
        },
    },
    actions: {
        getCurrencies: function (context) {
            return new Promise((resolve, reject) => {
                axios.get('currencies', {
                    headers: {
                        'Authorization': 'Bearer ' + context.rootState.auth.authToken
                    }
                }).then((res) => {
                    context.commit('currencies', res.data.data);
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        getWorkTypes: function (context) {
            return new Promise((resolve, reject) => {
                axios.get('work-types/all').then((res) => {
                    context.commit('workTypes', res.data.data);
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        getCompanyTypes: function (context) {
            return new Promise((resolve, reject) => {
                axios.get('company-types/all').then((res) => {
                    context.commit('companyTypes', res.data.data);
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        }

    },
    mutations: {
        currencies: function (state, payload) {
            state.currencies = payload;
        },
        workTypes: function (state, payload) {
            state.workTypes = payload;
        },
        companyTypes: function (state, payload) {
            state.companyTypes = payload;
        },
    },
}