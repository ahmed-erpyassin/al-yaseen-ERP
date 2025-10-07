import axios from "axios";

const state = {
  warehouses: [],
  warehouse: null,
  loading: false,
};

const mutations = {
  SET_WAREHOUSES(state, warehouses) {
    state.warehouses = warehouses;
  },
  SET_WAREHOUSE(state, warehouse) {
    state.warehouse = warehouse;
  },
  SET_LOADING(state, status) {
    state.loading = status;
  },
};

const actions = {
  async fetchWarehouses({ commit }) {
    commit("SET_LOADING", true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        "https://alyaseenerp.com/api/v1/warehouses/scan-all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      commit("SET_WAREHOUSES", response.data.data);
    } catch (error) {
      console.error("❌ فشل جلب المستودعات:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async createWarehouse({ dispatch }, payload) {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "https://alyaseenerp.com/api/v1/warehouses/establish-facility",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      await dispatch("fetchWarehouses");
      return true;
    } catch (error) {
      console.error("❌ فشل إنشاء المستودع:", error.response?.data || error);
      return false;
    }
  },

  async deleteWarehouse({ dispatch }, id) {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`https://alyaseenerp.com/api/v1/warehouses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      await dispatch("fetchWarehouses");
    } catch (error) {
      console.error("❌ فشل حذف المستودع:", error);
    }
  },
};

const getters = {
  warehouses: (state) => state.warehouses,
  warehouse: (state) => state.warehouse,
  loading: (state) => state.loading,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
