import Candidate from '../src/usingDB/controllers/Candidate';
import Admin from '../src/usingDB/middleware/index';
import Auth from '../src/usingDB/middleware/Auth';

const isAdmin = [
  Admin.isAdmin,
  Auth.verifyToken
];

const user = [
  Auth.verifyToken
];

const candidateRoutes = (router) => {
  router.post('/office/:id/register', user, Candidate.createCandidate);
  router.get('/candidates', user, Candidate.getAllCandidates);
  router.get('/candidates/:id', user, Candidate.getOneCandidate);
  router.get('/candidates/:office', user, Candidate.getCandidatesByOffice);
  router.get('/candidates/:party', user, Candidate.getCandidatesByParty);
  router.put('/candidates/:id', user, Candidate.updateOndeCandidate);
  router.patch('/candidates/:id/status', isAdmin, Candidate.updateOndeCandidate);
  router.delete('/candidates/:id', user, Candidate.deleteCandidate);
};

export default candidateRoutes;
