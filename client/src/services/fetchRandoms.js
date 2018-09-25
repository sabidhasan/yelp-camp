export default () => {
  return new Promise((res, rej) => {
    fetch('/campground?random=true')
      .then(res => res.json())
      .then(data => res(data))
      .catch(err => rej(err))
  })
}
