import jwt from 'jsonwebtoken';

const Admin = {

  async isAdmin(req, res, next) {
        const token = req.headers['x-access-token'];
        if (!token) {
          return res.status(401).send({ message: 'Token is not provided' });
        }
        const decoded = await jwt.verify(token, process.env.SECRET);
        if (decoded.isAdmin === false) {
          return res.status(403).json({
            status: 403,
            error: 'only admin users have access to this route',
          });
        }
        return next();
    }
}

export default Admin;
