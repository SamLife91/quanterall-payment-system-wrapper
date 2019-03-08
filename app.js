const express = require('express');
const app = express();
/// module paths
// const authRouterPath = `${process.cwd()}/routes/auth`;
// const qps = require(qpsPath)
const auth = require('./routes/auth');
const device = require('./routes/device');
const item = require('./routes/item');

app.use(express.json());
app.use('/api/v1/auth', auth);
app.use('/api/v1/device', device);
app.use('/api/v1/item', item);

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// app.post('/api/v1/login', async (req, res) => {
//   const result = await qps.login(JSON.stringify(body))
//   console.log(result)
//   res.send(result);
// });

// app.post('/api/v1/login', (req, res) => {
//   qps.login(req, res);
// });
// app.post('/api/v1/login', qps.login);
// app.post('/api/v1/login', (req, res, next) => {
//   qps.login(req, res);
// });

// app.post('/api/v1/register', async (req, res) => {
//   const result = await qps.register(JSON.stringify(body))
//   res.send(result);
// });

// app.post('/api/v1/register', qps.register(req, res));

// app.post('/api/v1/device/add', async (req, res) => {
//   const result = await qps.add_device(JSON.stringify(body))
//   res.send(result)
// })

// app.post('/api/v1/device/add', qps.add_device(req, res));

// app.post('/api/v1/device', async (req, res) => {
//   const result = await qps.get_device(JSON.stringify(body))
//   res.send(result)
// })

// app.post('/api/v1/device', qps.get_device(req, res));

// app.post('/api/v1/item/add', async (req, res) => {
//   const result = await qps.add_item(JSON.stringify(body), res)
// })

// app.post('/api/v1/item/add', qps.add_item(req, res));

// app.post('/api/v1/item/get', (req, res) => {
//   qps.test()
// })

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
})