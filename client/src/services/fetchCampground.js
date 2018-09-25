export default (id) => {
  return new Promise((res, rej) => {
    fetch(`/campground?id=${id}`)
      .then(res => res.json())
      .then(data => res(data))
      .catch(err => rej(err))
  })
}
