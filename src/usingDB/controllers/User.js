import uuidv4 from 'uuid/v4';
import db from '../db';
import Helper from './Helper';

const User = {
  /**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object}  
   */
  async create(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
      users(firstname, lastname, othernames, email, password, phonenumber, passportUrl)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const values = [
      req.body.firstname,
      req.body.lastname,
      req.body.othernames,
      req.body.email,
      hashPassword,
      req.body.phonenumber,
      req.body.passporturl
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id, rows[0].isadmin);
      const {id, firstname, lastname, othernames, email, phonenumber, passporturl} = rows[0];
      const user = {
        id,
        firstname,
        lastname,
        othernames,
        email,
        phonenumber,
        passporturl,
        isadmin,
      }
      return res.status(201).send({ 
        status: 201,
        data: [{
          token,
          user,
          message: 'Signup successful'
        }],
      });
    } catch(error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ 'message': 'User with that EMAIL already exist' })
      }
      return res.status(400).send(error);
    }
  },
  /**
   * Login
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */
  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({'message': 'Incorrect Email'});
      }
      if(!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ 'message': 'Incorrect password' });
      }
      const token = Helper.generateToken(rows[0].id, rows[0].isadmin);
      const {id, firstname, lastname, othernames, email, phonenumber, passporturl, isadmin} = rows[0];
      const user = {
        id,
        firstname,
        lastname,
        othernames,
        email,
        phonenumber,
        passporturl,
        isadmin
      };
      return res.status(200).send({ 
        status: 200,
        data: [{
          message: `Hi ${firstname}, Welcome to Politica`,
          token,
          user,
        }],
      });
    } catch(error) {
      return res.status(400).send(error)
    }
  },
  /**
   * Delete A User
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 204 
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'user not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default User;