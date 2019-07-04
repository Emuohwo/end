// import Party from '../src/controllers/Party';
import Party from '../src/usingJSObject/controllers/Party';
// import PartyWithDb from '../src/usingDB/controllers/Party';


const partyRoutes = (router) => {
  router.post('/api/v1/parties', Party.create);
  router.get('/api/v1/parties', Party.getAll);
  router.get('/api/v1/parties/:id', Party.getOne);
  router.put('/api/v1/parties/:id', Party.update);
  router.delete('/api/v1/parties/:id', Party.delete);
};

export default partyRoutes;
