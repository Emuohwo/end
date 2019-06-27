import Office from '../src/controllers/Office';

const officeRoutes = (router) => {
  router.post('/api/v1/offices', Office.create);
  router.get('/api/v1/offices', Office.getAll);
  router.get('/api/v1/offices/:id', Office.getOne);
  router.put('/api/v1/offices/:id', Office.update);
  router.delete('/api/v1/offices/:id', Office.delete);
};

export default officeRoutes;
