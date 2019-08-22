import candidateRoutes from './candidateRoutes';
import partyRoutes from './partyRoutes';
import officeRoutes from './officeRoutes';
import userRoutes from './UserRoutes';
import voteRoutes from './voteRoutes';


const routes = (router) => {
  router.get('/', (req, res) => res.status(200).json({
    message: 'Welcome to Politico',
  }));

  candidateRoutes(router);
  partyRoutes(router);
  userRoutes(router);
  officeRoutes(router);
  voteRoutes(router);
  
  router.all('*', (req, res) => {
    res.status(404).send({
      status: 404,
      message: 'Url Not Found',
    });
  });
};

export default routes;
