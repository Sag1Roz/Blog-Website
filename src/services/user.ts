import axios from "axios";
import { User } from "../models/user";

const url = "https://blog-master-ndnf.onrender.com/api/";

export async function login(body: { email: string }) {
  try {
    const { data } = await axios.post(`${url}login`, { ...body });

    if (!data.status) throw data.error;

    return data.success as boolean;
  } catch (error) {
    return null;
  }
}

export async function getUser(token: string) {
  try {
    const { data } = await axios.get(`${url}user`, { headers: { token } });
    if (!data.status) throw data.error;
    return data.user as User;
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

    const newUser = data.newUser as boolean;
    const token = data.token as string;

    return { newUser, token };
  } catch (error) {
    return null;
  }
}

export async function updateUser(body: {
  firstName: string;
  lastName: string;
  email: string;
  nickname: string;
}) {
  try {
    const { data } = await axios.put(`${url}user/update-user `, { ...body });
    if (!data.status) throw data.error;

    return data.token as string;
  } catch (error) {
    return null;
  }
}
