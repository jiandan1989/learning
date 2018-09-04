import moment from 'moment';
const path = require('path');

export const getDirFiles = (dirPath, bol, reg) => {
  console.log(dirPath)
  const keys = require.context(dirPath, bol, reg);
  if (keys.length > 0) {
    return keys;
  }
}

export const formatDate = (date, formatType = 'YYYY-MM-DD hh:mm:ss') => {
  if (!moment.isMoment(date) || !moment.isMoment(moment(date)) || !moment.isDate(date)) return moment().format(formatType);
  if (moment.isMoment(date)) return date.format(formatType);
  if (moment.isMoment(moment(date))) return moment(date).format(formatDate);
}
