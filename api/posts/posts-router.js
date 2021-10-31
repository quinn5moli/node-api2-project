// const router = express.Router();
// const express= require('express');
const router = require('express').Router();

const Posts = require('./posts-model');

// implement your posts router here

router.get('/', async (req, res) => {
    try {
        console.log('started')
        const posts = await Posts.find(req.query)
        res.status(200).json(posts)

        console.log('finished', posts)

    } catch (error){
            res.status(500).json({ message: "The posts information could not be retrieved" })
    }
})

router.get('/:id', async (req, res) => {
    try {
        console.log('start')
        const posts = await Posts.findById(req.params.id)
        if(!posts) return res.status(404).json({ message: "The post with the specified ID does not exist" })
        res.status(200).json(posts)
        console.log('finished', posts)
    } catch (error) {
            res.status(500).json({ message: "The post information could not be retrieved" })
    }
})

router.post('/', async (req, res) => {
    try {
        const addPost = await Posts.insert(req.body)
        if(!req.body.title || !req.body.contents) return res.status(400).json({message: 'Please provide title and contents for the post'})
        else res.status(201).json(addPost)
    } catch (error) {
        res.status(500).json({ message: "There was an error while saving the post to the database" })
    }
    // if(!req.body.title || !req.body.contents) {
    //     res.status(400).json({ message: "Please provide title and contents for the post" })
    // } else {
    //     Posts.insert(req.body)
    //         .then(post => {
    //             res.status(201).json(post)
    //         })
    //         .catch(() => {
    //             res.status(500).json({ message: "There was an error while saving the post to the database" })
    //         })
    // }
})


module.exports = router;