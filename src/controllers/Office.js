import OfficeModel from '../models/Office';

const Office = {
    /**
     * 
     * @param {object} req
     * @param {object} res
     * @returns {object} office object
     */
    create(req, res) {
        if (!req.body.type && !req.body.name) {
            return res.status(404).send({'message': 'All fields are required'})
        }
        const office = OfficeModel.create(req.body);
        return res.status(201).send(office);
    },
    /**
     * 
     * @param {object} req
     * @param {object} res
     * @returns {object} offices array
     */
    getAll(req, res) {
        const offices = OfficeModel.findAll();
        return res.status(200).send(offices);
    },
    /**
     * 
     * @param {object} req
     * @param {object} res
     * @returns {object} office object
     */
    getOne(req, res) {
        const office = OfficeModel.findOne(req.params.id);
        if (!office) {
            return res.status(404).send({'message': 'office not found'});
        }
        return res.status(200).send(office);
    },
    /**
     * 
     * @param {object} req
     * @param {object} res
     * @returns {object} updated office
     */
    update(req, res) {
        const office = OfficeModel.findOne(req.params.id);
        if (!office) {
            res.status(404).send({'message': 'office not found'});
        }
        const updatedOffice = OfficeModel.update(req.params.id, req.body)
        return res.status(200).send(updatedOffice);
    },
    /**
     * 
     * @param {object} req
     * @param {object} res
     * @returns {void} return status code 204
     */
    delete(req, res) {
        const office = OfficeModel.findOne(req.params.id);
        if (!office) {
            return res.status(404).send({'message': 'office not found'})
        }
        const off = OfficeModel.delete(req.params.id);
        return res.send(204).send(off);
    }
}

export default Office;