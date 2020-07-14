const express = require('express')

const userDB = require('./userDb')
const postDB = require('../posts/postDb')
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

router.post('/:id/posts', async (req, res) => {
  // do your magic!
  try {
    const user = await userDB.getById(req.params.id)
    if (user) {
      if (req.body.text) {
        const post = await postDB.insert(req.body)
        if (post) {
          res.status(201).json({ data: post })
        } else {
          res.status(403).json({ message: 'Could not create post' })
        }
      } else {
        res.status(400).json({ message: 'Please provide valid input' })
      }
    } else {
      res.status(404).json({ message: 'Could not post for the user' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: 'Something went wrong' })
  }
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

router.get('/:id/posts', async (req, res) => {
  // do your magic!
  try {
    const user = await userDB.getById(req.params.id)
    if (user) {
      const posts = await userDB.getUserPosts(req.params.id)
      if (posts) {
        res.status(200).json({ data: posts })
      } else {
        res.status(404).json({ message: 'Could not find posts by that user' })
      }
    }
  } catch (error) {
    res.status(500).json({ errorMessage: 'Something went wrong' })
  }
})

router.delete('/:id', async (req, res) => {
  // do your magic!
  try {
    const user = await userDB.remove(req.params.id)
    if (user) {
      res.status(200).json({ data: user })
    } else {
      res.status(400).json({ message: 'User could not be deleted' })
    }
  } catch (error) {
    res.status(500).json({ errorMessage: 'Something went wrong' })
  }
})

router.put('/:id', async (req, res) => {
  // do your magic!

  try {
    const user = await userDB.getById(req.params.id)
    if (user) {
      if (req.body.name) {
        const edit = await userDB.update(req.params.id, req.body)
        if (edit) {
          res.status(201).json({ data: edit })
        } else {
          res.status(400).json({ message: 'User could not be edited' })
        }
      } else {
        res.status(400).json({ message: 'Please provide valid input' })
      }
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ errorMessage: 'Something went wrong' })
  }
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
