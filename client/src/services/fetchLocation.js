export default (query) => {
  return new Promise((res, rej) => {
    fetch('https://ipinfo.io/json')
      .then(res => res.json())
      .then(data => res(data))
      .catch(err => rej({}))
  })
}
