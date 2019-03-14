// const serialization = require('../utility/serialization');
const request = require('../utility/request');

const rp = require('request-promise');

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

async function login(req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options).then(response => JSON.parse(response)).catch(err => res.status(403).send(err))
  if (response.status === 'failed') {
    res.status(403).send(response.response.message)
  } else {
    res.send(response)
  }
}

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

async function register(req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options)
    .then(res => JSON.parse(res));
  if (response.status === 'failed') {
    res.status(403).send(response.response.message)
  } else {
    res.send(response)
  }
}

module.exports = { login, register }


/**
 *  apidoc -e "(node_modules|public)" -i ./ -o apidoc/
*/