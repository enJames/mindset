import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import Routes from './server/routes/Routes';

const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;

app.use(express.static('static-files'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('combined'));

app.set('view engine', 'ejs');
app.set('port', port);

Routes(app);

app.listen(port);

export default app;
