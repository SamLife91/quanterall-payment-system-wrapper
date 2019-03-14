// const serialization = require('../utility/serialization');
const request = require('../utility/request');
const base64 = require('../utility/base64');

const rp = require('request-promise');

/**
 * @api {post} /api/v1/device/add Add Device
 * @apiName Add Device
 * @apiGroup Device
 * 
 * @apiPermission Authorized user only
 *
 * @apiSuccess {String} status Status Response.
 * @apiSuccess {String} operation Type Operation.
 * @apiSuccess {String} type Response type.
 * @apiSuccess {Object} response Response message or errors.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *     "operation": "parse_response",
 *     "response": {
 *        "errors": [],
 *        "message": "device_created",
 *        "warnings": []
 *     },
 *     "status": "success",
 *     "type": "add_device"
 *    }
 *
 * @apiError Forbidden 403 Invalide data.
 *
 * @apiErrorExample Invalide data:
 *    HTTP/1.1 403 Forbidden
 *    {
 *     "errors": [],
 *     "message": "device_name_is_taken",
 *     "warnings": []
 *    }
 *
 * @apiExample {curl} Example usage:
 *   curl -X POST \
 *    http://localhost:3000/api/v1/device/add \
 *    -H 'Content-Type: application/json' \
 *    -H 'Postman-Token: 2764ee18-6329-4791-a05f-e3c18c7b1cf8' \
 *    -H 'cache-control: no-cache' \
 *    -d '{
 *      "type": "add_device",
 *      "operation": "system",
 *      "auth": {
 *        "user": "arslan",
 *        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoiZWx2aXMiLCJleHAiOjE1NTI0MzYwODF9.eB9eJHf_FkdoJPvc2j8S4dkU2Vcp--XcXzKQkdc2LTxOa9lmYPMHcrZIEHVIarABaKW6DlrMpEPpt0RYEf86hRD684LcgQgC_bevkg3Wh2HSOTlI4SQT1JeFENsexfubBpMI1giUA7Gk3DvQruoHlDeX-YskpgDqVBju-EBFUIFhcBoBwNTFzV3xRQunQW6lEU7FbO3SzECreBbWfJ_MEAf2DAErrY474Bo8YgfHuNy6KU97L9Zb3H3ZY7S8cPMkOuarZGfn5I4xRargeYfr7_AIG-NSPAbLo4W8LY0UmPvNM8wjJ43xEEaNsC0-ItemXMaFpxkMQJtnq1uMIKHAzw"
 *      },
 *      "data": {
 *        "type": "fiscal",
 *        "manufacture": "datecs",
 *        "model": "fp-60kl",
 *        "serial_number": "dt2742k876"
 *      }
 *     }'
 * 
 */

async function add_device (req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body));
  const response = await rp(options)
        .then(res => JSON.parse(res));
  if (response.status === 'failed') {
    res.status(403).send(response.response)
  } else {
    // res.send(response
    console.log('********')
    console.log(response)
    console.log('********')
    console.log(response.response.message.activate_command)
    const fiscal_command = base64.decode(response.response.message.activate_command)
    console.log(fiscal_command)
    const fiscal_options = request.generate_fiscal_device_options(fiscal_command)
    const fiscal_response = await rp(fiscal_options).then(res => JSON.parse(res)).catch(err => res.send(err))
    // res.send(fiscal_response)
    console.log('============')
    console.log(fiscal_response)
    console.log('============')

    const activate_device_body = {
      auth: {
        token: req.body.auth.token,
        user: req.body.auth.user
      },
      data: {
        data: fiscal_response.message,
        device: {
          id: response.response.message.device_id
        }
      },
      operation: 'parse_response',
      type: 'add_device'
    }
    
    const active_device_options = request.generate_request_options(JSON.stringify(activate_device_body))

    console.log('...............')
    console.log(active_device_options)
    console.log('...............')
    const active_device_request = await rp(active_device_options).then(res => JSON.parse(res)).catch(err => console.log(err))
    console.log('-=-=-=-=-=-=')
    console.log(active_device_request)
    console.log('-=-=-=-=-=-=')
    res.send(active_device_request)
  }
}


