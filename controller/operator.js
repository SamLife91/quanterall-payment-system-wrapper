const rp = require('request-promise');
const request = require('../utility/request');
const base64 = require('../utility/base64')

async function get_operator (req, res) {
  const options = request.gen_options(JSON.stringify(req.body))
  const response = await rp(options)
    .then(res => JSON.parse(res))
    .catch(err => res.status(500).send(err))
  if (!Array.isArray(response.response.message)) {
    res.status(403).send(res.message)
  } else {
    const fiscal_command = base64.decode(response.response.message[0])
    const fiscal_options = request.gen_device_options(fiscal_command)
    const fiscal_response = await rp(fiscal_options)
      .then(res => JSON.parse(res))
      .catch(err => res.status(500).send(err))
    if (fiscal_response.message === '') {
      res.status(500).send('fiscal device error')
    } else {
      const params = request.gen_params('get_operator_info', req, fiscal_response.message)
      const parse_response_body = request.gen_body(params)
      const parse_response_options = request.gen_options(JSON.stringify(parse_response_body))
      const parse_response_request = await rp(parse_response_options)
        .then(res => JSON.parse(res))
        .catch(err => res.status(500).send(err))
      res.send(parse_response_request);
    }
  }
}

module.exports = { get_operator }