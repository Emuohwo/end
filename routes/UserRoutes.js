// import User from '../src/controllers/User';
import User from '../src/usingJSObject/controllers/User';

const userRoutes = (router) => {
  router.post('/api/v1/users', User.create);
  router.get('/api/v1/users', User.getAll);
  router.get('/api/v1/users/:id', User.getOne);
  router.put('/api/v1/users/:id', User.update);
  router.delete('/api/v1/users/:id', User.delete);
  
// router.post('/api/users', UserWithDb.create);
// router.post('/api/users/login', UserWithDb.login);
// router.delete('/api/users/me', Auth.verifyToken, UserWithDb.delete);
};

export default userRoutes;
