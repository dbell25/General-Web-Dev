const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        author: { type: GraphQLString },
        genre: { type: GraphQLString },
        year: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString }},
            resolve(parent, args){
                // code to get data from db. Can be MongDB / NoSQL/ MSSQL

                // finds book matching id
                return _.find(books, { id: args.id });
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
});


// Dummy Database
let books = [
    { 
        id:'1',
        name: '1984',
        author: 'George Orwell', 
        genre: 'Dystopia',
        year: '1949'
    },
    { 
        id:'2',
        name: 'Around the World in 80 Days',
        author: 'Jules Verne', 
        genre: 'Adventure',
        year: '1872'
    },
    { 
        id:'3',
        name: 'Murder on The Orient Express', 
        author: 'Agatha Christie',
        genre: 'Mystery',
        year: '1934'
    },
    { 
        id:'4',
        name: 'I, Robot', 
        author: 'Isaac Asmimov',
        genre: 'Science Fiction',
        year: '1950'
    },
    { 
        id:'5', 
        name: 'Robinson Crusoe', 
        author: 'Daniel Defoe',
        genre: 'Survival',
        year: '1719'
    },
]