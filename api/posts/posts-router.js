// const router = express.Router();
// const express= require('express');
const router = require('express').Router();

const Posts = require('./posts-model');

// implement your posts router here

router.get('/', async (req, res) => {
    try {
        console.log('started')
        const posts = await Posts.find()

        console.log('finished', posts)

    } catch (error){
            res.status(500).json({ message: "The posts information could not be retrieved" })
    }
})



module.exports = router;