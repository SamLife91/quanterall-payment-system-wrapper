const serialization = require('../utility/serialization');
const request = require('../utility/request');
const base64 = require('../utility/base64')

const msgpack = require('msgpack');
const lite = require('msgpack-lite')

const rp = require('request-promise');

async function add_item(req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options).then(res => JSON.parse(res)).catch(err => res.status(403).send(err));
  console.log(response)
  if (response.status === 'failed') {
    res.status(403).send(response)
  } else {
    console.log(response.response.message[0])
    // const fiscal_command = base64.decode(response.response.message[0])
    const fiscal_command = base64.decode(response.response.message[0])
    console.log(fiscal_command)

    const fiscal_options = request.generate_fiscal_device_options(JSON.stringify(fiscal_command));
    const fiscal_response = await rp(fiscal_options).then(res => JSON.parse(res)).catch((err) => res.status(500).send(err));
    console.log('******************')
    console.log(fiscal_response)
    console.log('******************')
    const fiscal_body = {
      type: 'add_item',
      operation: 'parse_response',
      auth: {
        user: req.body.auth.user,
        token: req.body.auth.token
      },
      data: {
        device: {
          id: req.body.data.device.id
        },
        data: fiscal_response.message
      }
    }
    console.log(fiscal_body)
    res.send(fiscal_response)
    
  }
}


module.exports = {
  add_item
}