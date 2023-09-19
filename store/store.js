import {
  addDataTable,
  deleteDataTable,
  getDataTable,
  getDetailData,
  updateDataTable,
} from "../apis/dataAPI";

export const state = () => ({
  snackbar: false,
  data: [],
  detail: {},
});
export const getters = {
  getSnackbar(state) {
    return state.snackbar;
  },
  getData(state) {
    return state.data;
  },
  getDetail(state) {
    return state.detail;
  },
};
export const mutations = {
  setSnackbar(state, result) {
    state.snackbar = result;
  },
  setData(state, result) {
    state.data = result;
  },
  setDetail(state, result) {
    state.detail = result;
  },
};
export const actions = {
  async deleteData({ commit }, id) {
    try {
      const res = await deleteDataTable(id);
      if (res) {
        commit("setSnackbar", true);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getData({ commit }) {
    try {
      const res = await getDataTable();
      if (res) {
        commit("setData", res);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async postData({ commit }, payload) {
    try {
      const res = await addDataTable(payload);

      if (res) {
        commit("setSnackbar", true);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getDetailData({ commit }, id) {
    try {
      const res = await getDetailData(id);
      if (res) {
        commit("setDetail", res);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async updateData({ commit }, payload) {
    try {
      const res = await updateDataTable(payload);
      if (res) {
      }
    } catch (error) {
      console.log(error);
    }
  },
};
