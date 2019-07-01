import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../server';
import Party from '../../../src/models/Party';

chai.use(chaiHttp)
let should = chai.should();

describe('Party', () => {
//     beforeEach((done) => {
//         Party.remove({}, (err) => {
//             done();
//         });
//     });

    describe('/GET Party', () => {
        it('it should GET all the Parties', (done) => {
            chai.request(server)
            .get('/api/v1/parties')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
    });

    describe('/POST Party', () => {
        it('it should post a Party', (done) => {
            let party = {
                name: "SDP",
                hqAddress: "12, Ikeja, Lagos",
                logoUrl: "SDP.jpg",
                // createDate: "2014-06-04",
                // modifiedDate: "2014-06-04"
            }
            chai.request(server)
            .post('/api/v1/parties')
            .send(party)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('hqAddress');
                res.body.should.have.property('logoUrl');
                // res.body.should.have.property('id');
                done();
            });
        });
    })

    describe('/GET/:id Party', () => {
        it('it should GET a Party by the given id', (done) => {
            let party = {
                name: "SDP",
                hqAddress: "12, Ikeja, Lagos",
                logoUrl: "SDP.jpg",
                // createDate: "2014-06-04",
                // modifiedDate: "2014-06-04"
            }
                chai.request(server)
                .get('/api/v1/parties/', Party.id)
                .send(party)
                .end((err, res) => {
                    res.should.have.status(200);
                    // res.body.should.be.a('object');
                    // res.body.should.have.property('name');
                    // res.body.should.have.property('hqAddress');
                    // res.body.should.have.property('logoUrl');
                    done();
                });
        });
    });

    // describe('/PUT/:id Party', () => {
    //     it('it should UPDATE a Party by the given id', (done) => {
    //         let Party = {
    //             name: "SDP",
    //             hqAddress: "12, Ikeja, Lagos",
    //             logoUrl: "SDP.jpg",
    //             // createDate: "2014-06-04",
    //             // modifiedDate: "2014-06-04"
    //         }
    //         // Party((err, res) => {
    //         chai.request(server)
    //         .put('/api/v1/Parties/', Party.id) 
    //         .send({
    //             name: "SDP",
    //             hqAddress: "12, Ikeja, Lagos",
    //             logoUrl: "SDP.jpg",
    //             // createDate: "2014-06-04",
    //             // modifiedDate: "2014-06-04"
    //         })
    //         .end((err, res) => {
    //             if(err) {throw err}
    //             res.should.have.status(200);
    //             done();
    //         })
    //         // })
    //     })
    // })
    
    describe('/DELETE/:id party', () => {
        it('it should DELETE a party given the id', (done) => {
            let party = {
                name: "SDP",
                hqAddress: "102 Oshodi, Lagos",
                logoUrl: "SDP.jpg"
            }
            chai.request(server)
            .delete('/api/v1/parties/', party.id)
            .end((err, res) => {
                res.should.have.status(200);
                // res.body.should.be.a('object');
                done();
            })
        })
    })

})
