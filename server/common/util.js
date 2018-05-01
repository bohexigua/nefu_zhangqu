const delay = (time = 1000) => {              // 延迟 1 s
  return Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time)
  })
}


module.exports = {
  delay: delay
}