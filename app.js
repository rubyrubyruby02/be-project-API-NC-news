const express = require('express')
const app = express()
const {getTopics} = require('./controllers/topic.controller')
const {getArticle} = require('./controllers/article.controller')

app.get('/api/topics', getTopics)

app.get('/api/articles/:article_id', getArticle)

module.exports = app