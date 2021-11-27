import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {userDatatransormer} from './tranfomers';
import {QuestionsApiResponse, UserApiResponse} from './types';

const BASE_URL = 'https://api.stackexchange.com/2.3/';

export const api = axios.create({
  baseURL: BASE_URL,
});

const get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T> | AxiosError['response']> => {
  try {
    const res = await api.get<T>(url, config);
    console.log(res);

    return res;
  } catch (e) {
    throw new Error();
  }
};

export const getUserById = async (userId: number) => {
  try {
    const res = await get<UserApiResponse>(
      `users/${userId}?order=desc&sort=reputation&site=stackoverflow`,
    );
    const user = userDatatransormer(res?.data, userId);
    return user;
  } catch (e) {
    // ERROR HANDLING...
    return {error: true};
  }
};

export const getQuestionsByUserId = async (userId: number) => {
  try {
    const res = await get<QuestionsApiResponse>(
      `users/${userId}/questions?order=desc&sort=activity&site=stackoverflow`,
    );
    return res?.data.items;
  } catch (e) {
    // ERROR HANDLING...
    return {error: true};
  }
};
