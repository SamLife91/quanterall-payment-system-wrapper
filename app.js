const express = require('express');
const app = express();
const timeout = require('connect-timeout');

const auth = require('./routes/auth');
const device = require('./routes/device');
const item = require('./routes/item');
const receipt = require('./routes/receipt');

const morgan = require('morgan');
require('dotenv').config();

app.use(timeout('600s'));
app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/v1/auth', auth);
app.use('/api/v1/device', device);
app.use('/api/v1/item', item);
app.use('/api/v1/receipt', receipt);

// PORT
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`listening on port ${port}...`);
})
server.timeout = 1000000;