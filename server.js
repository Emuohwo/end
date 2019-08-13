import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import 'babel-polyfill'; 
import routes from './routes/index';
import PartyWithJsObject from './src/usingJSObject/controllers/Party';
import PartyWithDB from './src/usingDB/controllers/Party';
import OfficeWithDB from './src/usingDB/controllers/Office';
import OfficeWithJsObject from './src/usingJSObject/controllers/Office';
import CandidateWithDB from './src/usingDB/controllers/Candidate'
import CandidateWithJsObject from './src/usingJSObject/controllers/Candidate';
import VoteWithDb from './src/usingDB/controllers/Vote';
import UserWithDb from './src/usingDB/controllers/User';
import Auth from './src/usingDB/middleware/Auth';
import { isAdmin } from './src/usingDB/middleware/index';


dotenv.config();
const Party = process.env.TYPE==='db' ? PartyWithDB : PartyWithJsObject;
const Office = process.env.TYPE==='db' ? OfficeWithDB : OfficeWithJsObject;
const Candidate = process.env.TYPE==='db' ? CandidateWithDB : CandidateWithJsObject;
const Vote = process.env.TYPE==='db' ? VoteWithDb: VoteWithDb;

// const isAdmin = [
//   Auth.verifyToken,
//   Auth.isAdmin
// ]

const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({extended: "false"}))
app.use(logger('dev'));
routes(app);
// app.use('/api/v1/', router);

app.post('/api/parties', Auth.verifyToken, isAdmin, Party.create);
app.get('/api/parties', Auth.verifyToken, Party.getAll);
app.get('/api/parties/:id', Auth.verifyToken, Party.getOne);
app.patch('/api/parties/:id/name', Auth.verifyToken, isAdmin, Party.update);
app.delete('/api/parties/:id', Auth.verifyToken, isAdmin, Party.delete);

app.post('/auth/signup', UserWithDb.create);
app.post('/auth/login', UserWithDb.login);
app.delete('/api/users/me', Auth.verifyToken, UserWithDb.delete);

app.post('/api/offices', Auth.verifyToken, isAdmin, Office.create);
app.get('/api/offices', Auth.verifyToken, Office.getAll);
app.get('/api/offices/:id', Auth.verifyToken, Office.getOneOffice);
app.put('/api/offices/:id', Auth.verifyToken, isAdmin, Office.update);
app.delete('/api/offices/:id', Auth.verifyToken, isAdmin, Office.delete);

app.post('/api/office/:id/register', Auth.verifyToken, Candidate.createCandidate);
app.get('/api/candidates', Auth.verifyToken, Candidate.getAllCandidates);
app.get('/api/v1/candidates/:id', Auth.verifyToken, Candidate.getOneCandidate);
app.get('/api/v1/candidates/:office', Auth.verifyToken, Candidate.getCandidatesByOffice);
app.get('/api/v1/candidates/:party', Auth.verifyToken, Candidate.getCandidatesByParty);
app.put('/api/v1/candidates/:id', Auth.verifyToken, Candidate.updateOndeCandidate);
app.delete('/api/v1/candidates/:id', Auth.verifyToken, Candidate.deleteCandidate);


app.post('/api/votes', Auth.verifyToken, VoteWithDb.createVote);

app.all('*', (req, res) => {
  res.status(404).send({
    status: 404,
    message: 'Not Found',
  });
});

// app.post('/api/votes', Auth.verifyToken, VoteWithDb.createVote);

// server
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server Started On Port ${port}`);
  });
export default app;
