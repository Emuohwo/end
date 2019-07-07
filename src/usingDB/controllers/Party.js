import moment, { min } from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';

const Party = {
    /**
     * Create a Party
     * @params {object} req
     * @params {object} res
     * @returns {object} party object
     */
    async create(req, res) {
        const text = `INSERT INTO
        parties(id, name, hqAddress, logoUrl, owner_id, createdDate, modifiedDate)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        returning *`;
        const values = [
            uuidv4(),
            req.body.name,
            req.body.hqAdrress,
            req.body.logoUrl,
            req.user.id,
            moment(new Date()),
            moment(new Date()).format("YYYY-MM-DD HH:MM:SS")
        ];

        try {
            const { rows } = await db.query(text, values);
            return res.status(201).send(rows[0]);
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    /**
     * Get All Party
     * @param {object} req
     * @param {object} res
     * @returns {object} parties array
     */
    async getAll(req, req) {
        const findAllQuery = 'SELECT * FROM parties WHERE owner_id = $1';
        try {
            const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
            return res.status(200).send((rows, rowCount));
        } catch (error) {
            return res.status(400).send(error);
        }
    },
    /**
     * Get A Party
     * @param {object} req
     * @param {object} res
     * @returns {object} party object
     */
    async getOne(req, res) {
        const text = 'SELECT * FROM parties WHERE id = $1 AND owner_id = $2';
        try {
            const  { rows } = await db.query(text, [req.params.id, req.user.id]);
            if (!rows[0]) {
                return res.status(404).send({'message': 'party not found'});
            }
            return res.status(200).send(rows[0]);
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    /**
     * Update A Party
     * @param {object} req
     * @param {object} res
     * @returns {object} updated party
     */
    async update(req, res) {
        const findOneQuery = 'SELECT FROM * parties WHERE id=$1 AND owner_id = $2';
        const updateOneQuery = `UPDATE parties
        SET name=$1,hqAddress=$2,logoUrl=$3,modifiedDate=$4
        WHERE id=$5 AND owner_id = $6 returning *`;
        try {
            const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
            if(!rows[0]) {
                return res.status(404).send({'message': 'party not found'});
            }
            const values = [
                req.body.name || rows[0].name,
                req.body.hqAdrress || rows[0].hqAdrress,
                req.body.logoUrl || rows[0].logoUrl,
                moment(new Date()),
                req.params.id,
                req.user.id
            ];
            const response = await db.query(updateOneQuery, values);
            return res.status(200).send(response.rows[0]);
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    /**
     * Delete A party
     * @param {object} req
     * @param {object} res
     * @returns {void} return status code 204
     */
    async delete(req, res) {
        const deleteQuery = 'DELETE FROM parties WHERE id=$1 AND owner_id = $2 returning *';
        try {
            const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
            if (!rows[0]) {
                return res.status(404).send({'message': 'party not found'});
            }
            return res.status(204).send({'message': 'deleted'});
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}
export default Party;
