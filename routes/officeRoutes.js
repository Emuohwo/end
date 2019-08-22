import Office from '../src/usingDB/controllers/Office';
import Admin from '../src/usingDB/middleware/index';
import Auth from '../src/usingDB/middleware/Auth';

const isAdmin = [
  Admin.isAdmin,
  Auth.verifyToken
];

const user = [
  Auth.verifyToken
];

const officeRoutes = (router) => {
  router.post('/offices/', user, isAdmin, Office.create);
  router.get('/offices', user, Office.getAll);
  router.get('/offices/:id', user, Office.getOneOffice);
  router.put('/offices/:id', user, isAdmin, Office.update);
  router.delete('/offices/:id', user, isAdmin, Office.delete);
};

export default officeRoutes;