/**
 * @api {post} /api/v1/device/list List Device
 * @apiName List Device
 * @apiGroup Device
 * 
 * @apiPermission Authorized user only
 *
 * @apiSuccess {String} status Status Response.
 * @apiSuccess {String} operation Type Operation.
 * @apiSuccess {String} type Response type.
 * @apiSuccess {Object} response Response message or errors.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 * { 
 *   "operation": "system",
 *   "response": {
 *       "errors": [],
 *       "message": [
 *          {
 *           "active": false,
 *           "data": "{\"sequence\":33}",
 *           "firmware_version": null,
 *           "id": 9,
 *           "manufacture": "datecs",
 *           "model": "fp-60kl",
 *           "returned_response": false,
 *           "serial_number": "dt1",
 *           "state": null,
 *           "type": "fiscal",
 *           "user_id": 1
 *          }, ..... ],
 *       "warnings": []
 *   },
 *   "status": "success",
 *   "type": "get_all_devices"
 * }
 *
 * @apiError Forbidden 403 Invalide data.
 *
 * @apiErrorExample Invalide data:
 *    HTTP/1.1 403 Forbidden
 *    {
 *     user_does_not_exist
 *    }
 *
 * @apiExample {curl} Example usage:
 *   curl -X POST \
 *     http://localhost:3000/api/v1/device/list \
 *    -H 'Content-Type: application/json' \
 *    -H 'Postman-Token: 5e239a02-e29e-403c-8851-725f31561dc3' \
 *    -H 'cache-control: no-cache' \
 *    -d '{
 *        "type": "get_all_devices",
 *        "operation": "system",
 *        "auth": {
 *         "user": "elvis",
 *         "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoiZWx2aXMiLCJleHAiOjE1NTI0MzYwODF9.eB9eJHf_FkdoJPvc2j8S4dkU2Vcp--XcXzKQkdc2LTxOa9lmYPMHcrZIEHVIarABaKW6DlrMpEPpt0RYEf86hRD684LcgQgC_bevkg3Wh2HSOTlI4SQT1JeFENsexfubBpMI1giUA7Gk3DvQruoHlDeX-YskpgDqVBju-EBFUIFhcBoBwNTFzV3xRQunQW6lEU7FbO3SzECreBbWfJ_MEAf2DAErrY474Bo8YgfHuNy6KU97L9Zb3H3ZY7S8cPMkOuarZGfn5I4xRargeYfr7_AIG-NSPAbLo4W8LY0UmPvNM8wjJ43xEEaNsC0-ItemXMaFpxkMQJtnq1uMIKHAzw"
 *        }
 *       }'
 */

async function get_device (req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options)
        .then(res => JSON.parse(res));
  if (response.status === 'failed') {
    res.status(403).send(response.response.message)
  } else {
    res.send(response)
  }
}

/**
 * @api {post} /api/v1/device/activate Activate Device
 * @apiName Activate Device
 * @apiGroup Device
 * 
 * @apiPermission Authorized user only
 *
 * @apiSuccess {String} status Status Response.
 * @apiSuccess {String} operation Type Operation.
 * @apiSuccess {String} type Response type.
 * @apiSuccess {Object} response Response message or errors.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 * { 
 *   "operation": "system",
 *   "response": {
 *       "errors": [],
 *       "message": [
 *          {
 *           "active": false,
 *           "data": "{\"sequence\":33}",
 *           "firmware_version": null,
 *           "id": 9,
 *           "manufacture": "datecs",
 *           "model": "fp-60kl",
 *           "returned_response": false,
 *           "serial_number": "dt1",
 *           "state": null,
 *           "type": "fiscal",
 *           "user_id": 1
 *          }, ..... ],
 *       "warnings": []
 *   },
 *   "status": "success",
 *   "type": "get_all_devices"
 * }
 *
 * @apiError Forbidden 403 Invalide data.
 *
 * @apiErrorExample Invalide data:
 *    HTTP/1.1 403 Forbidden
 *    {
 *     user_does_not_exist
 *    }
 *
 * @apiExample {curl} Example usage:
 *   curl -X POST \
 *     http://localhost:3000/api/v1/device/list \
 *    -H 'Content-Type: application/json' \
 *    -H 'Postman-Token: 5e239a02-e29e-403c-8851-725f31561dc3' \
 *    -H 'cache-control: no-cache' \
 *    -d '{
 *        "type": "get_all_devices",
 *        "operation": "system",
 *        "auth": {
 *         "user": "elvis",
 *         "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoiZWx2aXMiLCJleHAiOjE1NTI0MzYwODF9.eB9eJHf_FkdoJPvc2j8S4dkU2Vcp--XcXzKQkdc2LTxOa9lmYPMHcrZIEHVIarABaKW6DlrMpEPpt0RYEf86hRD684LcgQgC_bevkg3Wh2HSOTlI4SQT1JeFENsexfubBpMI1giUA7Gk3DvQruoHlDeX-YskpgDqVBju-EBFUIFhcBoBwNTFzV3xRQunQW6lEU7FbO3SzECreBbWfJ_MEAf2DAErrY474Bo8YgfHuNy6KU97L9Zb3H3ZY7S8cPMkOuarZGfn5I4xRargeYfr7_AIG-NSPAbLo4W8LY0UmPvNM8wjJ43xEEaNsC0-ItemXMaFpxkMQJtnq1uMIKHAzw"
 *        }
 *       }'
 */

