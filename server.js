import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import 'babel-polyfill'; // deprecated
import routes from './routes/index';
import PartyWithJsObject from './src/usingJSObject/controllers/Party';
import PartyWithDB from './src/usingDB/controllers/Party';
import OfficeWithDB from './src/usingDB/controllers/Office';
import OfficeWithJsObject from './src/usingJSObject/controllers/Office';
import CandidateWithDB from './src/usingDB/controllers/Candidate'
import CandidateWithJsObject from './src/usingJSObject/controllers/Candidate';
import UserWithDb from './src/usingDB/controllers/User'
import Auth from './src/usingDB/middleware/Auth';


dotenv.config();
const Party = process.env.TYPE==='db' ? PartyWithDB : PartyWithJsObject;
const Office = process.env.TYPE==='db' ? OfficeWithDB : OfficeWithJsObject;
const Candidate = process.env.TYPE==='db' ? CandidateWithDB : CandidateWithJsObject;


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

app.post('/api/v1/offices', Auth.verifyToken, Office.create);
app.get('/api/v1/offices', Auth.verifyToken, Office.getAll);
app.get('/api/v1/offices/:id', Auth.verifyToken, Office.getOneOffice);
app.put('/api/v1/offices/:id', Auth.verifyToken, Office.update);
app.delete('/api/v1/office/:id', Auth.verifyToken, Office.delete);

app.post('/api/v1/candidates', Auth.verifyToken, Candidate.createCandidate);
app.get('/api/v1/candidates', Auth.verifyToken, Candidate.getAllCandidates);
app.get('/api/v1/candidates/:id', Auth.verifyToken, Candidate.getOneCandidate);
app.put('/api/v1/candidates/:id', Auth.verifyToken, Candidate.updateOndeCandidate);
app.delete('/api/v1/candidates/:id', Auth.verifyToken, Candidate.deleteCandidate);


app.listen(3000);
// console.log('app listening on port ', 3000);
export default app;
