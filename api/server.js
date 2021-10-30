// implement your server here
const express = require('express');
const server = express();
const model = require('./posts/posts-model');
require('colors');

server.use(express.json());
// require your posts router and connect it here

module.exports = server;
