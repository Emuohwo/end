import moment, { min } from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';

const Vote = {
    /**
     * Cast a Vote
     * @param {object} req
     * @param {object} res
     * @returns {object} vote object
     */
    async createVote(req, res) {
        const { id: createdBy } = req.user;
        const text = `INSERT INTO 
        votes(id, createdOn, createdBy, office, candidate) 
        VALUES($1, $2, $3, $4, $5) returning *`;
        const values = [
            uuidv4(),
            moment(new Date()).format("YYY-MM-DD HH:MM:SS"),
            createdBy,
            req.body.office,
            req.body.candidate
        ];

        try {
            const { rows } = await db.query(text, values);
            return res.status(201).send({
                status:201,
                message: 'Thank you for voting',
                data: rows[0],
            });
        } catch(errpr) {
            return res.status(400).send(errpr)
        }
    },
    /**
     * Get All Votes
     * @param {object} req
     * @param {object} res
     * @returns {object} Votes array
     */
    async getAllVotes(req, res) {
        const findAllQuery = 'SELECT * FROM votes office = $1';
        try {
            const { rows, rowCount } = await db.query(findAllQuery, [req.office.id]);
            return res.status(200).send(rows, rowCount);
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    /**
     * Get A Vote
     * @param {object} req
     * @param {object} res
     * @returns {object} vote object
     */
    async getOneVote(req, res) {
        const text = 'SELECT * FROM votes WHERE office = $1';
        try {
            const  { rows } = await db.query(text, [req.params.id, req.office.id]);
            if (!rows[0]) {
                return res.status(404).send({'message': 'votes not found'});
            }
            return res.status(200).send(rows[0]);
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    /**
     * Update A vote
     * @param {object} req
     * @param {object} res
     * @returns {object} update vote
     */
    async updateVote(req, res) {
        const findOneQuery = 'SELECT * FROM votes office = $1';
        const updateOneQuery = `UPDADE votes 
        SET createdOn=$1,createdBy=$2,candidate=$3 
        WHERE office=$4 returning *`;
        try {
            const { rows } = await db.query(findOneQuery, [req.params.id, req.office.id]);
            if (!rows[0]) {
                return res.status(400).send({ 'message': 'Vote not found'})
            }
            const values = [
                moment(new Date()).format("YYY-MM-DD HH:MM:SS"),
                req.user.id,
                req.office.id,
                req.candidate.id
            ];
            const response = await db.query(updateOneQuery, values);
            return res.status(200).send(response.rows[0]);
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    /**
     * Delete A Vote
     * @param {object} req
     * @param {object} res
     * @returns {void} return status code 204
     */
    async deleteVote(req, res) {
        const deleteQuery = 'DELETE FROM Votes WHERE office=$1 AND candidate = $2 returning *';
        try {
            const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
            if (!rows[0]) {
                return res.status(404).send({'message': 'vote not found'});
            }
            return res.status(204).send({'message': 'deleted'});
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

export default Vote;