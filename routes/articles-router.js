const articleRouters = require('express').Router()
const commentsRouter = require('./comments-router')

const {getAllArticles, getArticle, patchArticle} = require('../controllers/article.controller')

articleRouters.get('/', getAllArticles)

articleRouters.route('/:article_id')
.get(getArticle)
.patch(patchArticle)

articleRouters.use('/:article_id', commentsRouter)
//if can't pass param through to commentsRouter, then could just write full route here e.g. /:article_id/comments


module.exports = articleRouters