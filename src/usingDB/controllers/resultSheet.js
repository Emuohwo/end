import db from '../db/index';

const resultQuery = {
    async electionResult(req, res) {
        const text = ` SELECT  parties.logoUrl as party, votes.office, users.firstname, users.lastname,  count(candidates) as results 
        FROM votes, candidates, users, party 
        WHERE votes.candidates  = candidates.id
        AND candidates.user_id = users.id
        AND candidates.party = party.id
        AND votes.office = $1
        GROUP BY vote.office, vote.candidate, users.firstname, users.lastname, party.name`;
        const values = [
            req.params.id,
        ];
        try {
            const { rows } = await db.query(text, values);
            return res.status(200).send({
                status: 200, 
                message: 'Results retrieved',
                data: rows,
            });
        } catch (error) {
            return res.status(400).send({
                status: 400,
                error: {
                    message: error.message,
                },
            });
        }
    },
};

export default  resultQuery;
