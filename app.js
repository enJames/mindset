import express from 'express';
import mainController from './server/controllers/mainController';

const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;

app.use(express.static('static-files'));

app.set('view engine', 'ejs');
app.set('port', port);

mainController(app);

app.listen(port);

export default app;
