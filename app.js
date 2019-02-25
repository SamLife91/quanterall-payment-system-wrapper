const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/courses', async (req, res) => {
  const result = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  console.log(result);
  res.send(result);
});

app.get('/api/courses/:id', (req, res) => {
  // get route params
  res.send(req.params);
})

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
})