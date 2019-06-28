// import the dependencies for testing
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Home', () => {

    // Test to get all votes
    it("get home route", (done) => {
        chai.request(app)
        .get('/')
        .end((err, res) => {
            const expected = {message: 'Welcome to Politico'};
            expect(res.body).to.eql(expected);
            res.should.have.status(200);
            done(err);
        });
    });
    
});
