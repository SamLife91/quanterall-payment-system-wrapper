const port = '8808';
const printerPort = '8800'
const baseURL = `http://31.13.251.48:${port}`;
const fiscalURL = `http://192.168.0.150:${printerPort}`;

function generate_request_options (body) {
  return {
    method: 'POST',
    url: baseURL,
    body: body,
    json: false
  }
}

function generate_fiscal_device_options (body) {
  console.log(body)
  return {
    method: 'POST',
    url: fiscalURL,
    body: body,
    json: false
  }
}
module.exports = {
  generate_request_options,
  generate_fiscal_device_options
}