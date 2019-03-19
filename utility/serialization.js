const msgpack = require('msgpack');

function serialize_request (param, toFiscal = false) {
  const body = JSON.stringify(param)
  const package = msgpack.pack(body)
  return toFiscal ? package : package.toString('base64')
}


function serialize_response (response) {
  const binary = new Buffer(response, 'base64')
  return msgpack.unpack(binary)
}





module.exports = {
  serialize_request,
  serialize_response
}