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

//Generates no more than ~15K instances on my machine
// With 14K persons PersonTableSize is 1256kb on pg10
// lazy GC=>>
// https://github.com/elastic/kibana/issues/5595
// https://blog.risingstack.com/finding-a-memory-leak-in-node-js/
Conn.sync({force: true}).then(()=>{
_.times(100, ()=>{
    return Person.create({
        firstName: Faker.name.firstName(),
        lastName: Faker.name.lastName(),
        // email: Faker.internet.exampleEmail()
        email: Faker.internet.email()
    }).then(person => {
        return person.createPost({
            title: `Sample title by ${person.firstName}`,
            content: 'This is a fancy Article of their own'
        });
    });
});
});

export default Conn;

