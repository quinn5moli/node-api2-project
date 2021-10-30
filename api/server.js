// implement your server here
const express = require('express');
const server = express();
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const model = require('./posts/posts-model');
require('colors');

// require your posts router and connect it here

const postRoutes = require('./posts/posts-router');

//middleware
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());
server.use(express.json());

//use post router
server.use('/api/posts', postRoutes);

//sanity test for ThunderClient
server.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'API is running',
        time: new Date().toLocaleTimeString(),
    })
})

module.exports = server;
