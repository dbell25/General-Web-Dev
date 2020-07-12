const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const app = express();

const test_schema = require('./schema/test_schema');

// allow cross origin requests
app.use(cors());

// test route - 'graphiql: true' for testing.
app.use('/graphql', graphqlHTTP({
    schema: test_schema,
    graphiql: true
}));

// Initialize Server
app.listen(3001, () => {
    console.log("API Listening on Port 3001");
});