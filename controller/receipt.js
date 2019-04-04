const request = require('../utility/request');
const base64 = require('../utility/base64');
const { forEach } = require('p-iteration');
const axios = require('axios')

const baseURL = request.baseURL
const fiscalURL = request.fiscalURL;

async function fiscal (req, res, next) { 
  const result = await axios.post(baseURL, req.body)
  .catch(() => {
    const error = new Error('service is down')
    return next(error)
  })
  if (!Array.isArray(result.data.response.message)) {
    const error = new Error('device error')
    return next(error)
  }
  const commands = result.data.response.message.map(item => base64.decode(item))
  let fs_commands = [];

  await forEach(commands, async (command) => {
    const fs_result = await axios.post(fiscalURL, command)
    .catch(() => {
      const error = new Error('device error')
      return next(error)
    })
    fs_commands.push(fs_result.data)
  })

  let parsed_commands = [];
  await forEach(fs_commands, async (el) => {
    const params = request.gen_params('fiscal_receipt', req, el.message);
    const pr_body = request.gen_body(params)
    const fiscal = await axios.post(baseURL, pr_body).catch(() => {})
    parsed_commands.push(fiscal.data);
    console.log(parsed_commands)
  })
  res.send(parsed_commands);
}

async function non_fiscal(req, res, next) {
  const result = await axios.post(baseURL, req.body)
  .catch(() => {
    const error = new Error('service is down')
    return next(error)
  })
  if (!Array.isArray(result.data.response.message)) {
    res.status(403).send(res)
  } else {
    const commands = result.data.response.message.map(item => base64.decode(item));
    let fs_commands = [];
    await forEach(commands, async (command) => {
      const fs_result = await axios.post(fiscalURL, command)
      .catch(() => {
        const error = new Error('device error')
        return next(error)
      })
      fs_commands.push(fs_result.data);
    })
    console.log(fs_commands)
    let parsed_commnads = [];
    await forEach(fs_commands, async (command) => {
      const params = request.gen_params('non_fiscal_receipt', req, command.message);
      const pr_body = request.gen_body(params);
      const pr_result = await axios.post(baseURL, pr_body)
      .catch(() => {
        const error = new Error('service is down')
        return next(error)
      })
      parsed_commnads.push(pr_result.data)
    })
    res.send(parsed_commnads);
  }
}

async function reversal (req, res, next) {
  const result = await axios.post(baseURL, req.body)
  .catch(() => {
    const error = new Error('service is down')
    return next(error)
  })

  if (!Array.isArray(result.data.response.message)) {
    const error = new Error(result.data.response.message)
    return next(error)
  } else {
    const commands = result.data.response.message.map(item => base64.decode(item));
    let fs_commands = [];
  await forEach(commands, async (command) => {
    const fs_command = await axios.post(fiscalURL, command)
    .catch(() => {
      const error = new Error('device error')
      return next(error)
    })
    fs_commands.push(fs_command.data.message);
  })

  let parsed_commnads = [];
  await forEach(fs_commands, async (command) => {
    const params = request.gen_params('reversal', req, command);
    const pr_body = request.gen_body(params);
    const pr_result = await axios.post(baseURL, pr_body)
    .catch(() => {
      const error = new Error('service is down')
      return next(error)
    })
    parsed_commnads.push(pr_result.data)
  })
  res.send(parsed_commnads);
  }
}

module.exports = {
  fiscal,
  non_fiscal,
  reversal
}