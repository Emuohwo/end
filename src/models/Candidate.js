import moment from 'moment';
import uuid from 'uuid';

class Candidate {
    /**
     * class constructor
     * @param {object} data
     */
    constructor() {
        this.candidates = [];
    }
    /**
     * 
     * @returns {object} candidate object
     */
    create(data) {
        const newCandidate = {
            id: uuid.v4(),
            office: data.office || '',
            party: data.party || '',
            candidate: data.candidate ||''
        };
        this.candidates.push(newCandidate);
        return newCandidate
    }
    /**
     * 
     * @param {uuid} id
     * @returns {object} candidate object
     */
    findOne(id) {
        return this.candidates.find(candid => candid.id === id);
    }
    /**
     * @returns {object} returns all candidates
     */
    findAll() {
        return this.candidates;
    }
    /**
     * 
     * @param {uuid} id
     * @param {object} data
     */
    update(id, data) {
        const candidate = this.findOne(id);
        const index = this.candidates.indexOf(candidate);
        this.candidates[index].office = data['office'] || candidate.office;
        this.candidates[index].party = data['party'] || candidate.party;
        this.candidates[index].candidate = data['candidate'] || candidate.candidate;
        return this.candidates[index];
    }
    /**
     * 
     * @param {uuid} id
     */
    delete(id) {
        const candidate = this.findOne(id);
        const index = this.candidates.indexOf(candidate);
        this.candidates.splice(index, 1);
        return {};
    }
}
export default new Candidate();