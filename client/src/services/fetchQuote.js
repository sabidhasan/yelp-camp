export default () => {
  return new Promise((res, rej) => {
    fetch('/quote')
      .then(res => res.json())
      .then(data => res(data))
      .catch(err => rej(err))
  })
}
