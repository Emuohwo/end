import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';

const Office = {
    /**
     * Create an Office
     * @params {object} req
     * @params {object} res
     * @returns {object} office object
     */
    async create(req, res) {
        const text = `INSERT INTO
        offices(type, name) 
        VALUES($1, $2) 
        returning *`;

        const values = [
            req.body.type,
            req.body.name
        ];

        try {
            const { rows } = await db.query(text, values);
            return res.status(201).send({
                status: 201,
                message: 'Office created Successfully',
                data: rows[0],
            });
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    /**
     * Get an Office
     * @param {object} req
     * @param {object} res
     * @returns {object} office object
     */
    async getAll(req, res) {
        const findAllQuery = 'SELECT * FROM offices';
        try {
            const { rows, rowCount } = await db.query(findAllQuery);
            return res.status(200).send({
                status: 200,
                message:'Offices retrieved successfully',
                rows,
                rowCount
            });
        } catch(error) {
            return res.status(400).send(error)
        }
    },
    /**
     * Get an Office
     * @param {object} req
     * @param {object} res
     * @returns {object} office object
     */
    async getOneOffice(req, res) {
        const text = 'SELECT * FROM offices WHERE id = $1';
        try {
            const { rows } = await db.query(text, [req.params.id]);
            if (!rows[0]) {
            return res.status(404).send({'message': 'Office not found'});
            }
            return res.status(200).send({
                status: 200,
                data: rows[0],
            });
        } catch(error) {
            return res.status(400).send(error)
        }
    },
    /**
     * Update an office
     * @param {object} req
     * @param {object} res
     * @returns {object} updated office
     */
    async update(req, res) {
        const findOneOffice = 'SELECT FROM * offices WHERE id = $1';
        const updateOneOffice = `UPDATE offices 
        SET type=$1, name=$2 
        WHERE id=$3 returning *`;
        try {
            const { rows } = await db.query(findOneOffice, [req.params.id, req.user.id]);
            if (!rows[0]) {
                return res.status(404).send({'message': 'office not found'})
            }
            const values = [
                req.body.type || rows[0].type,
                req.body.name || rows[0].name,
                req.params.id
            ];
            const response = await db.query(updateOneOffice, values);
            return res.status(200).send(response.rows[0]);
        } catch(error) {
            return res.status(400).send(error)
        }
    },
    /**
     * Delete an Office
     * @param {object} req
     * @param{object} res
     * @returns {void} return status code 204
     */
    async delete(req, res) {
        const deleteOffice = 'DELETE FROM offices WHERE id=$1 returning *';
        try {
            const { rows } = await db.query(deleteOffice, [req.params.id]);
            if (!rows[0]) {
                return res.status(404).send({'message': 'office not found'})
            }
            return res.status(204).send({message: 'Office deleted'});
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

export default Office;
