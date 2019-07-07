// src/usungDB/controllers/Helper.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helper = {
    /**
     * Hash Password Method
     * @param {String} Password
     * @returns {String} returns hashed password
     */
    hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
    },
    /**
     * comparePassword
     * @param {String} hashPassword
     * @param {String} password
     * @returns {Boolean} return True or False
     */
    comparePassword(hashPassword, password) {
        return bcrypt.compareSync(password, hashPassword);
    },
    /**
     * isValidEmail helper method
     * @param {String} isValidEmail
     * @returns {Boolean} True or False
     */
    isValidEmail(email) {
        return /\S+@\.\S+/.test(email);
    },
    /**
     * Generate Token
     * @param {string} id
     * @returns {string} token
     */
    generateToken(id) {
        const token = jwt.sign({
            userId: id
        },
        process.env.SECRET, { expiresIn: '7d'}
        );
        return token;
    }
}
export default Helper;
