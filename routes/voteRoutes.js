import Vote from '../src/usingDB/controllers/Vote';
import Auth from '../src/usingDB/middleware/Auth';


const user = [
  Auth.verifyToken
];

const voteRoutes = (router) => {
  router.post('/votes', user, Vote.createVote);
};

export default voteRoutes;
