const delay = (time = 1000) => {              // 延迟 1 s
  return Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time)
  })
}

const delHtmlTag = (str) => {
  //去掉所有的html标记
  return str.replace(/<[^>]+>/g, '');
}

const getMaxDate = (arr) => {
  if (arr.length < 1) return new Date().valueOf();
  let preDate = {
    time: new Date(arr[0].issue_date),
    item: 0
  };
  for (let i = 1; i < arr.length; i++) {
    let item = arr[i];
    let date = new Date(item.issue_date);
    if (preDate.time.valueOf() >= date.valueOf()) {
      preDate.time = date;
      preDate.item = i;
    }
  }
  return preDate.time;
}

module.exports = {
  delay: delay,
  delHtmlTag: delHtmlTag,
  getMaxDate: getMaxDate
}