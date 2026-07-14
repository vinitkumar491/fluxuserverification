import api from "../api/axios";

export const verifyUser = async (
  name: string,
  email: string,
  phone: number
) => {
  const response = await api.post("/users/verify", {
    name,
    email,
    phone,
  });

  return response.data;
};