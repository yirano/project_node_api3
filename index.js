// code away!
const express = require('express')

const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')

const server = express()
const PORT = process.env.PORT || 4000

server.use(express.json())

server.use('/users', userRouter)
server.use('/posts', postRouter)

server.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    errorMessage: 'Something went wrong'
  })
})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})