const express = require('express');
require('express-async-errors');
const app = express();

const {PORT} = require('./util/config');
const {connectToDatabase} = require('./util/db');
const {errorHandler, unknownEndpoint} = require('./util/middleware')

const blogsRouter = require('./controllers/blogs');

app.use(express.json());
app.use('/api/blogs', blogsRouter);
app.use(errorHandler)
app.use(unknownEndpoint)

const start = async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

void start();