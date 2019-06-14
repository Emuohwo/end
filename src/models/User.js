import moment from 'moment';
import uuid from 'uuid';

class User {
    /**
     * class constructor
     * @param {object} data
     */
    constructor() {
        this.users = [];
    }
    /**
     * 
     * @returns {object} User Object
     */
    create(data) {
        const newUser = {
            id: uuid.v4(),
            firstname: data.firstname || '',
            lastname: data.lastname || '',
            othername: data.othername || '',
            email: data.email || '',
            password: data.password || '',
            phoneNumber: data.phoneNumber || '',
            passportUrl: data.passportUrl || '',
            isAdmin: data.isAdmin || ''
        };
        this.users.push(newUser)
        return newUser
    }
    /**
     * 
     * @param {uuid} id
     * @returns {object} user object
     */
    findOne(id) {
        return this.users.find(u => u.id === id);
    }
    /**
     * @returns {object} returns all users
     */
    findAll() {
        return this.users;
    }
    /**
     * 
     * @param {uuid} id
     * @param {object} data
     */
    update() {
        const user = this.findOne(id);
        const index = this.users.indexOf(user);
        this.users[index].firstname = data['firstname'] || user.firstname;
        this.users[index].lastname = data['lastname'] || user.lastname;
        this.users[index].othername = data['othername'] || user.othername;
        this.users[index].email = data['email'] || user.email;
        this.users[index].password = data['password'] || user.password;
        this.users[index].phoneNumber = data['phoneNumber'] || user.phoneNumber;
        this.users[index].passportUrl = data['passportUrl'] || user.passportUrl;
        this.users[index].isAdmin = data['isAdmin'] || user.isAdmin;
        return this.users[index];
    }
    /**
     * @param {uuid} id
     */
    delete(id) {
        const user = this.findOne(id);
        const index = this.users.indexOf(user);
        this.users.splice(index, 1);
        return {};
    }
}
export default new User();