const request = require('../utility/request');
const base64 = require('../utility/base64');
const axios = require('axios');

const baseURL = request.baseURL
const fiscalURL = request.fiscalURL;


async function all(req, res, next) {
  const result = await axios.post(baseURL, req.body)
    .catch(() => {
      const error = new Error('service is down')
      error.status = 500
      return next(error)
    })

  if (result.data.status === 'failed') {
    const error = new Error(result.data.response.message)
    error.status = 404
    return next(error)
  } else {
    const devices = result.data.response.message
    res.send(devices)
  }
}

async function add_device(req, res, next) {
  const result = await axios.post(baseURL, req.body)
    .catch(() => {
      const error = new Error('service is down')
      error.status = 500
      return next(error)
    })
  if (result.data.status === 'failed') {
    const error = new Error(result.data.response.message)
    error.status = 404
    return next(error)
  } else {
    const command = base64.decode(result.data.response.message.activate_command)
    const fs_result = await axios.post(fiscalURL, command).catch(() => {
      const error = new Error('service is down')
      error.status = 500
      return next(error)
    })
    console.log(fs_result.data)
    if (fs_result.data === '') {
      const error = new Error("lost connection with device")
      error.status = 500
      return next(error)
    } else {
      const activate_device_body = {
        auth: {
          token: req.body.auth.token,
          user: req.body.auth.user
        },
        data: {
          data: fs_result.data.message,
          device: {
            id: result.data.response.message.device_id
          }
        },
        operation: 'parse_response',
        type: 'add_device'
      }
      const activate = await axios.post(baseURL, activate_device_body)
      res.send(activate.data.response.message)
    }
  }
}

async function get_device(req, res) {
  const result = await axios.post(baseURL, req.body)
    .catch(() => {
      const error = new Error('service is down')
      error.status = 500
      return next(error)
    })
  if (result.data.response.status === 'failed') {
    const error = new Error(result.response.message)
    error.status = 404
    return next(error)
  } else {
    const device = result.data.response.message
    res.send(device)
  }
}

async function status(req, res, next) {
  const result = await axios.post(baseURL, req.body)
    .catch(() => {
      const error = new Error('service is down')
      error.status = 500
      return next(error)
    })
  if (!Array.isArray(result.data.response.message)) {
    const error = new Error(result.response.message)
    error.status = 404
    return next(error)
  } else {
    const command = base64.decode(result.data.response.message[0])
    const fs_result = await axios.post(fiscalURL, command)
      .catch(() => {
        const error = new Error("lost connection with device")
        error.status = 500
        return next(error)
      })
    if (fs_result.data.message === '') {
      const error = new Error('err device')
      error.status = 500
      return next(error)
    } else {
      const params = request.gen_params('device_status', req, fs_result.data.message)
      const status_body = request.gen_body(params);
      const status_result = await rp(status_options)
        .then(res => JSON.parse(res))
        .catch(err => res.status(500).send(err));
      res.status(200).send(status_result);
      const status_result = await axios.post(baseURL, status_body)
        .catch(() => {
          const error = new Error('service is down')
          error.status = 500
          return next(error)
        })
      const status = status_result.data.response.message
      res.send(status)
    }
  }
}

async function get_time(req, res, next) {
  const result = await axios.post(baseURL, req.body)
  .catch(() => {
    const error = new Error('service is down')
    return next(error)
  })
  if (!Array.isArray(result.data.response.message)) {
    const error = new Error(result.data.response.message)
    return next(error)
  } else {
    const command = base64.decode(result.data.response.message[0]);
    const fs_result = await axios(fiscalURL, command)
    .catch(() => {
      const error = new Error('device is offline')
      return next(error)
    })
    if (fs_result.data.message === '') {
      res.status(500).send('device error')
    } else {
      const params = request.gen_params('get_time_and_date', req, fiscal_response.message);
      const time_body = request.gen_body(params);
      const time = await axios.post(baseURL, time_body)
      res.send(time.data.response.message)
    }
  }
}

async function set_time(req, res) {
  const result = await axios.post(baseURL, req.body)
  .catch(() => {})
  if (!Array.isArray(result.data.response.message)) {
    res.status(403).send(result.data.response.message)
  } else {
    const command = base64.decode(result.data.response.message[0]);
    const fs_result = await axios.post(fiscalURL, command)
    .catch(() => {})
    if (fs_result.data.message === '') {
      res.status(500).send('fiscal device error')
    } else {
      const params = request.gen_params('set_time_and_date', req, fiscal_response.message);
      const time_body = request.gen_body(params);
      const time = await axios.post(baseURL, time_body)
      res.send(time.data.message)
    }
  }
}

module.exports = {
  all,
  add_device,
  get_device,
  status,
  get_time,
  set_time
}