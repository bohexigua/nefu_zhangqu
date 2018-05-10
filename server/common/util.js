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

module.exports = {
  delay: delay,
  delHtmlTag: delHtmlTag
}