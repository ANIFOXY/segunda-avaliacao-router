const app = require('./app'); // Importa o app Express
const database = require('./database/db');

// Sincroniza o banco de dados
database.db.sync({ force: true })
    .then(() => {
        // Inicia o servidor
        app.listen(8000, () => {
            console.log('Server running on port 8000');
        });
    })
    .catch(err => {
        console.error('Erro ao inicializar o banco de dados:', err);
    });
