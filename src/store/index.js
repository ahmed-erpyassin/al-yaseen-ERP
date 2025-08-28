import {auth} from "@/store/modules/auth";
import { createStore } from "vuex";
import { options } from "./modules/options";

export default new createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    options
  },
});
