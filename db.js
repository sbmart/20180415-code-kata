import Sequelize from 'sequelize';
import _ from 'lodash'
import Faker from 'faker'

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
});

const Post = Conn.define('post', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false  
    }
});

// Relate tables:
Person.hasMany(Post);
Post.belongsTo(Person);

Conn.sync({force: true}).then(()=>{
_.times(100, ()=>{
    return Person.create({
        firstName: Faker.name.firstName(),
        lastName: Faker.name.lastName(),
        // email: Faker.internet.exampleEmail()
        email: Faker.internet.email()
    })
});
});

export default Conn;

