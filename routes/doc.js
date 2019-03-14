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

/**
 * @api {post} /api/v1/auth/login Login User
 * @apiName Login
 * @apiGroup Auth
 * 
 * @apiPermission Non authorized
 *
 * @apiSuccess {String} type Unique Type of Request.
 * @apiSuccess {String} status Status Request.
 * @apiSuccess {Object} response Response message or errors.
 * @apiSuccess {String} operation Type operation.
 *
 * 
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "type": "login",
 *      "status": "success",
 *      "response": {
 *        "warnings": [],
 *         "message": {
 *          "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoiZWx2aXMiLCJleHAiOjE1NTA4MTgxNTd9.INJZT38sMOBTQhfqbQe0X3Gy2EauteFCrC409F6ZdovwDIpSgTBI527QkKwesmaya3zMcK7X_kMeEBN5RSSWFhj9sP45o7O7aUiHeRSNxPdAAvwDhLkZDEhV0NjyQnX0zDr1wJ3ik0gW1aIWx1WlIKcGv39yqW5GpESfqd2jmEZXmCmVWR3M3mV9rw0wXHA0I7m8-NkreEOKFZW0liWyzoXZl0pZZoaBkpb8IbirOoqhVvYPP3LNvT3bTNHxPDNrvsPtxQBHIrqtL3xijMPRlRsPCxjOEJjbDy2cIiTwpwXU6zYab3IEcd0qzh7_KOOHu_iWIjVozHQwo8FbMf69hw"
 *        },
 *        "errors": []
 *      },
 *      "operation": "auth"
}
 *
 * @apiError UserNotFound 404 The id of the User was not found.
 * @apiError InvalidAuthentication 403 Authentication failed.
 *
 * @apiErrorExample UserNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *     "operation": "auth",
 *    "response": {
 *       "errors": [],
 *      "message": "wrong_username_or_password",
 *      "warnings": []
 *    },
 *    "status": "failed",
 *    "type": "login"
 *    }
 *
 * @apiExample {curl} Example usage:
 *     curl -X POST \
 * http://localhost:3000/api/v1/auth/login \
 * -H 'Content-Type: application/json' \
 * -H 'Postman-Token: 3bd60272-a674-4b3a-8ded-88efa05715fc' \
 * -H 'cache-control: no-cache' \
 * -d '{
 *     "type": "login",
 *     "operation": "auth",
 *     "data": {
 *       "user": "elvis",
 *       "password": "elvis"
 *     }
 *    }'
 * 
 */

 /**
 * @api {post} /api/v1/auth/register Register User
 * @apiName Register
 * @apiGroup Auth
 * 
 * @apiPermission Non authorized
 *
 * @apiSuccess {String} type Unique Type of Request.
 * @apiSuccess {String} status Status Request.
 * @apiSuccess {Object} response Response message or errors.
 * @apiSuccess {String} operation Type operation.
 *
 * 
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "operation": "auth",
 *      "response": {
 *        "errors": [],
 *        "message": "user_was_registered",
 *       "warnings": []
 *     },
 *      "status": "success",
 *      "type": "register"
 *    }
 *
 * @apiError UserNotFound 404 The id of the User was not found.
 *
 * @apiErrorExample UserNotFound:
 *    HTTP/1.1 404 Not Found
 *    {
 *     "type": "register",
 *     "status": "failed",
 *     "response": {
 *       "warnings": [],
 *       "message": "username_already_exists",
 *       "errors": []
 *      },
 *     "operation": "auth"
 *    }
 *
 * @apiExample {curl} Example usage:
 *    curl -X POST \
 *      http://localhost:3000/api/v1/auth/register \
 *      -H 'Content-Type: application/json' \
 *      -H 'Postman-Token: 8f4795d8-4bc9-438f-bc97-fc2736611dca' \
 *      -H 'cache-control: no-cache' \
 *      -d '{
 *	        "type": "register",
 *	        "operation": "auth",
 *	        "data": {
 *	          "user": "arslan",
 *	          "password": "arslan_password",
 *	          "mail": "arslan@mail.arslan",
 *	          "first_name": "arslan",
 *	          "last_name": "arslan"
 *           }
 *        }'
 * 
 */

 /**
 *  apidoc -e "(node_modules|public)" -i ./ -o apidoc/
*/

