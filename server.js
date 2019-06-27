import express from 'express';
import logger from 'morgan';
import routes from './routes/index';

const app = express();
app.use(express.json());
app.use(logger('dev'));
routes(app);
// app.use('api/v1/');
app.listen(3000);
// console.log('app listening on port ', 3000);
export default app;
