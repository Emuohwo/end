// import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';

// Configure chai
chai.use(chaiHttp);
const should = chai.should();

describe('VOTES', () => {

  it('should post one vote', (done) => {
    let body = {
      "createdBy": "Golden",
      "office": "Silvered",
      "candidate": "Bronze"
    };
    chai.request(app)
      .post('/api/v1/votes')
      .send(body)
      .end((err, res) => {
        if (err) {throw err;}
        res.should.have.status(201);
        res.body.id.should.not.equal(null);
        res.body.createdBy.should.equal('Golden');
        res.body.office.should.equal('Silvered');
        res.body.candidate.should.equal('Bronze');
        res.body.createdOn.should.not.equal(null);
        done();
      });
  });
  
  it('should get all vote', (done) => {
    chai.request(app)
      .get('/api/v1/votes')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        done();
      });
  });
  // it('should get one vote', (done) => {
  //   chai.request(app)
  //     .get('/api/v1/votes/:id')
  //     .end((err, res) => {
  //       res.should.have.status(404);
  //       done();
  //     });
  // });
  // it('should update one vote', (done) => {
  //   let body = {
  //     "id": "be4ac703-9be0-4112-97a6-899921e3ecec",
  //     "createdOn": 1561522417656,
  //     "createdBy": "Golden",
  //     "office": "Silvered",
  //     "candidate": "Bronze"
  // }
  //   chai.request(app)
  //     .put('/api/v1/votes/:id')
  //     .send(body)
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.body.id.should.equal('be4ac703-9be0-4112-97a6-899921e3ecec');
  //       done();
  //     });
  // });
  // it('should delete one vote', (done) => {
  //   let delVote = {
  //     "id": "be4ac703-9be0-4112-97a6-899921e3ecec",
  //     "createdOn": 1561522417656,
  //     "createdBy": "Golden",
  //     "office": "Silvered",
  //     "candidate": "Bronze"
  // }
  //   chai.request(app)
  //     .delete('/api/v1/votes/:id')
  //     .send(delVote)
  //     .end((err, res) => {
  //       res.should.have.status(204);
  //       done();
  //     });
  // });
  
});
