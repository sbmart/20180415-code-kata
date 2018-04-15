import {
    GraphQLObjectType,
    GraphQLInt
} from 'graphql';
import Db from './db';

const Person = new GraphQLObjectType({
    name: 'Person',
    description: 'This represents a Person',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(person)
            }
        }
    }
})