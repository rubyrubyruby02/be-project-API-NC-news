const express = require('express')
const app = express()

const {getTopics} = require('./controllers/topic.controller')
const {getArticle, getAllArticles, patchArticle} = require('./controllers/article.controller')
const {getEndpoints} = require('./controllers/endpoints.controller')
const {getComments} = require('./controllers/comments.controller')
const {postNewComment} = require('./controllers/postcomment.controller')
const {getUsers} = require('./controllers/users.controller')

const {customErrorHandler, PSQLErrorHandler} = require('./errors/errors')

app.use(express.json())

app.get('/api', getEndpoints)
app.get('/api/topics', getTopics)
app.get('/api/articles/:article_id', getArticle)
app.get('/api/articles', getAllArticles)
app.get('/api/articles/:article_id/comments', getComments)
app.get('/api/users', getUsers)

app.post('/api/articles/:article_id/comments', postNewComment)


app.patch('/api/articles/:article_id', patchArticle)


app.use((request, response)=> {
    response.status(404).send({msg: "Not found"})
})

app.use(PSQLErrorHandler)
app.use(customErrorHandler)


module.exports = app