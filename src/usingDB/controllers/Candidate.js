import uuidv4 from 'uuid/v4';
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
        candidates(id, office, party, candidate) 
        VALUES($1, $2, $3, $4) 
        returning *`;
        const values = [
            uuidv4(),
            req.body.office,
            req.body.party,
            req.body.candidate
        ];

        try {
            const { rows } = await db.query(text, values);
            return res.status(201).send(rows[0]);
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    /**
     * Get all Candidates
     * @param {object} req
     * @param {object} res
     * @returns {object} candidates array
     */
    async getAllCandidates(req, res) {
        const findAllQuery = 'SELECT * FROM candidates WHERE office = $1';
        try {
            const { rows, rowCount } = await db.query(findAllQuery, [req.office.id]);
            return res.status(200).send((rows, rowCount));
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
                return res.status(404).send({'message': 'candidate nt found'})
            }
            return res.status(204).send({'message': 'Candidate deleted'})
        } catch(error) {
            return res.status(400).send(error);
        }
    }

}

export default Candidate;
