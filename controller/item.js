const serialization = require('../utility/serialization');
const request = require('../utility/request');
const base64 = require('../utility/base64')

const msgpack = require('msgpack');
const lite = require('msgpack-lite')

const rp = require('request-promise');

/**
 * @api {post} /api/v1/item/add Add Item
 * @apiName Add Item
 * @apiGroup Item
 * 
 * @apiPermission Authorized user only
 *
 * @apiSuccess {String} status Status Response.
 * @apiSuccess {String} message Message for Response.
 * @apiSuccess {String} error Response errors.
 *
 * 
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *     "status": "ok",
 *     "message": "ASxFa1AEgKCAgISCBTA0N",
 *     "error": ""
 *    }
 *
 * @apiError Forbidden 403 Invalide data.
 *
 * @apiErrorExample Invalide data:
 *    HTTP/1.1 403 Forbidden
 *    {
 *     "operation": "build_command",
 *     "response": {
 *       "errors": [],
 *       "message": "no such device id",
 *       "warnings": []
 *      },
 *     "status": "failed",
 *     "type": "add_item"
 *    }
 *
 * @apiExample {curl} Example usage:
 *    curl -X POST \
 * http://localhost:3000/api/v1/item/add \
 * -H 'Content-Type: application/json' \
 * -H 'Postman-Token: 9b35233c-1158-4949-a330-3fc0ed0bc6c8' \
 * -H 'cache-control: no-cache' \
 * -d '{
 *     "type": "add_item",
 *     "operation": "build_command",
 *     "auth": {
 *       "user": "elvis",
 *       "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoiZWx2aXMiLCJleHAiOjE1NTI0MzYwODF9.eB9eJHf_FkdoJPvc2j8S4dkU2Vcp--XcXzKQkdc2LTxOa9lmYPMHcrZIEHVIarABaKW6DlrMpEPpt0RYEf86hRD684LcgQgC_bevkg3Wh2HSOTlI4SQT1JeFENsexfubBpMI1giUA7Gk3DvQruoHlDeX-YskpgDqVBju-EBFUIFhcBoBwNTFzV3xRQunQW6lEU7FbO3SzECreBbWfJ_MEAf2DAErrY474Bo8YgfHuNy6KU97L9Zb3H3ZY7S8cPMkOuarZGfn5I4xRargeYfr7_AIG-NSPAbLo4W8LY0UmPvNM8wjJ43xEEaNsC0-ItemXMaFpxkMQJtnq1uMIKHAzw"
 *     },
 *     "data": {
 *       "item_data": {
 *         "group": "1",
 *         "name": "test_item_name",
 *         "number": "1",
 *         "quantity": "1",
 *         "price": "1.00",
 *         "tax_group": "Б"
 *        },
 *        "device": {
 *          "id": "363"
 *        }
 *      }
 *    }'
 * 
 */

async function add_item(req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options).then(res => JSON.parse(res)).catch(err => res.status(403).send(err));
  console.log(response)
  if (response.status === 'failed') {
    res.status(403).send(response)
  } else {
    console.log(response.response.message[0])
    const fiscal_command = base64.decode(response.response.message[0])
    console.log(fiscal_command)

    const fiscal_options = request.generate_fiscal_device_options(fiscal_command);
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