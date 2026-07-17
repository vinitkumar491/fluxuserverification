import api from "../api/axios";

export const verifyUser = async (letterNo: string) => {
  const response = await api.post("/users/verify", {
    letterNo,
  });

  return response.data;
};