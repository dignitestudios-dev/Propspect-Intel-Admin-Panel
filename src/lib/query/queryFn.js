import axiosinstance from "../../axios";

export const getUsers = async () => {
  const { data } = await axiosinstance.get("/users");
  return data;
};
