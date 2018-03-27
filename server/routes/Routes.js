import MindsetDataController from '../controllers/MindsetDataController';

const Routes = (app) => {
    app.get('/', (req, res) => res.render('index'));
    app.get('/error', (req, res) => res.render('error'));
    app.get('/checkup', (req, res) => res.render('checkup'));
    app.post('/checkup', MindsetDataController.create);
};

export default Routes;
