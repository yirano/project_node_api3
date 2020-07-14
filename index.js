// code away!
const express = require('express')

const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')

const server = express()
const PORT = 4000

server.use(express.json())

server.use('/users', userRouter)
server.use(postRouter)

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})