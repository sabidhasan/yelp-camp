// Recieves both DELETE and NEW COMMENT (POST) requests, based on postBody
export default (postBody) => {
  return new Promise((res, rej) => {
    fetch('/comment', postBody)
      .then(res => res.json())
      .then(data => res(data))
      .catch(err => rej(err))
  })
}
