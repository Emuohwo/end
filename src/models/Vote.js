import moment from 'moment';
import uuid from 'uuid';

class Vote {
    /**
     * class constructor
     * @param {Object} data
     */
    constructor() {
        this.votes = [];
    }
    /**
     * 
     * @returns {Object} vote object
     */
    create(data) {
        const newVote = {
            id: uuid.v4(),
            createdOn: moment.now(),
            createdBy: data.createdBy || '',
            office: data.office || '',
            candidate: data.candidate || ''
        };
        this.votes.push(newVote);
        return newVote
    }
    /**
     * 
     * @param {uuid} id
     * @returns {object} vote object
     */
    findOne(id) {
        return this.votes.find(v => v.id === id);
    }
    /**
     * @returns {object} returns all votes
     */
    findAll() {
        return this.votes;
    }
    /**
     * 
     * @param {uuid} id
     * @param {object} data
     */
    update(id, data) {
        const vote = this.findOne(id);
        const index = this.votes.indexOf(vote);
        this.votes[index].createdBy = data['createdBy'] || vote.createdBy;
        this.votes[index].office = data['office'] || vote.office;
        this.votes[index].candidate = data['candidate'] || vote.candidate;
        return this.votes[index];
    }
    /**
     * 
     * @param {uuid} id
     */
    delete(id) {
        const vote = this.findOne(id);
        const index = this.votes.indexOf(vote);
        this.votes.splice(index, 1);
        return {};
    }
}

export default new Vote();