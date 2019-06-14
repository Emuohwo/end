import moment from 'moment';
import uuid from 'uuid';

class Party {
    /**
     * class constructor
     * @param {object} data
     */
    constructor() {
        this.parties = [];
    }
    /**
     * 
     * @returns {object} party object
     */
    create(data) {
        const newParty = {
            id: uuid.v4(),
            name: data.name || '',
            hqAddress: data.hqAddress || '',
            logoUrl: data.logoUrl || '',
            createDate: moment.now(),
            modifiedDate: moment.now()
        };
        this.parties.push(newParty);
        return newParty
    }
    /**
     * 
     * @param {uuid} id
     * @returns {object} party object
     */
    findOne(id) {
        return this.parties.find(part => part.id === id);
    }
    /**
     * @returns {object} returns all parties
     */
    findAll() {
        return this.parties;
    }
    /**
     * 
     * @param {uuid} id
     * @param {object} data
     */
    update(id, data) {
        const party = this.findOne(id);
        const index = this.parties.indexOf(party);
        this.parties[index].name = data['name'] || party.name;
        this.parties[index].hqAddress = data['hqAddress'] || party.hqAddress;
        this.parties[index].logoUrl = data['logoUrl'] || party.logoUrl;
        this.parties[index].modifiedDate = moment.now()
        return this.parties[index];
    }
    /**
     * 
     * @param {uuid} id
     */
    delete(id) {
        const party = this.findOne(id);
        const index = this.parties.indexOf(party);
        this.parties.splice(index, 1);
        return {};
    }
}
export default new Party();