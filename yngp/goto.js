const ios = /iphone/i.test(navigator.userAgent);

/**
 * 直播室
 * @param {Number} id -直播室ID
 */
export const toLive = id => {
  window.location.href = `yncj://LiveDetail?teacherID=${id}&initIndex=0`;
};

/**
 * 浏览器
 * @param {String} url - 网址
 */
export const toWeb = url => {
  window.location.href = `yncj://WebUrl?url=%22${url}%22&isBlackNav=1`;
};

/**
 * 跳转到股票行情
 * @param {Number} code - 股票代码
 * @param {String} market - 市场代码: 上海=XSHG 深圳=XSHE
 * @param {String} name - 股票名称
 */
export const toStock = (code, market, name) => {
  const stockCode = `${code}.${market}`;
  const stockName = name;
  if (ios) {
    window.location.href = `yncj://individualShare?stockCode=${stockCode}&stockName=${stockName}`;
  } else {
    OCObject.timesharing(JSON.stringify({ stockCode, stockName }));
  }
};