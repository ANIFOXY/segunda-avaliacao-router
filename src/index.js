const app = require('./app');
const database = require('./database/db');

database.db.sync({ force: true })
    .then(() => {
        app.listen(8000, () => {
            console.log('Server running on port 8000');
        });
    })
    .catch(err => {
        console.error('Erro ao inicializar o banco de dados:', err);
    });
