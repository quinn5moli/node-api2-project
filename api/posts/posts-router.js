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

router.post('/', (req, res) => {
    
    if(!req.body.title || !req.body.contents) {
        res.status(400).json({ message: "Please provide title and contents for the post" })
    } else {
        Posts.insert(req.body)
            .then(({ id }) => {
                return Posts.findById(id)
            })
            .then((post) => {
                res.status(201).json(post)
            })
            .catch(() => {
                res.status(500).json({ message: "There was an error while saving the post to the database" })
            })
    }
})

router.put(':id', (req, res) => {
        const changes = req.body
        if(!req.body.title || !req.body.contents) {
            res.status(400).json({ message: 'Please provide title and contents for the post'})
        } else { 
            Posts.update(id, changes)
            .then((post) => res.status(200).send(post))
            .catch (() => {
         res.status(500).json({ message: 'The post information could not be modified'})}
    )}
})

router.delete('/:id', async (req, res) => {
    try {
        const deletePost = await Posts.remove(req.params.id)
        if (!deletePost) return res.status(404).json({ message: 'The post with the specified ID does not exist' })
        res.status(200).json(deletePost)
    } catch (error) {
        res.status(500).json({ message: 'The post could not be removed'})
    }
})

router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
        .then(postId => {
            if(!postId) {
                res.status(404).json ({ message: 'The post with the specified ID doed not exist' })
            } else {
                res.status(200).json(comments)
            }
        })
        .catch(() => {
            res.status(500).json({ message: 'The comments information could not be retrieved' })
        })
})

module.exports = router;