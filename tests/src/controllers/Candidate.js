import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../server';
import Candidate from '../../../src/models/Candidate';

chai.use(chaiHttp)
let should = chai.should();

describe('CANDIDATE', () => {
//     beforeEach((done) => {
//         Candidate.remove({}, (err) => {
//             done();
//         });
//     });

    describe('/GET candidate', () => {
        it('it should GET all the candidates', (done) => {
            chai.request(server)
            .get('/api/v1/candidates')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
    });

    describe('/POST candidates', () => {
        it('it should post a candidate', (done) => {
            let candidate = {
                // office: "Governor",
                party: "SDP",
                candidate: "Adeniyi"
            }
            chai.request(server)
            .post('/api/v1/candidates')
            .send(candidate)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('office');
                res.body.should.have.property('party');
                res.body.should.have.property('candidate');
                res.body.should.have.property('id');
                done();
            });
        });
    })

    describe('/GET/:id candidate', () => {
        it('it should GET a candidate by the given id', (done) => {
            let candidate = {
                office: "Governor",
                party: "AAP",
                candidate: "Ola"
            }
            // candidate.save((err, res) => {
                chai.request(server)
                .get('/api/v1/candidates/', candidate.id)
                .send(candidate)
                .end((err, res) => {
                    res.should.have.status(200);
                    // res.body.should.be.a('object');
                    // res.body.should.have.property('office');
                    // res.body.should.have.property('party');
                    // res.body.should.have.property('candidate');
                    done();
                });
            // })
        });
    });

    describe('/PUT/:id candidate', () => {
        it('it should UPDATE a candidate by the given id', (done) => {
            let candidate = {
                office: "Governor",
                party: "AAP",
                candidate: "Ola"
            }
            // candidate((err, res) => {
            chai.request(server)
            .put('/api/v1/candidates/', candidate.id)  
            .set(candidate)
            .send({
                office: "Governor",
                party: "AP",
                candidate: "Olu"
            })
            .end((err, res) => {
                if(err) {throw err}
                res.should.have.status(200);
                done();
            })
            // })
        })
    })

})