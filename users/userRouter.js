const express = require('express')

const userDB = require('./userDb')
const postDB = require('../posts/postDb')
const { getById } = require('./userDb')

const router = express.Router()

router.post('/', validateUser(), async (req, res, next) => {
  try {
    const postUser = await userDB.insert(req.body)
    if (postUser) {
      res.status(201).json({ data: postUser })
    } else {
      res.status(400).json({ message: 'User could not be created.' })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/:id/posts', validateUserId(), validatePost(), async (req, res) => {
  try {
    const newPost = await postDB.insert(req.body)
    res.status(201).json({ data: newPost })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'could not do it'
    })
  }
})

router.get('/', async (req, res, next) => {
  // do your magic!
  try {
    const users = await userDB.get()
    if (users) {
      res.status(200).json({ data: users })
    } else {
      res.status(404).json({ message: 'Could not retrieve users' })
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', validateUserId(), async (req, res, next) => {
  if (req.user) {
    res.status(200).json({ data: req.user })
  } else {
    res.status(404).json({ message: 'User by that ID could not be found' })
  }
})

router.get('/:id/posts', validateUserId(), async (req, res, next) => {
  const posts = await userDB.getUserPosts(req.params.id)
  if (posts) {
    res.status(200).json({ data: posts })
  } else {
    res.status(404).json({ message: 'Could not find posts by that user' })
  }
})

router.delete('/:id', validateUserId(), async (req, res, next) => {
  // do your magic!
  try {
    const deleted = await userDB.remove(req.params.id)
    if (deleted) {
      res.status(200).json({ data: user })
    } else {
      res.status(400).json({ message: 'User could not be deleted' })
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', validateUserId(), validateUser(), async (req, res, next) => {
  const { id } = req.params
  try {
    const updatedUser = await userDB.update(id, req.body)
    res.status(201).json({ data: updatedUser })
  } catch (error) {
    next(error)
  }
})

//custom middleware

function validateUserId() {
  // do your magic!
  return (req, res, next) => {
    userDB.getById(req.params.id)
      .then(user => {
        req.user = user
        next()
      })
      .catch(err => {
        console.log(err)
        // next(err)
        res.status(500).json({ message: "HEYOOO" })
      })
  }
}

function validateUser() {
  // do your magic!
  return (req, res, next) => {
    if (req.body.name) {
      req.body = req.body
      next()
    } else {
      res.status(400).json({ message: 'Please make sure your input is valid' })
    }
  }
}

function validatePost() {
  // do your magic!
  return (req, res, next) => {
    try {
      if (req.body.text && req.body.user_id) {
        req.body = req.body
        next()
      } else if (!req.body.user_id) {
        res.status(400).json({ error: "Missing required user_id field" })
      } else {
        res.status(400).json({ message: "Missing required name field" })
      }
    } catch (error) {
      next(error)
    }
  }

}

module.exports = router
