import {auth} from "@/store/modules/auth";
import { createStore } from "vuex";
import { options } from "./modules/options";
import { customer } from "./modules/customer";
import { outgoingQuotations } from "./modules/outgoingQuotations";
import items from "./modules/items";
import warehouse from "./modules/warehouse";

export default new createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    options,
    customer,
    items,
    warehouse,
    outgoingQuotations
  },
});
