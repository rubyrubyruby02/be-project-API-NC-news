const express = require('express')
const app = express()

const {getTopics} = require('./controllers/topic.controller')
const {getArticle, getAllArticles, patchArticle} = require('./controllers/article.controller')
const {getEndpoints} = require('./controllers/endpoints.controller')
const {getComments, patchComment, postNewComment, deleteComment} = require('./controllers/comments.controller')

const usersRouter = require("./routes/user-routes")
const articleRouters = require('./routes/articles-router')

const {customErrorHandler, PSQLErrorHandler} = require('./errors/errors')


app.use(express.json())

//Routers
app.use('/api/users', usersRouter)
app.use('/api/articles', articleRouters)


app.get('/api', getEndpoints)
app.get('/api/topics', getTopics)


//app.get('/api/articles/:article_id/comments', getComments)

app.post('/api/articles/:article_id/comments', postNewComment)
app.patch('/api/comments/:comment_id', patchComment)
app.delete('/api/comments/:comment_id', deleteComment)


app.use((request, response)=> {
    response.status(404).send({msg: "Not found"})
})

app.use(PSQLErrorHandler)
app.use(customErrorHandler)


module.exports = app