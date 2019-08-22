import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import 'babel-polyfill'; 
import routes from './routes/index';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({extended: "false"}))
app.use(logger('dev'));
routes(app);
app.use('/api/v1/', router);

routes(router);



// server
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server Started On Port ${port}`);
  });
export default app;
