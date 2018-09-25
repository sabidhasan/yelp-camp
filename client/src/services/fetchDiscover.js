export default (shortName) => {
  return new Promise((res, rej) => {
    fetch(`/campground?province=${shortName}`)
      .then(res => res.json())
      .then(data => res(data))
      .catch(err => rej(err))
  })
}
