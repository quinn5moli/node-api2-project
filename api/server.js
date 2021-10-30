// implement your server here
const express = require('express');
const server = express();
const model = require('./posts/posts-model');
require('colors');

//middleware
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

// require your posts router and connect it here

module.exports = server;
