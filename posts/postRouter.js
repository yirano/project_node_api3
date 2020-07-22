const router = require('express').Router()
const postsDB = require('../posts/postDb')
const postDb = require('../posts/postDb')
// const router = express.Router()

router.get('/', async (req, res, next) => {
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

router.get('/:id', validatePostId(), (req, res, next) => {
  res.status(200).json({ data: req.post })
})

router.delete('/:id', validatePostId(), async (req, res, next) => {
  // do your magic!
  const deletePost = await postsDB.remove(req.params.id)
  if (deletePost) {
    res.status(200).json({ data: deletePost })
  } else {
    res.status(400).json({ message: 'Post could not be deleted' })
  }
})

router.put('/:id', validatePostId(), async (req, res, next) => {
  if (req.body.text) {
    const editPost = await postsDB.update(req.params.id, req.body)
    res.status(201).json({ data: editPost })
  } else {
    res.status(400).json({ message: 'Please provide a valid input' })
  }
})

// custom middleware
function validatePostId() {
  return (req, res, next) => {
    postDb.getById(req.params.id)
      .then(post => {
        if (post) {
          req.post = post
          next()
        } else {
          res.status(404).json({
            message: 'Post by the ID not found'
          })
        }
      })
      .catch(next)
  }
}


module.exports = router
