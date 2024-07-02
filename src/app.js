const express = require('express');
const cors = require('cors');
const database = require('./database/db');
const UserApi = require('./api/user');
const UserRouter = require('./routes/user');
const ProjectRouter = require('./routes/project');
const TaskRouter = require('./routes/task');

const app = express();
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World' });
});

app.post('/api/v1/login', UserApi.login);
app.post('/api/v1/user', UserApi.createUser);

app.use(UserApi.validateToken);

app.use('/api/v1/user', UserRouter);
app.use('/api/v1/project', ProjectRouter);
app.use('/api/v1/task', TaskRouter);

module.exports = app;
