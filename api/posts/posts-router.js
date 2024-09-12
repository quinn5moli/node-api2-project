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
    if(!req.body.title || !req.body.contents) {
        res.status(400).json({ 
            message: "Please provide title and contents for the post" 
        })
    } else { 
            Posts.findById(req.params.id)
            .then(stuff => {
                if (!stuff) {
                    res.status(404).json({
                        message: 'The post with the specified ID does not exist'
                    }) 
                } else {
                    return Posts.update(req.params.id, req.body)
                }
            })
            .then(data => {
                if (data) {
                    return Post.findById(req.params.id)
                }
            })
            .then(post => {
                if (post) {
                    res.json(post)
                }
            })
            .catch (() => {
         res.status(500).json({ message: 'The post information could not be modified'})}
    )}
})

router.delete('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id)
    if(!post) { res.status(404).json({ 
        message: 'The post with the specified ID does not exist' })
    } else {
        await Posts.remove(req.params.id)
        res.json(post)
    }} catch (error) {
        res.status(500).json({ message: 'The post could not be removed'})
    }
})

router.get('/:id/comments', async(req, res) => {
    try {
        console.log('start')
        const posts = await Posts.findById(req.params.id)
        if(!posts) return res.status(404).json({ 
            message: "The post with the specified ID does not exist" 
        })

     else {
        const comments = await Post.findPostComments(req.params.id)
        res.json(comments)
        }
    } catch (error){
        res.status(500).json({
            message: "The comments information could not be retrieved"
        })

    }
})
//     Posts.findPostComments(req.params.id)
//         .then(postId => {
//             if(!postId) {
//                 res.status(404).json ({ message: 'The post with the specified ID doed not exist' })
//             } else {
//                 res.status(200).json(comments)
//             }
//         })
//         .catch(() => {
//             res.status(500).json({ message: 'The comments information could not be retrieved' })
//         })
// })

module.exports = router;