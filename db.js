import Sequelize from 'sequelize';

conts Conn = new Sequelize(
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
    }
})