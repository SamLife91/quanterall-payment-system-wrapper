require('dotenv').config();

const port = `${process.env.API_URL_PORT}`;
const printerPort = `${process.env.FISCAL_DEVICE_PORT}`;
const baseURL = `${process.env.API_URL}:${port}`;
const fiscalURL = `${process.env.FISCAL_DEVICE_URL}:${printerPort}`;



function gen_options (body) {
  return {
    method: 'POST',
    url: baseURL,
    body: body,
    json: false
  }
}

function gen_device_options (body) {
  return {
    method: 'POST',
    url: fiscalURL,
    body: body,
    json: false
  }
}

function gen_body (params) {
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

function gen_params (type, req, data, id = null) {
  return {
    type: type,
    user: req.body.auth.user,
    token: req.body.auth.token,
    id: req.body.data.device.id ? req.body.data.device.id : id,
    binary: data
  }
}
module.exports = {
  gen_options,
  gen_device_options,
  gen_body,
  gen_params
}