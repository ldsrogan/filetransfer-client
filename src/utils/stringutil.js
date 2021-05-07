export const jobUrl = str => {
  return str ? str.replace('Job QP', 'qp').toLowerCase() : '';
};

export const jobID = str => {
  return parseInt(str.replace('Job QP', ''));
};

const intToFiveDigitStr = integer => {
  const changedValue = `0000${integer.toString()}`.slice(-5);
  return changedValue;
};

export const jobName = id => {
  return `Job QP${intToFiveDigitStr(id)}`;
};

export const capitalize = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const formatBytes = (bytes, kilo = 1024, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = kilo;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // eslint-disable-next-line no-restricted-properties
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
