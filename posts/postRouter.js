const express = require('express')
const postsDB = require('../posts/postDb')
const router = express.Router()

router.get('/', async (req, res) => {
  // do your magic!
  try {
    const posts = await postsDB.get()
    if (posts) {
      res.status(200).json({ data: posts })
    } else {
      res.status(404).json({ message: 'Could not retrieve posts' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: 'Something went wrong' })
  }
})

router.get('/:id', async (req, res) => {
  // do your magic!
  try {
    const post = await postsDB.getById(req.params.id)
    if (post) {
      res.status(200).json({ data: post })
    } else {
      res.status(404).json({ message: 'Post could not be found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: 'Something went wrong' })
  }
})

router.delete('/:id', (req, res) => {
  // do your magic!
})

router.put('/:id', (req, res) => {
  // do your magic!
})

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router
