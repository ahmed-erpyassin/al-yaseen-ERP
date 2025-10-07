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
    // حدد الحقول المسموح إرسالها فقط (Whitelist)
    const allowed = {
      company_id: 1, // غيّرها حسب شركتك
      branch_id: 1, // مطلوب غالبًا
      type: "product", // المنتج
      item_number: null,
      item_name_ar: null,
      item_name_en: null,

      // وحدات وكميات أساسية
      unit_id: null, // لو عندك unit_id رقمي
      unit: null, // أو unit نصيًا، واحدة تكفي حسب سيرفرك
      quantity: 0,

      // أسعار بيع/شراء أساسية
      first_selling_price: 0,
      second_selling_price: 0,
      third_selling_price: 0,
      selling_discount_percentage: 0,
      max_discount_percentage: 0,
      min_price: 0,

      first_purchase_price: 0,
      second_purchase_price: 0,
      third_purchase_price: 0,
      purchase_discount_percentage: 0,

      // VAT/Flags
      selling_vat: false,
      purchase_vat: false,
      item_vat: false,
      active: true,

      // باركود وتواريخ
      barcode: null,
      barcode_type: null,
      expire_date: null,

      // تصنيفات ومستودعات (اختياري/حسب الحاجة)
      category_type: null,
      raw_materials_warehouse_id: null,
      finished_product_warehouse_id: null,

      // صورة
      image: null,
      // أي حقول إضافية عندك… (لكن حاول تبقيها ضمن ما يعرفه السيرفر)
    };

    // ادمج payload داخل allowed بدون إرسال شيء undefined/null/فاضي
    const data = { ...allowed, ...payload };

    // مهم: لو كان عندك unit نصّي (مثل 'piece') وما عندك unit_id، ارسل واحد منهم فقط
    if (!data.unit_id && !data.unit) {
      data.unit = "piece"; // قيمة افتراضية آمنة (غيّرها لو السيرفر يشترط unit_id)
    }

    // حوّل ل FormData
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (v === undefined || v === null || v === "") return;
      // البوليان يفضّل تحويله لـ 0/1 إن كان السيرفر ما يدعم boolean
      if (typeof v === "boolean") form.append(k, v ? 1 : 0);
      else form.append(k, v);
    });

    // لو فيه ملف صورة
    if (payload?.image instanceof File) {
      form.set("image", payload.image);
    }

    try {
      // ⚠️ لا تضع Content-Type يدوياً؛ FormData يضبطه تلقائيًا
      await axios.post("/inventory-items/register-inventory", form, {
        headers: { Accept: "application/json" },
      });
      await dispatch("fetchItems");
    } catch (error) {
      // مرّر رسالة تحقق 422 لو ظهرت
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
