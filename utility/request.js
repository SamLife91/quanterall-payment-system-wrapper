const port = '8808'
const baseURL = `http://31.13.251.48:${port}`

function generate_request_options (body) {
  return {
    method: 'POST',
    url: baseURL,
    body: body,
    json: false
  }
}

module.exports = {
  generate_request_options
}