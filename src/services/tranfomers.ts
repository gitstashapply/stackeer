import {ItemQuestions, ItemsEntity, UserApiResponse} from './types';

export const userDatatransormer = (
  data: UserApiResponse,
  userId: number,
): ItemsEntity | undefined => {
  const userData = data.items?.find(user => user.user_id === userId);

  return userData;
};

export const sortBy = (key: string, arr: any[]) => {
  const data = [...arr];
  return data?.sort((a, b) => b[key] - a[key]);
};

export const sortByDate = (questonsData: ItemQuestions[]) => {
  return sortBy('creation_date', questonsData);
};

export const sortByAnswers = (questonsData: ItemQuestions[]) => {
  return sortBy('answer_count', questonsData);
};

export const sortByViews = (questonsData: ItemQuestions[]) => {
  return sortBy('view_count', questonsData);
};

enum sortingIds {
  BY_DATE = 'by_date',
  BY_ANSWER = 'by_answer',
  BY_VIEWS = 'by_views',
}

enum sortingKeys {
  BY_DATE = 'creation_date',
  BY_ANSWER = 'answer_count',
  BY_VIEWS = 'view_count',
}

export const questionSectionSortingMetadata = [
  {
    id: sortingIds.BY_DATE,
    sortingKey: sortingKeys.BY_DATE,
    title: 'BY DATE',
  },
  {
    id: sortingIds.BY_ANSWER,
    sortingKey: sortingKeys.BY_ANSWER,
    title: 'BY ANSWERS',
  },
  {
    id: sortingIds.BY_VIEWS,
    sortingKey: sortingKeys.BY_VIEWS,
    title: 'BY VIEWS',
  },
];
