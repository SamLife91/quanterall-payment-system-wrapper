const express = require('express');
const app = express();
/// module paths
const qpsPath = `${process.cwd()}/qps/qps`
const qps = require(qpsPath)

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/api/v1/login', async (req, res) => {
  const result = await qps.login(JSON.stringify(body))
  console.log(result)
  res.send(result);
});

app.post('/api/v1/register', async (req, res) => {
  const result = await qps.register(JSON.stringify(body))
  res.send(result);
});

app.post('/api/v1/device/add', async (req, res) => {
  const result = await qps.add_device(JSON.stringify(body))
  res.send(result)
})

app.post('/api/v1/device', async (req, res) => {
  const result = await qps.get_device(JSON.stringify(body))
  res.send(result)
})

app.post('/api/v1/item/add', async (req, res) => {
  const result = await qps.add_item(JSON.stringify(body), res)
})

app.post('/api/v1/item/get', async (req, res) => {
  
})

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
})