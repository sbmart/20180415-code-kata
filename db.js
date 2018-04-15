import Sequelize from 'sequelize';

const Conn = new Sequelize(
    'relay',
    'dev',
    'dev',
    {
        dialect: 'postgres'
    }
);

const Person = Conn.define('person', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
})