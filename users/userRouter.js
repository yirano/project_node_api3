const express = require('express')

const userDB = require('./userDb')
const { getById } = require('./userDb')

const router = express.Router()

router.post('/', async (req, res) => {
  // do your magic!
  try {
    if (req.body.name) {
      const postUser = await userDB.insert(req.body)
      if (postUser) {
        res.status(201).json({ data: postUser })
      } else {
        res.status(400).json({ message: 'User could not be created.' })
      }
    } else {
      res.status(400).json({ message: 'Please make sure your input is valid' })
    }
  } catch (error) {
    res.status(500).json({ errorMessage: 'Something went wrong' })
  }
})

router.post('/:id/posts', (req, res) => {
  // do your magic!
})

router.get('/', async (req, res) => {
  // do your magic!
  try {
    const users = await userDB.get()
    if (users) {
      res.status(200).json({ data: users })
    } else {
      res.status(404).json({ message: 'Could not retrieve users' })
    }
  } catch {
    res.status(500).json({ errorMessage: 'Something went wrong.' })
  }

})

router.get('/:id', async (req, res) => {
  // do your magic!
  try {
    const user = await userDB.getById(req.params.id)
    if (user) {
      res.status(200).json({ data: user })
    } else {
      res.status(404).json({ message: 'User by that ID could not be found' })
    }
  } catch {
    res.status(500).json({ errorMessage: 'Something went wrong.' })
  }
})

router.get('/:id/posts', (req, res) => {
  // do your magic!
})

router.delete('/:id', (req, res) => {
  // do your magic!
})

router.put('/:id', (req, res) => {
  // do your magic!
})

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router
