const { Sequelize, DataTypes } = require('sequelize')
const database = require ('../database/db')

class Task {
    constructor() {
        this.model = database.db.define('task', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            titulo: {
                type: database.db.Sequelize.STRING,
                validate: {
                    notEmpty: {
                        msg: 'Titulo é obrigatorio'
                    },
                    len: {
                        args: [0, 100],
                        msg: 'Titulo deve ter no maximo 100 caracteres'
                    }
                }
            },
            descricao: {
                type: database.db.Sequelize.STRING,
            },
            status: {
                type: database.db.Sequelize.ENUM,
                values: ['pendente', 'em progresso', 'concluido'],
                defaultValue: 'pendente'
            },
            criacaoData: {
                type: database.db.Sequelize.DATE,
                defaultValue: database.db.Sequelize.NOW
            },
            conclusaoData: {
                type: database.db.Sequelize.DATE,
            },
            projectId: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'projects',
                    key: 'id'
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

module.exports = (new Task()).model