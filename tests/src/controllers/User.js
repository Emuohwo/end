import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../server';
import User from '../../../src/models/User';

chai.use(chaiHttp)
let should = chai.should();

describe('User', () => {
//     beforeEach((done) => {
//         User.remove({}, (err) => {
//             done();
//         });
//     });

    describe('/GET User', () => {
        it('it should GET all the Users', (done) => {
            chai.request(server)
            .get('/api/v1/users')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
    });

    describe('/POST Users', () => {
        it('it should post a User', (done) => {
            let User = {
                firstname: "Governor",
                lastname: "Onos",
                othername: "Adeniyi",
                email: "test@test.com",
                password: "jkh3GJ6",
                phoneNumber: "+21397769",
                passportUrl: "passport.jpeg",
                isAdmin: "yes"
            }
            chai.request(server)
            .post('/api/v1/users')
            .send(User)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('firstname');
                res.body.should.have.property('email');
                res.body.should.have.property('passportUrl');
                res.body.should.have.property('passportUrl');
                res.body.should.have.property('isAdmin');
                done();
            });
        });
    })

    describe('/GET/:id User', () => {
        it('it should GET a User by the given id', (done) => {
            let User = {
                firstname: "Governor",
                lastname: "Onos",
                othername: "Adeniyi",
                email: "test@test.com",
                password: "jkh3GJ6",
                phoneNumber: "+21397769",
                passportUrl: "passport.jpeg",
                isAdmin: "yes"
            }
            // User.save((err, res) => {
                chai.request(server)
                .get('/api/v1/users/', User.id)
                .send(User)
                .end((err, res) => {
                    res.should.have.status(200);
                    // res.body.should.be.a('object');
                    // res.body.should.have.property('office');
                    // res.body.should.have.property('party');
                    // res.body.should.have.property('User');
                    done();
                });
            // })
        });
    });

    describe('/PUT/:id User', () => {
        it('it should UPDATE a User by the given id', (done) => {
            let User = {
                firstname: "Governor",
                lastname: "Onos",
                othername: "Adeniyi",
                email: "test@test.com",
                password: "jkh3GJ6",
                phoneNumber: "+21397769",
                passportUrl: "passport.jpeg",
                isAdmin: "yes"
            }
            // User((err, res) => {
            chai.request(server)
            .put('/api/v1/Users/', User.id)  
            .set(User)
            .send({
                firstname: "Governor",
                lastname: "Onos",
                othername: "Adeniyi",
                email: "test@testmail.com",
                password: "jkh3GJ6",
                phoneNumber: "+21397769",
                passportUrl: "passport.jpeg",
                isAdmin: "yes"
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
            // })
        })
    })

});