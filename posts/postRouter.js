const express = require('express')
const postsDB = require('../posts/postDb')
const router = express.Router()

router.get('/', async (req, res, next) => {
  // do your magic!
  try {
    const posts = await postsDB.get()
    if (posts) {
      res.status(200).json({ data: posts })
    } else {
      res.status(404).json({ message: 'Could not retrieve posts' })
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  // do your magic!
  try {
    const post = await postsDB.getById(req.params.id)
    if (post) {
      res.status(200).json({ data: post })
    } else {
      res.status(404).json({ message: 'Post could not be found' })
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  // do your magic!
  try {
    const deletePost = await postsDB.remove(req.params.id)
    if (deletePost) {
      res.status(200).json({ data: deletePost })
    } else {
      res.status(400).json({ message: 'Post could not be deleted' })
    }
  } catch (error) {
    next(error)
  }

})

router.put('/:id', async (req, res, next) => {
  // do your magic!
  try {
    if (req.body.text) {
      const post = await postsDB.getById(req.params.id)
      if (post) {
        const editPost = await postsDB.update(req.params.id, req.body)
        res.status(201).json({ data: editPost })
      } else {
        res.status(404).json({ message: 'That post could not be found' })
      }
    } else {
      res.status(400).json({ message: 'Please provide valid input' })
    }
  } catch (error) {
    next(error)
  }
})

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router
