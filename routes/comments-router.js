const commentsRouter = require('express').Router()
const {getComments} = require('../controllers/comments.controller')

commentsRouter.get('/comments', getComments)

module.exports = commentsRouter