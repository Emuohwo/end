import User from '../src/usingDB/controllers/User';
import Admin from '../src/usingDB/middleware/index';
import Auth from '../src/usingDB/middleware/Auth';

const isAdmin = [
  Admin.isAdmin,
  Auth.verifyToken
];

const user = [
  Auth.verifyToken
];


const userRoutes = (router) => {
  router.post('/auth/signup', User.create);
  router.post('/auth/login', User.login);
  router.delete('/users/me', user, User.delete);
  
};

export default userRoutes;
