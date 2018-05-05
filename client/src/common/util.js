export const delay = (time = 1000) => {              // 延迟 1 s
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time)
  })
}