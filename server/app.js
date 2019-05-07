const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

mongoose.connect('mongodb+srv://app:0y0W4IOTPglkPoHn@cluster0-hs3vz.mongodb.net/test?retryWrites=true')
mongoose.connection.once('open',() => {
    console.log('connected to DB');
})

app.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Listening on port 4000');
});
