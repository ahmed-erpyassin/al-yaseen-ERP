import axios from "axios";

export const outgoingQuotations = {
  namespaced: true,

  state: {
    outgoingQuotations: [],
    currentOutgoingQuotation: null,
    loading: false,
    error: null,
    searchQuery: "",
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
      mobile: true,
    },
  },

  getters: {
    outgoingQuotations: (state) => state.outgoingQuotations,
    currentOutgoingQuotation: (state) => state.currentOutgoingQuotation,
    loading: (state) => state.loading,
    error: (state) => state.error,
    searchQuery: (state) => state.searchQuery,
    selectedOutgoingQuotations: (state) => state.selectedOutgoingQuotations,
    tableColumns: (state) => state.tableColumns,
    filteredOutgoingQuotations: (state) => {
      if (!state.searchQuery) return state.outgoingQuotations;
      return state.outgoingQuotations.filter(
        (q) =>
          q.journal_number
            ?.toString()
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase()) ||
          q.customer?.name
            ?.toLowerCase()
            .includes(state.searchQuery.toLowerCase()) ||
          q.customer?.phone?.includes(state.searchQuery)
      );
    },
  },

  mutations: {
    setOutgoingQuotations: (state, data) => (state.outgoingQuotations = data),
    setCurrentOutgoingQuotation: (state, data) =>
      (state.currentOutgoingQuotation = data),
    addOutgoingQuotation: (state, q) => state.outgoingQuotations.unshift(q),
    updateOutgoingQuotation: (state, updated) => {
      const index = state.outgoingQuotations.findIndex(
        (q) => q.id === updated.id
      );
      if (index !== -1) state.outgoingQuotations.splice(index, 1, updated);
      if (state.currentOutgoingQuotation?.id === updated.id) {
        state.currentOutgoingQuotation = updated;
      }
    },
    removeOutgoingQuotations: (state, ids) => {
      state.outgoingQuotations = state.outgoingQuotations.filter(
        (q) => !ids.includes(q.id)
      );
      if (
        state.currentOutgoingQuotation &&
        ids.includes(state.currentOutgoingQuotation.id)
      ) {
        state.currentOutgoingQuotation = null;
      }
    },
    setLoading: (state, value) => (state.loading = value),
    setError: (state, error) => (state.error = error),
    clearError: (state) => (state.error = null),
    setSearchQuery: (state, query) => (state.searchQuery = query),
    selectOutgoingQuotation: (state, id) => {
      if (!state.selectedOutgoingQuotations.includes(id))
        state.selectedOutgoingQuotations.push(id);
    },
    deselectOutgoingQuotation: (state, id) => {
      state.selectedOutgoingQuotations =
        state.selectedOutgoingQuotations.filter((i) => i !== id);
    },
    selectAllOutgoingQuotations: (state) => {
      state.selectedOutgoingQuotations = state.outgoingQuotations.map(
        (q) => q.id
      );
    },
    clearSelection: (state) => (state.selectedOutgoingQuotations = []),
    toggleColumn: (state, column) =>
      (state.tableColumns[column] = !state.tableColumns[column]),
  },

  actions: {
    // ✅ Fetch all outgoing offers
    async fetchOutgoingQuotations({ commit, rootState }) {
      commit("setLoading", true);
      commit("clearError");
      try {
        const res = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}/sales-management/outgoing-offers/list-all`,
          {
            headers: { Authorization: `Bearer ${rootState.auth.authToken}` },
          }
        );
        commit("setOutgoingQuotations", res.data.data || res.data);
        return res;
      } catch (err) {
        console.error("Error fetching offers:", err);
        commit(
          "setError",
          err.response?.data?.message || "Failed to fetch outgoing quotations"
        );
        throw err;
      } finally {
        commit("setLoading", false);
      }
    },

    // ✅ Fetch single outgoing offer
    async fetchOutgoingQuotation({ commit, rootState }, id) {
      commit("setLoading", true);
      commit("clearError");
      try {
        const res = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}/sales-management/outgoing-offers/show-details/${id}`,
          {
            headers: { Authorization: `Bearer ${rootState.auth.authToken}` },
          }
        );
        commit("setCurrentOutgoingQuotation", res.data.data || res.data);
        return res;
      } catch (err) {
        commit(
          "setError",
          err.response?.data?.message || "Failed to fetch outgoing quotation"
        );
        throw err;
      } finally {
        commit("setLoading", false);
      }
    },

    // ✅ Create new outgoing offer
    async createOutgoingQuotation({ commit, rootState }, payload) {
      commit("setLoading", true);
      commit("clearError");
      try {
        const res = await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}/sales-management/outgoing-offers/create-new`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${rootState.auth.authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        commit("addOutgoingQuotation", res.data.data || res.data);
        return res;
      } catch (err) {
        commit(
          "setError",
          err.response?.data?.message || "Failed to create outgoing quotation"
        );
        throw err;
      } finally {
        commit("setLoading", false);
      }
    },

    // ✅ Update existing outgoing offer
    async updateOutgoingQuotation({ commit, rootState }, { id, data }) {
      commit("setLoading", true);
      commit("clearError");
      try {
        const res = await axios.put(
          `${process.env.VUE_APP_API_BASE_URL}/sales-management/outgoing-offers/update-offer/${id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${rootState.auth.authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        commit("updateOutgoingQuotation", res.data.data || res.data);
        return res;
      } catch (err) {
        commit(
          "setError",
          err.response?.data?.message || "Failed to update outgoing quotation"
        );
        throw err;
      } finally {
        commit("setLoading", false);
      }
    },

    // ✅ Delete a single outgoing offer
    async deleteOutgoingQuotation({ commit, rootState }, id) {
      commit("setLoading", true);
      commit("clearError");
      try {
        const res = await axios.delete(
          `${process.env.VUE_APP_API_BASE_URL}/sales-management/outgoing-offers/delete-offer/${id}`,
          { headers: { Authorization: `Bearer ${rootState.auth.authToken}` } }
        );
        commit("removeOutgoingQuotations", [id]);
        return res;
      } catch (err) {
        commit(
          "setError",
          err.response?.data?.message || "Failed to delete outgoing quotation"
        );
        throw err;
      } finally {
        commit("setLoading", false);
      }
    },

    // ✅ Delete multiple outgoing offers
    async deleteOutgoingQuotations({ commit, rootState }, ids) {
      commit("setLoading", true);
      commit("clearError");
      try {
        const promises = ids.map((id) =>
          axios.delete(
            `${process.env.VUE_APP_API_BASE_URL}/sales-management/outgoing-offers/delete-offer/${id}`,
            { headers: { Authorization: `Bearer ${rootState.auth.authToken}` } }
          )
        );
        await Promise.all(promises);
        commit("removeOutgoingQuotations", ids);
      } catch (err) {
        commit(
          "setError",
          err.response?.data?.message || "Failed to delete outgoing quotations"
        );
        throw err;
      } finally {
        commit("setLoading", false);
      }
    },
  },
};
