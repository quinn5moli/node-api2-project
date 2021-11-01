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
server.use(express.json());
server.use(cors());

//use post router
server.use('/api/posts', postRoutes);



module.exports = server;
