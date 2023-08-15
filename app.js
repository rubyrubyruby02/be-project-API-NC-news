const express = require('express')
const app = express()
const {getTopics} = require('./controllers/topic.controller')

const {getArticle} = require('./controllers/article.controller')
const {customErrorHandler} = require('./errors/errors')
const {getEndpoints} = require('./controllers/endpoints.controller')


app.get('/api', getEndpoints)
app.get('/api/topics', getTopics)
app.get('/api/articles/:article_id', getArticle)


app.use((request, response)=> {
    response.status(404).send({msg: "Not found"})
})

app.use(customErrorHandler)


module.exports = app