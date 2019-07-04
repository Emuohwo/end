import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import 'babel-polyfill'; // deprecated
import routes from './routes/index';
import PartyWithJsObject from './src/usingJSObject/controllers/Party';
import PartyWithDB from './src/usingDB/controllers/Party';
import UserWithDb from './src/usingDB/controllers/User'
import Auth from './src/usingDB/middleware/Auth';


dotenv.config();
const Party = process.env.TYPE==='db' ? PartyWithDB : PartyWithJsObject;


const app = express();
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({extended: "false"}))
app.use(logger('dev'));
routes(app);
// app.use('/api/v1/', router);

app.post('/api/v1/parties', Auth.verifyToken, Party.create);
app.get('/api/v1/parties', Auth.verifyToken, Party.getAll);
app.get('/api/v1/parties/:id', Auth.verifyToken, Party.getOne);
app.put('/api/v1/parties/:id', Auth.verifyToken, Party.update);
app.delete('/api/v1/parties/:id', Auth.verifyToken, Party.delete);
app.post('/api/v1/users', UserWithDb.create);
app.post('/api/v1/users/login', UserWithDb.login);
app.delete('/api/v1/users/me', Auth.verifyToken, UserWithDb.delete);

app.listen(3000);
// console.log('app listening on port ', 3000);
export default app;
