const database = require('../database/db')

class Project {
    constructor() {
        this.model = database.db.define('project', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true
            },
            nome: {
                type: database.db.Sequelize.STRING
            },
            descrisao: {
                type: database.db.Sequelize.STRING
            },
        })
    }
}

module.exports = (new Project()).model