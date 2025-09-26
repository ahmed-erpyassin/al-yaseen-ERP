import {auth} from "@/store/modules/auth";
import { createStore } from "vuex";
import { options } from "./modules/options";
import { customer } from "./modules/customer";
import { outgoingQuotations } from "./modules/outgoingQuotations";

export default new createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    options,
    customer,
    outgoingQuotations
  },
});
