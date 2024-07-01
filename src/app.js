const express = require('express');
const cors = require('cors');
const database = require('./database/db');
const UserApi = require('./api/user');
const UserRouter = require('./routes/user');
const ProjectRouter = require('./routes/project');
const TaskRouter = require('./routes/task');

const app = express();
app.use(express.json());

// Habilita o CORS
app.use(cors());

// Rota inicial
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World' });
});

// Rotas sem token
app.post('/api/v1/login', UserApi.login);
app.post('/api/v1/user', UserApi.createUser);

// Middleware para validar token
app.use(UserApi.validateToken);

// Rotas com token
app.use('/api/v1/user', UserRouter);
app.use('/api/v1/project', ProjectRouter);
app.use('/api/v1/task', TaskRouter);

module.exports = app; // Exporta a instância do app Express
