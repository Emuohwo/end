import Candidate from '../src/controllers/Candidate';

const candidateRoutes = (router) => {
  router.post('/api/v1/candidates', Candidate.create);
  router.get('/api/v1/candidates', Candidate.getAll);
  router.get('/api/v1/candidates/:id', Candidate.getOne);
  router.put('/api/v1/candidates/:id', Candidate.update);
  router.delete('/api/v1/candidates/:id', Candidate.delete);
};

export default candidateRoutes;
