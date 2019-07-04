// import Vote from '../src/controllers/Vote';
import Vote from '../src/usingJSObject/controllers/Vote';

const voteRoutes = (router) => {
  router.post('/api/v1/votes', Vote.create);
  router.get('/api/v1/votes', Vote.getAll);
  router.get('/api/v1/votes/:id', Vote.getOne);
  router.put('/api/v1/votes/:id', Vote.update);
  router.delete('/api/v1/votes/:id', Vote.delete);
};

export default voteRoutes;
