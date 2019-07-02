//src usingDB/models/index.js
import { Pool } from 'pg';
import dotenv from 'dotenv';
import { resolve } from 'url';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export default {
    /**
     * DB Query
     * @param {object} req
     * @param {object} res
     * @preturns {object}
     */
    query(text, params) {
        return new Promise((resolve, reject) => {
            pool.query(text, params)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
        })
    }

}
