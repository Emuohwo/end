// import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Votes", () => {
    describe("GET /", () => {
        // Test to get all votes
        // it("should get all candidates voted", (done) => {
        //     chai.request(app)
        //     .get('/')
        //     .end((err, res) => {
        //         res.should.have.status(200);
        //         res.body.should.be.a('object');
        //         done();
        //     });
        // });

        // Test to get single vote
        it("should get single vote", (done) => {
            chai.request(app)
            .get('/api/v1/votes')
            .end( (err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            })
        })
    })
})