const express = require('express');
const app = express();
/// module paths
// const authRouterPath = `${process.cwd()}/routes/auth`;
// const qps = require(qpsPath)

const auth = require('./routes/auth');
const device = require('./routes/device');
const item = require('./routes/item');

const morgan = require('morgan')

app.use(express.json());
app.use('/apidoc', express.static('apidoc'));
app.use(morgan('tiny'));
app.use('/api/v1/auth', auth);
app.use('/api/v1/device', device);
app.use('/api/v1/item', item);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
})