import express from 'express';

const app = express();
const port = 3000;

import routes from './routes/base.route';

app.use('/', routes);

app.listen(port, () => {
  console.log('Server started ...');
})