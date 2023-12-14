import axios from "axios";

const url = "https://blog-master-ndnf.onrender.com/api/";

export async function login(body: { email: string }) {
  try {
    const { data } = await axios.post(`${url}login`, { ...body });

    if (!data.status) throw data.error;
    return data.token as string;
  } catch (error) {
    return null;
  }
}

export async function getUser(token: string) {
  try {
    const { data } = await axios.get(`${url}user`, { headers: { token } });
    if (!data.status) throw data.error;
    return data.user;
  } catch (error) {
    return null;
  }
}

export async function register(body: {
  email: string;
  firstName: string;
  lastName: string;
  nickname: string;
}) {
  try {
    const { data } = await axios.post(`${url}register `, { ...body });
    if (!data.status) throw data.error;
    console.log(data.token);

    return data.token as string;
  } catch (error) {
    return null;
  }
}

export async function verifyCode(body: { email: string; otp: string }) {
  try {
    const { data } = await axios.post(`${url}verify-code `, { ...body });
    if (!data.status) throw data.error;
    return data;
  } catch (error) {
    return null;
  }
}
