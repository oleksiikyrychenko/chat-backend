import express from 'express';
import favicon from 'static-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import routes from './routes/index'
import mongoose from 'mongoose';
import userRoutes from './routes/usersRoutes'
import cors from 'cors';

const app = express();

app.use(cors())
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use('/', routes);
app.use('/users', userRoutes)

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/chat', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database is connected') ,
        err => console.log('Can not connect to the database'+ err)
    );

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
});

export default app;
