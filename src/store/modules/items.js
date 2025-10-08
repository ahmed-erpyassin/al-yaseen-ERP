// store/modules/items.js
import axios from "axios";

const state = {
  items: [],
  loading: false,
  error: null,
  searchQuery: "",
};

const getters = {
  items: (state) => state.items,
  loading: (state) => state.loading,
  error: (state) => state.error,
  searchQuery: (state) => state.searchQuery,
  filteredItems: (state) => {
    const list = Array.isArray(state.items) ? state.items : [];
    if (!state.searchQuery) return list;
    const q = state.searchQuery.toLowerCase();
    return list.filter((i) =>
      (i.item_name || i.item_name_ar || "").toLowerCase().includes(q)
    );
  },
};

const actions = {
  async fetchItems({ commit }) {
    commit("setLoading", true);
    try {
      // ⚠️ تأكد أن baseURL في axios = "/api/v1"
      // لذلك هنا نستخدم المسار بدون تكرار /api/v1
      const res = await axios.get("/items/inventory-all", {
        params: { type: "product", branch_id: 1, company_id: 1, per_page: 100 },
      });
      commit("setItems", res.data?.data || []);
    } catch (err) {
      commit("setError", err.response?.data?.message || "فشل في جلب الأصناف");
    } finally {
      commit("setLoading", false);
    }
  },

  searchItems({ commit }, query) {
    commit("setSearchQuery", query);
  },

  async deleteItem({ dispatch }, id) {
    await axios.delete(`/items/discard-item/${id}`);
    dispatch("fetchItems");
  },

  // ✅ الإنشاء باستخدام FormData وفق ما يتوقعه الـ backend
  async createItem({ dispatch }, payload) {
    const form = new FormData();

    // الحقول المطلوبة من السيرفر
    form.append("company_id", 1);
    form.append("branch_id", 1);

    // ✅ هذه أهم الحقول الإلزامية:
    form.append("unit_id", payload.unit_id || 1); // استخدم 1 كافتراضي
    form.append("code", payload.code || "IT-" + Date.now()); // كود فريد
    form.append("name", payload.name || "منتج جديد");
    form.append("type", payload.type || "product"); // product / service
    form.append("item_type", payload.item_type || "stock"); // نوع المخزون
    form.append("barcode_type", payload.barcode_type || "C128"); // نوع الباركود الصحيح

    // ✅ باقي الحقول الاختيارية
    form.append("quantity", payload.quantity || 0);
    form.append("first_selling_price", payload.first_selling_price || 0);
    form.append("first_purchase_price", payload.first_purchase_price || 0);
    form.append("selling_vat", payload.selling_vat ? 1 : 0);
    form.append("purchase_vat", payload.purchase_vat ? 1 : 0);
    form.append("item_vat", payload.item_vat ? 1 : 0);
    form.append("active", 1);

    // ✅ صورة في حال وُجدت
    if (payload?.image instanceof File) {
      form.append("image", payload.image);
    }

    try {
      await axios.post("/items/register-item", form, {
        headers: { Accept: "application/json" },
      });
      await dispatch("fetchItems");
    } catch (error) {
      const apiErr = error.response?.data;
      const firstMsg =
        apiErr?.message ||
        Object.values(apiErr?.errors || {})?.[0]?.[0] ||
        "فشل إنشاء الصنف";
      throw new Error(firstMsg);
    }
  },
};

const mutations = {
  setItems(state, items) {
    state.items = Array.isArray(items) ? items : [];
  },
  setLoading(state, val) {
    state.loading = !!val;
  },
  setError(state, err) {
    state.error = err || null;
  },
  setSearchQuery(state, val) {
    state.searchQuery = val || "";
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
