import axios from "axios";

export const auth = {
    namespaced: true,

    state: {
        accessToken: localStorage.getItem('accessToken') || null,
    },
    getters: {
        accessToken: function (state) {
            return state.accessToken;
        }
    },
    actions: {
        login: function (context, payload) {
            return new Promise((resolve, reject) => {
                axios.post('auth/login', payload).then((res) => {
                    context.commit('accessToken', res.data.token);
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        register: function (context, payload) {
            return new Promise((resolve, reject) => {
                axios.post('auth/register', payload).then((res) => {
                    context.commit('accessToken', res.data.token);
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        forgetPassword: function (context, payload) {
            return new Promise((resolve, reject) => {
                axios.post('auth/forget-password', payload).then((res) => {
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        checkOtp: function (context, payload) {
            return new Promise((resolve, reject) => {
                axios.post('auth/check-otp', payload).then((res) => {
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        resetPassword: function (context, payload) {
            return new Promise((resolve, reject) => {
                axios.post('auth/reset-password', payload).then((res) => {
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        }
    },
    mutations: {
        accessToken: function (state, payload) {

            state.accessToken = payload;

        }
    },
}