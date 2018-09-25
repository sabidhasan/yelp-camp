export default (query) => {
  return new Promise((res, rej) => {
    fetch(`/search?q=${query}`)
      .then(res => res.json())
      .then(data => res(data))
      .catch(err => rej(err))
  })
}
