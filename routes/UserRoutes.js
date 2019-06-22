import User from '../src/controllers/User';

const userRoutes = (router) => {
  router.post('/api/v1/users', User.create);
  router.get('/api/v1/users', User.getAll);
  router.get('/api/v1/users/:id', User.getOne);
  router.put('/api/v1/users/:id', User.update);
  router.delete('/api/v1/users/:id', User.delete);
};

export default userRoutes;
