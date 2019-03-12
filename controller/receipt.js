const request = require('../utility/request');
const base64 = require('../utility/base64');
const rp = require('request-promise');
const { forEach } = require('p-iteration');

async function fiscal (req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body));
  const response = await rp(options).then(res => JSON.parse(res))
  .catch(err => res.status(500).send(err))
  console.log(response.response.message)
  const fiscal_commands = response.response.message.map(item => base64.decode(item));
  console.log(fiscal_commands)
  let com = [];

  await forEach(fiscal_commands, async (command) => {
    const fiscal_option = request.generate_fiscal_device_options(command);
    const fiscal_response = await rp(fiscal_option).then(res => JSON.parse(res))
    com.push(fiscal_response)
  })

  let command_responses = [];
  await forEach(com, async (el) => {
    let fiscal_response_body = {
      operation: 'parse_response',
      type: 'fiscal_receipt',
      auth: {
        user: req.body.auth.user,
        token: req.body.auth.token
      },
      data: {
        device: {
          id: req.body.data.device.id
        },
        data: el.message
      }
    }
    const fiscal_response_option = request.generate_request_options(JSON.stringify(fiscal_response_body));
    const fiscal = await rp(fiscal_response_option).then(res => JSON.parse(res))
      .catch(err => res.status(500).send(err))
    command_responses.push(fiscal);
  })
  res.send(command_responses);
}

async function non_fiscal (req, res) {
  
}

async function reversal (req, res) {
  
}

module.exports = {
  fiscal,
  non_fiscal,
  reversal
}