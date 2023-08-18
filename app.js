const express = require('express')
const app = express()

const {getTopics} = require('./controllers/topic.controller')
const {getArticle, getAllArticles, patchArticle, postNewArticle} = require('./controllers/article.controller')
const {getEndpoints} = require('./controllers/endpoints.controller')
const {getComments, patchComment, postNewComment, deleteComment} = require('./controllers/comments.controller')
const {getUsers, getUsersByUsername} = require('./controllers/users.controller')

const {customErrorHandler, PSQLErrorHandler} = require('./errors/errors')

app.use(express.json())

app.get('/api/users', getUsers)
app.get('/api/users/:username', getUsersByUsername)
app.get('/api', getEndpoints)


app.get('/api/topics', getTopics)
app.get('/api/articles/:article_id', getArticle)
app.get('/api/articles', getAllArticles)
app.get('/api/articles/:article_id/comments', getComments)

app.post('/api/articles/:article_id/comments', postNewComment)
app.post('/api/articles', postNewArticle)

app.patch('/api/articles/:article_id', patchArticle)
app.patch('/api/comments/:comment_id', patchComment)

app.delete('/api/comments/:comment_id', deleteComment)

app.use((request, response)=> {
    response.status(404).send({msg: "Not found"})
})

app.use(PSQLErrorHandler)
app.use(customErrorHandler)


module.exports = app