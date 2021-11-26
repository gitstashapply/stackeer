import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {userDatatransormer} from './apiTransformer';
import {ItemQuestions, QuestionsApiResponse, UserApiResponse} from './types';

const BASE_URL = 'https://api.stackexchange.com/2.3/';

const api = axios.create({
  baseURL: BASE_URL,
});

const get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T> | AxiosError['response']> => {
  try {
    const res = await api.get<T>(url, config);
    return res;
  } catch (e) {
    return e.resonse;
  }
};

export const getUserById = async (userId: number) => {
  const res = await get<UserApiResponse>(
    `users/${userId}?order=desc&sort=reputation&site=stackoverflow`,
  );
  const user = userDatatransormer(res?.data, userId);

  return user;
};

export const getQuestionsByUserId = async (userId: number) => {
  const res = await get<QuestionsApiResponse>(
    `users/${userId}/questions?order=desc&sort=activity&site=stackoverflow`,
  );

  return res?.data.items;
};
