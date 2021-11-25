import {ItemsEntity, UserApiResponse} from './types';

export const userDatatransormer = (
  data: UserApiResponse,
  userId: number,
): ItemsEntity | undefined => {
  const userData = data.items?.find(user => user.user_id === userId);

  return userData;
};
