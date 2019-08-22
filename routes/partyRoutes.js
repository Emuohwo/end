import Party from '../src/usingDB/controllers/Party';
import Admin from '../src/usingDB/middleware/index';
import Auth from '../src/usingDB/middleware/Auth';

const isAdmin = [
  Admin.isAdmin,
  Auth.verifyToken
];

const user = [
  Auth.verifyToken
];

const partyRoutes = (router) => {
  router.post('/parties', user, isAdmin, Party.create);
  router.get('/parties', user, Party.getAll);
  router.get('/parties/:id', user, Party.getOne);
  router.patch('/parties/:id/name', user, isAdmin, Party.update);
  router.delete('/parties/:id', user, isAdmin, Party.delete);
};

export default partyRoutes;
