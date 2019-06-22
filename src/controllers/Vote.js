import VoteModel from '../models/Vote';

const Vote = {
  /**
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} vote object
     */
  create(req, res) {
    if (!req.body.createdBy && !req.body.office && !req.body.candidate) {
      return res.status(400).send({ message: 'All fields are  required' });
    }
    const vote = VoteModel.create(req.body);
    return res.status(201).send(vote);
  },
  /** V
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} votes array
     */
  getAll(req, res) {
    const votes = VoteModel.findAll();
    return res.status(200).send(votes);
  },
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} vote object
     */
  getOne(req, res) {
    const vote = VoteModel.findOne(req.params.id);
    if (!vote) {
      return res.status(404).send({ message: 'vote not found' });
    }
    return res.status(200).send(vote);
  },
  /**
     * @param {object} req
     * @param {object} res
     * @returns {object} updated vote
     */
  update(req, res) {
    const vote = VoteModel.findOne(req.params.id);
    if (!vote) {
      return res.status(404).send({ message: 'vote not found' });
    }
    const updatedVote = VoteModel.update(req.params.id, req.body);
    return res.status(200).send(updatedVote);
  },
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {void} return status code 204
     */
  delete(req, res) {
    const vote = VoteModel.findOne(req.params.id);
    if (!vote) {
      return res.status(404).send({ message: 'vote not found' });
    }
    const vo = VoteModel.delete(req.params.id);
    return res.status(204).send(vo);
  },
};

export default Vote;
