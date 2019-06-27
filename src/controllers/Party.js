import PartyModel from '../models/Party';

const Party = {
    /**
     * 
     * @param {object} req
     * @param {object} res
     * @returns {object} party object
     */
    create(req, res) {
        if (!req.body.name && !req.body.hqAddress && !req.body.logoUrl) {
            return res.status(400).send({'message': 'All fields are required'})
        }
        const party = PartyModel.create(req.body);
        return res.status(201).send(party);
    },
    /**
     * 
     * @param {object} req
     * @param {object} res
     * @returns {object} parties array
     */
    getAll(req, res) {
        const parties = PartyModel.findAll();
        return res.status(200).send(parties);
    },
    /**
     * 
     * @param {object} req
     * @param {object} res
     * @returns {object} party object
     */
    getOne(req, res) {
        const party = PartyModel.findOne(req.params.id);
        if (!party) {
            return res.status(404).send({'message': 'party not found'});
        }
        return res.status(200).send(party);
    },
    /**
     * 
     * @param {object} req
     * @param {object} res
     * @returns {object} updated party 
     */
    update(req, res) {
        const party = PartyModel.findOne(req.params.id);
        if (!party) {
            return res.status(404).send({'message': 'party not found'});
        }
        const updatedParty = PartyModel.update(req.params.id, req.body)
        return res.status(200).send(updatedParty);
    },
    /**
     * 
     * @param {object} req
     * @param {object} res
     * @returns {void} return code 204
     */
    delete(req, res) {
        const party = PartyModel.findOne(req.params.id);
        if (!party) {
            return res.status(404).send({'message': 'party not found'});
        }
        const par = PartyModel.delete(req.params.id);
        return res.status(200).send(par);
    }
}

export default Party;