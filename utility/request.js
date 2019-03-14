const dotenv = require('dotenv');

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
  return {
    method: 'POST',
    url: fiscalURL,
    body: body,
    json: false
  }
}

function generate_body_from_fiscal_response (params) {
  const {type, user, token, id, binary} = {...params};
  return {
    operation: 'parse_response',
    type: type,
    auth: {
      user: user,
      token: token
    },
    data: {
      device: {
        id: id
      },
      data: binary
    }
  }
}

function generate_parse_response_params (type, req, data) {
  return {
    type: type,
    user: req.body.auth.user,
    token: req.body.auth.token,
    id: req.body.data.device.id,
    binary: data
  }
}
module.exports = {
  generate_request_options,
  generate_fiscal_device_options,
  generate_body_from_fiscal_response,
  generate_parse_response_params
}