import CandidateModel from '../models/Candidate';

const Candidate = {
  /**
     *
     * @param {Object} req
     * @param {object} res
     * @returns {object} candidate object
     */
  create(req, res) {
    if (!req.body.office && !req.body.party && !req.body.candidate) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const candidate = CandidateModel.create(req.body);
    return res.status(201).send(candidate);
  },
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} candidates array
     */
  getAll(req, res) {
    const candidates = CandidateModel.findAll();
    return res.status(200).send(candidates);
  },
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} candidate object
     */
  getOne(req, res) {
    const candidate = CandidateModel.findOne(req.params.id);
    if (!candidate) {
      return res.status(404).send({ message: 'candidate not found' });
    }
    return res.status(200).send(candidate);
  },
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} updated candidate
     */
  update(req, res) {
    const candidate = CandidateModel.findOne(req.params.id);
    if (!candidate) {
      return res.status(404).send({ message: 'candidate not found' });
    }
    const updatedCandidate = CandidateModel.update(req.params.id, req.body);
    return res.status(200).send(updatedCandidate);
  },
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {void} return status code 204
     */
  delete(req, res) {
    const candidate = CandidateModel.findOne(req.params.id);
    if (!candidate) {
      return res.status(404).send({ message: 'candidate not found' });
    }
    const cand = CandidateModel.delete(req.params.id);
    return res.status(204).send(cand);
  },
};

export default Candidate;
