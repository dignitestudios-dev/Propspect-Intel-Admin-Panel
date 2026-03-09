import axiosinstance from "../../axios";

export const getUsers = async ({ page = 1, itemsPerPage = 10, search }) => {
  const res = await axiosinstance.get(
    `/user?page=${page}&limit=${itemsPerPage}&search=${search}`,
  );
  return res.data;
};
export const getStatesUsers = async () => {
  const res = await axiosinstance.get(`/user/dashboard/counts`);
  return res.data.data;
};
