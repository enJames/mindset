import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { should } = chai;
should();

describe('BUSINESSES', () => {
    describe('Get All Businesses: When the user sends a GET request to /api/v1/businesses/', () => {
        it('It should return a 200 status and get all businesses', (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});
