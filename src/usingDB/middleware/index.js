import jwt from 'jsonwebtoken';

module.exports = {
    // isAdmin(req, res, next) {
    //     if (req.headers.isadmin === false) {
    //         return next();
    //     } else {
    //         res.status(403).send({
    //             'message': 'Operation is reserved for only Admin' + 
    //             JSON.stringify(req.headers)
    //         })
    //     }
    // }

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