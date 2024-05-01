const promiseSetTimeOut = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

const getDownloadLinkByItag = (formats, itag) => {
  const formatObj = formats.find((format) => format.itag === Number(itag));
  if (formatObj.itag === 140) {
    return { url: formatObj.url, cL: formatObj.contentLength };
  }
  return formatObj.url;
};

const toNumber = (str) => {
  const regex = /[0-9]+/;
  return Number(regex.exec(str));
};

module.exports = {
  promiseSetTimeOut,
  getDownloadLinkByItag,
  toNumber,
};
