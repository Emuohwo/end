// import uuidv4 from 'uuid/v4';
import db from '../db';

const Candidate = {
    /**
     * Create a Candidate
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} candidate object
     */
    async createCandidate(req, res) {
        const text = `INSERT INTO 
        candidates(office, party, candidate) 
        VALUES($1, $2, $3) 
        returning *`;
        const values = [
            req.body.office,
            req.body.party,
            req.body.candidate
        ];

        try {
            const { rows } = await db.query(text, values);
            return res.status(201).send({
                status: 201,
                message: 'candidate registered',
                data: rows[0],
            });
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    /**
     * Get Candidates by Office
     * @param {object} req 
     * @param {object} res 
     */
    async getCandidatesByOffice(req, res) {
        const text = `SELECT candidates.id, candidates.office, users.firstname, users.lastname, office.name AS officename, party.name AS partyname
        FROM users JOIN candidates 
        ON users.id = candidates.id
        JOIN office ON candidates.office = office.id 
        JOIN party ON candidates.party = party.id 
        WHERE office = $1`;
        const values = [req.params.office];
        try {
            const { rows } = await db.query(text, values);
            if (!rows) {
                return res.status(404).send({
                    status:404,
                    error: {
                        message: 'Candidate not found',
                    },
                });
            }
            return res.status(200).send({
                status: 200,
                message: 'successful',
                data: rows,
            })
        } catch(error){
            return res.status(400).send({
                status: 404,
                error: {
                    message: 'Invalid operation',
                },
            });
        }
    },
    /**
     * Get Candidates by Party
     * @param {object} req 
     * @param {object} res 
     */
    async getCandidatesByParty(req, res) {
        const text = `SELECT candidates.id, candidates.office, users.firstname, users.lastname, office.name AS officename, party.name AS partyname
        FROM users JOIN candidates 
        ON users.id = candidates.user_id
        JOIN office ON candidates.office = office.id 
        JOIN party ON candidates.party = party.id 
        WHERE party = $1`;
        const values = [req.params.party];
        try {
            const { rows } = await db.query(text, values);
            if (!rows) {
                return res.status(404).send({
                    status:404,
                    error: {
                        message: 'Party not found',
                    },
                });
            }
            return res.status(200).send({
                status: 200,
                message: 'successful',
                data: rows,
            })
        } catch(error){
            return res.status(400).send({
                status: 404,
                error: {
                    message: 'Invalid operation',
                },
            });
        }
    },
    /**
     * Get all Candidates
     * @param {object} req
     * @param {object} res
     * @returns {object} candidates array
     */
    async getAllCandidates(req, res) {
        const findAllQuery = 'SELECT * FROM candidates';
        try {
            const { rows, rowCount } = await db.query(findAllQuery);
            return res.status(200).send({
                status: 200,
                message: 'All Candidates retrieved',
                data: rows,
                rowCount,
              });
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    /**
     * Get a candidate
     * @param {object} req
     * @param {object} res
     * @returns {object} candidate object
     */
    async getOneCandidate(req, res) {
        const text ='SELECT * FROM candidates WHERE id = $1 AND candidate = $2';
        try {
            const { rows } = await db.query(text, [req.params.id, req.candidate.id]);
            if (!rows[0]) {
                return res.status(404).send({'message': 'candidate not found'});
            }
            return res.status(200).send(rows[0]);
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    /**
     * Update a Candidate
     * @param {object} req
     * @param {object} res
     * @returns {object} updated candidate
     */
    async updateOndeCandidate(req, res) {
        const findAllQuery = 'SELECT FROM * candidates WHERE id=$1 AND candidate = $2';
        const updateOneQuery = `UPDATE candidates 
        SET office=$1, party=$2 
        WHERE id=$3 AND candidate=$4 returning *`;
        try {
            const { rows } = await db.query(findAllQuery, [req.params.id, req.candidate.id])
            if (!rows[0]) {
                return res.status(404).send({'message': 'candidate not found'})
            }
            const values = [
                req.office.id || rows[0].office,
                req.party.id || rows[0].party,
                req.params.id,
                req.user.id
            ];
            const response = await db.query(updateOneQuery, values)
            return res.status(200).send(response.rows[0]);
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    /**
     * Delete a Candidate
     * @param {object} req
     * @param {object} res
     * @returns {void} return status code 204
     */
    async deleteCandidate(req, res) {
        const deleteQuery = 'DELETE FROM candidates WHERE id=$1 AND candidate=$2 return *';
        try {
            const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
            if (!rows[0]) {
                return res.status(404).send({'message': 'candidate not found'})
            }
            return res.status(204).send({'message': 'Candidate deleted'})
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    /**
     * Update status 
     */
    async updateStatus(req, res) {
        const updateOneQuery = `UPDATE candidates
        SET status=$1
        WHERE id=$2 returning *`;
        try {
          const { rows } = await db.query(updateOneQuery, [req.body.status.trim(), req.params.id]);
          if (!rows[0]) {
            return res.status(404).send({
              status: 404,
              message: 'candidate not found',
            });
          }
          return res.status(200).send({
            status: 200,
            message: 'Candidate status updated',
            data: rows[0],
          });
        } catch (err) {
          return res.status(400).send({
            status: 400,
            error: {
              message: err.message,
            },
          });
        }
    }
}



    

export default Candidate;
