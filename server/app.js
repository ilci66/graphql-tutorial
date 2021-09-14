const express = require('express');
const mongoose = require('mongoose');
// the naming of the file is apparently is just conventional
// const graphqlHTTP = require('express-graphql');
// had to deconstruct, was trowing an error, the tutorial I'm 
// following showed it as above, but the bottom one worked for me  
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {}).then(() => console.log('Connected to database')) 

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))


app.listen(4000, () => {console.log('app is live on port 4000')})