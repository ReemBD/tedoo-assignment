import moment from 'moment';

export const formatPostTime = (date: Date): string => {
  return moment(date).from(Date.now());
};
