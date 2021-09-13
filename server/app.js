const express = require('express');
// the naming of the file is apparently is just conventional
// const graphqlHTTP = require('express-graphql');
// had to deconstruct, was trowing an error, the tutorial I'm 
// following showed it as above, but the bottom one worked for me  
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

// graphqlHTTP middleware is in a fact a function and thats on options 
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))


app.listen(4000, () => {console.log('app is live on port 4000')})