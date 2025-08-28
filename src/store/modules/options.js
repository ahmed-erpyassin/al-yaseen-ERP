
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
        getCurrencies: function (context, payload) {
            return new Promise((resolve, reject) => {
                axios.get('currency/all', payload).then((res) => {
                    context.commit('currencies', res.data.data);
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        getWorkTypes: function (context, payload) {
            return new Promise((resolve, reject) => {
                axios.get('work-types/all', payload).then((res) => {
                    context.commit('workTypes', res.data.data);
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        getCompanyTypes: function (context, payload) {
            return new Promise((resolve, reject) => {
                axios.get('company-types/all', payload).then((res) => {
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
            return state.currencies = payload;
        },
        workTypes: function (state, payload) {
            return state.workTypes = payload;
        },
        companyTypes: function (state, payload) {
            return state.companyTypes = payload;
        },
    },
}