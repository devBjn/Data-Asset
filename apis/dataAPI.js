import axiosClient from "./axiosClient";
export const getDataTable = async () => {
  try {
    const { data } = await axiosClient.get("/tableData");
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteDataTable = async (id) => {
  try {
    const data = await axiosClient.delete(`/tableData/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const addDataTable = async (payload) => {
  try {
    const { data } = await axiosClient.post("/tableData", payload);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getDetailData = async (id) => {
  try {
    const { data } = await axiosClient.get(`/tableData/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const updateDataTable = async (payload) => {
  try {
    const { data } = await axiosClient.put(`/tableData/${payload.id}`, payload);
    return data;
  } catch (error) {
    console.log(error);
  }
};