async function activate_device (req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options).then(res => JSON.parse(res))
  res.send(response)
}


/**
 * @api {post} /api/v1/device/status Status Device
 * @apiName Status Device
 * @apiGroup Device
 * 
 * @apiPermission Authorized user only
 *
 * @apiSuccess {String} status Status Response.
 * @apiSuccess {String} operation Type Operation.
 * @apiSuccess {String} type Response type.
 * @apiSuccess {Object} response Response message or errors.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 * { 
 *   "operation": "system",
 *   "response": {
 *       "errors": [],
 *       "message": [
 *          {
 *           "active": false,
 *           "data": "{\"sequence\":33}",
 *           "firmware_version": null,
 *           "id": 9,
 *           "manufacture": "datecs",
 *           "model": "fp-60kl",
 *           "returned_response": false,
 *           "serial_number": "dt1",
 *           "state": null,
 *           "type": "fiscal",
 *           "user_id": 1
 *          }, ..... ],
 *       "warnings": []
 *   },
 *   "status": "success",
 *   "type": "get_all_devices"
 * }
 *
 * @apiError Forbidden 403 Invalide data.
 *
 * @apiErrorExample Invalide data:
 *    HTTP/1.1 403 Forbidden
 *    {
 *     user_does_not_exist
 *    }
 *
 * @apiExample {curl} Example usage:
 *   curl -X POST \
 *     http://localhost:3000/api/v1/device/list \
 *    -H 'Content-Type: application/json' \
 *    -H 'Postman-Token: 5e239a02-e29e-403c-8851-725f31561dc3' \
 *    -H 'cache-control: no-cache' \
 *    -d '{
 *        "type": "get_all_devices",
 *        "operation": "system",
 *        "auth": {
 *         "user": "elvis",
 *         "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoiZWx2aXMiLCJleHAiOjE1NTI0MzYwODF9.eB9eJHf_FkdoJPvc2j8S4dkU2Vcp--XcXzKQkdc2LTxOa9lmYPMHcrZIEHVIarABaKW6DlrMpEPpt0RYEf86hRD684LcgQgC_bevkg3Wh2HSOTlI4SQT1JeFENsexfubBpMI1giUA7Gk3DvQruoHlDeX-YskpgDqVBju-EBFUIFhcBoBwNTFzV3xRQunQW6lEU7FbO3SzECreBbWfJ_MEAf2DAErrY474Bo8YgfHuNy6KU97L9Zb3H3ZY7S8cPMkOuarZGfn5I4xRargeYfr7_AIG-NSPAbLo4W8LY0UmPvNM8wjJ43xEEaNsC0-ItemXMaFpxkMQJtnq1uMIKHAzw"
 *        }
 *       }'
 */

async function status (req, res) {
  console.log('test')
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options).then(res => JSON.parse(res))
  res.send(response)
}

module.exports = {
  add_device,
  get_device,
  activate_device,
  status
}