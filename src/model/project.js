const database = require('../database/db')

class Project {
    constructor() {
        this.model = database.db.define('project', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: database.db.Sequelize.STRING,
                validate: {
                    notEmpty: {
                        msg: 'Nome é obrigatorio'
                    },
                    len: {
                        args: [0, 100],
                        msg: 'Nome deve ter no maximo 100 caracteres'
                    }
                }
            },
            descrisao: {
                type: database.db.Sequelize.STRING,
                validate: {
                    notEmpty: {
                        msg: 'Descrição é obrigatoria'
                    }
                }
            },
            userId: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                }
            }
        })
    }
}

module.exports = (new Project()).model