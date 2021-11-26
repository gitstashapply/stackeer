import moment from 'moment';

export const unixToFormatedDate = (unix: number) => {
  return moment.unix(unix).format('DD.MM.YYYY');
};
