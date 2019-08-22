import moment, { min } from 'moment';
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
        parties(name, hqaddress, logourl, createddate, modifieddate)
        VALUES($1, $2, $3, $4, $5)
        returning *`;
        const values = [
            req.body.name,
            req.body.hqaddress,
            req.body.logourl,
            new Date(),
            new Date()
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
    async getAll(req, res) {
        const findAllQuery = 'SELECT * FROM parties';
        try {
            const { rows, rowCount } = await db.query(findAllQuery);
            return res.status(200).send({
                status: 200,
                message: 'All parties retrieved',
                data: rows,
                rowCount,
              });
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
        const text = 'SELECT * FROM parties WHERE id = $1';
        try {
            const  { rows } = await db.query(text, [req.params.id]);
            if (!rows[0]) {
                return res.status(404).send({'message': 'party not found'});
            }
            return res.status(200).send({
                status: 200,
                data: rows[0],
            });
        } catch (error) {
            return res.status(400).send(error.message)
        }
    },
    /**
     * Update A Party
     * @param {object} req
     * @param {object} res
     * @returns {object} updated party
     */
    async update(req, res) {
        const findOneQuery = 'SELECT * FROM parties WHERE id=$1';
        const updateOneQuery = `UPDATE parties
        SET name=$1,hqaddress=$2,logourl=$3,modifiedDate=$4
        WHERE id=$5  returning *`;
        try {
            const { rows } = await db.query(findOneQuery, [req.params.id]);
            if(!rows[0]) {
                return res.status(404).send({'message': 'party not found'});
            }
            const values = [
                req.body.name || rows[0].name,
                req.body.hqaddress || rows[0].hqaddress,
                req.body.logourl || rows[0].logourl,
                moment(new Date()),
                req.params.id,
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
        const deleteQuery = 'DELETE FROM parties WHERE id=$1 returning *';
        try {
            const { rows } = await db.query(deleteQuery, [req.params.id]);
            if (!rows[0]) {
                return res.status(404).send({'message': 'party not found'});
            }
            return res.status(204).send({
                status: 204,
                message: 'deleted',
            });
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}
export default Party;
