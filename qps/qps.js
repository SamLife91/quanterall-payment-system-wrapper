const fetch = require('node-fetch');

const port = '8808'
const baseURL = `http://31.13.251.48:${port}`

async function login (data) {
  const result = fetch(baseURL, {
    mode: 'POST',
    body: JSON.stringify(data)
  })
  Promise.resolve(result)
  console.log(result)
  // return data
  return result
}

function register (params) {
  return (params)
}


// module.exports = {
//   login
// }
module.exports = {login, register}