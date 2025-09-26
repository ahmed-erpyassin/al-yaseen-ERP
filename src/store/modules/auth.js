import axios from "axios";

export const auth = {
    namespaced: true,

    state: {
        authStatus: localStorage.getItem('authStatus') === 'true' || false,
        authToken: localStorage.getItem('authToken') || null,
        authBranchId: localStorage.getItem('authBranchId') || 0,
    },
    getters: {
        authStatus: function (state) {
            return state.authStatus;
        },
        authToken: function (state) {
            return state.authToken;
        },
        authBranchId: function (state) {
            return state.authBranchId;
        },
        isAuthenticated: function (state) {
            return state.authStatus && !!state.authToken;
        },
        accessToken: function (state) {
            return state.authToken;
        }
    },
    actions: {
        login: function (context, payload) {
            return new Promise((resolve, reject) => {
                axios.post('auth/login', payload).then((res) => {
                    context.commit('setAuthData', {
                        authStatus: true,
                        authToken: res.data.token,
                        authBranchId: res.data.branch_id || 0
                    });
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        register: function (context, payload) {
            return new Promise((resolve, reject) => {
                axios.post('auth/register', payload).then((res) => {
                    context.commit('setAuthData', {
                        authStatus: true,
                        authToken: res.data.token,
                        authBranchId: res.data.branch_id || 0
                    });
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
        },
        registerCompany: function (context, payload) {
            return new Promise((resolve, reject) => {
                axios.post('auth/create-company', payload, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + context.state.authToken
                    }
                }).then((res) => {
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        logout: function (context) {
            return new Promise((resolve) => {
                // Clear auth data from localStorage and state
                localStorage.removeItem('authStatus');
                localStorage.removeItem('authToken');
                localStorage.removeItem('authBranchId');
                context.commit('clearAuthData');
                resolve();
            });
        }
    },
    mutations: {
        setAuthData: function (state, payload) {
            state.authStatus = payload.authStatus;
            state.authToken = payload.authToken;
            state.authBranchId = payload.authBranchId;
            
            // Save to localStorage
            localStorage.setItem('authStatus', payload.authStatus);
            localStorage.setItem('authToken', payload.authToken);
            localStorage.setItem('authBranchId', payload.authBranchId);
        },
        clearAuthData: function (state) {
            state.authStatus = false;
            state.authToken = null;
            state.authBranchId = 0;
        }
    },
}