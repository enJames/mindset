import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { should } = chai;
should();

describe('HOME', () => {
    describe('Home page: When the user sends a GET request to /', () => {
        it('It should return a 200 status', (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});
