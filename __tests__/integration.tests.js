const app = require('../app')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const request = require('supertest')
const testData=require('../db/data/test-data/index')
const endpointData = require('../endpoints.json')


beforeEach(()=> {
   return seed(testData)
})

afterAll(()=> {
   return db.end()
})


describe('Q2 GET adds first endpoint /api/topics', ()=> {
    test('Status 200: responds with array of objects with properties of slug and description', ()=> {

        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((result) => {
            expect((result.body.topics)).toHaveLength(3)
            result.body.topics.forEach((topic)=>{
                expect(topic).toHaveProperty('slug', expect.any((String)))
                expect(topic).toHaveProperty('description', expect.any((String)))
            })
        })
    })
})
describe('Q2 Generic 404 not found error for missing endpoints', ()=> {
    test('Status 404: missing endpoint input', ()=> {
        return request(app)
        .get('/api/wronginput')
        .expect(404)
        .then((response)=> {
            expect(response.body.msg).toBe("Not found")
        })
    })
})
describe('Q3 GET endpoint /api returns a list with a description of all available endpoints ', ()=> {
    test('Status 200: tests entire file by comparing raw data to returned actual data', ()=> {

        return request(app)
        .get('/api')
        .expect(200)
        .then((response)=> {
            const result = response.body.result
            const expectedDataFromJsonFile = JSON.stringify(endpointData)
            const actualData = JSON.stringify(result)
            expect(actualData).toEqual(expectedDataFromJsonFile)
        })
    })
    test('Status 200: /api returns object with properties of description, queries, exampleResponse and articles', ()=> {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response)=> {

            const result = response.body.result
            const endpoints = result

            for(const endpointKey in endpoints){
                const endpoint = endpoints[endpointKey]
                expect(endpoint).toHaveProperty('description')
                expect(endpoint).toHaveProperty('queries')
                expect(endpoint).toHaveProperty('exampleResponse')
            }
        })
    })
})

describe('Q4 GET /api/articles/:article_id', ()=> {
    test('Status 200: returns article object with properties of author, title, article_id, body, topic, created_at, votes, article_img_url', ()=> {

        return request(app)
        .get('/api/articles/2')
        .expect(200)
        .then((response) => {

            const result = response.body.result

                expect(result).toHaveProperty('author', expect.any((String)))
                expect(result).toHaveProperty('title', expect.any((String)))
                expect(result).toHaveProperty('article_id', expect.any((Number)))
                expect(result).toHaveProperty('body', expect.any((String)))
                expect(result).toHaveProperty('topic', expect.any((String)))
                expect(result).toHaveProperty('created_at', expect.any((String)))
                expect(result).toHaveProperty('votes', expect.any((Number)))
                expect(result).toHaveProperty('article_img_url', expect.any((String)))
            
        })
    })
    test('Status 200, /api/articles/1 - checks expected output for first article', ()=> {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then((response)=> {

            const returnedData = {
                article_id: 1,
                title: 'Living in the shadow of a great man',
                topic: 'mitch',
                author: 'butter_bridge',
                body: 'I find this existence challenging',
                created_at: "2020-07-09T20:11:00.000Z",
                votes: 100,
                article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
              }

            expect(response.body).toEqual({result: returnedData})
            
        })
    })
    test('Status 400: not found, custom message when path is invalid (e.g. article_id is input a a string)', ()=> {
        return request(app)
        .get('/api/articles/not_a_number')
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe("Bad request")
        })
    })
    test('Status 404: a valid article_id is input but this article_id is not in the database', ()=> {
        return request(app)
        .get('/api/articles/999')
        .expect(404)
        .then((response)=> {
            expect(response.body.msg).toBe("Article Id not found")
        })
    })
})

describe('Q5 GET adds /api/articles and returns articles in data-descending order', ()=> {
    
    test('Status 200: returns array of article objects with properties of author, title, article_id, topic, created_at, votes, article_img_url, comment_count', ()=> {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((response)=> {

            response.body.articles.forEach((article)=> {
                expect(article).toHaveProperty('author', expect.any((String)))
                expect(article).toHaveProperty('title', expect.any((String)))
                expect(article).toHaveProperty('article_id', expect.any((Number)))
                expect(article).toHaveProperty('topic', expect.any((String)))
                expect(article).toHaveProperty('created_at', expect.any((String)))
                expect(article).toHaveProperty('votes', expect.any((Number)))
                expect(article).toHaveProperty('article_img_url', expect.any((String)))
                expect(article).toHaveProperty('comment_count', expect.any((String)))
            })
        })
    })
    test('Status 200: returns articles in decending date order by default', ()=> {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body : {articles}})=> {
         
            expect(articles).toBeSortedBy('created_at', {descending: true})
        })
    })
})
describe('Q6 GET /api/articles/:article_id/comments', ()=> {
    test('Status 200: responds with array with following properties: comment_id, votes, created_at, author, body, article_id', ()=> {
        return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then((response)=> {
            expect((response.body.comments)).toHaveLength(11)

            response.body.comments.forEach((comment)=> {
                expect(comment).toHaveProperty('comment_id', expect.any((Number)))
                expect(comment).toHaveProperty('votes', expect.any((Number)))
                expect(comment).toHaveProperty('created_at', expect.any((String)))
                expect(comment).toHaveProperty('author', expect.any((String)))
                expect(comment).toHaveProperty('body', expect.any((String)))
                expect(comment).toHaveProperty('article_id', expect.any((Number)))
            })
        })
    })
    test('Status 200: to be sorted with most recent comment first by default', ()=> {
        return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then((response)=> {
            expect(response.body.comments).toBeSortedBy('created_at', {descending: true})
        })
    })
    test('Status 404: a valid article_id is input but this article_id is not in the database', ()=> {
        return request(app)
        .get('/api/articles/999/comments')
        .expect(404)
        .then((response)=> { 
            expect(response.body.msg).toBe("Article Id not found")
        })
    })
    test('Status 400: not found, custom message when path is invalid (article_id is input a a string)', ()=> {
        return request(app)
        .get('/api/articles/not_a_number/comments')
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe("Bad request")
        })
    })
    test('Status 200 given a valid article ID but there are no comments for this article, returns an empty array', ()=> {
        return request(app)
        .get('/api/articles/2/comments')
        .expect(200)
        .then((response)=> {
            expect(response.body.comments).toEqual([])
        })
    })
})
describe('Q7 POST request /api/articles/:article_id/comments ', ()=> {
    test('Status 201: returns user input', ()=> {
        const postInput = {
            "username": "butter_bridge",
            "body":"Ruby adds a comment to article 1",
          }
        return request(app)
        .post('/api/articles/1/comments')
        .send(postInput)
        .expect(201)
        .then((response) => {
            const newComment = response.body.new_comment

            expect(newComment).toHaveProperty('comment_id', 19)
            expect(newComment).toHaveProperty('body', 'Ruby adds a comment to article 1')
            expect(newComment).toHaveProperty('article_id',1)
            expect(newComment).toHaveProperty('author',  'butter_bridge')
            expect(newComment).toHaveProperty('votes', 0)
            expect(newComment).toHaveProperty('created_at', expect.any((String)))
        })
    })
    test('Status 201: handles input with additional unneccesary properties', ()=> {
        const postInput = {
            "username": "butter_bridge",
            "body":"Ruby adds a comment to article 1",
            "other": "other unnecessary input"
        }
        return request(app)
        .post('/api/articles/1/comments')
        .send(postInput)
        .expect(201)
        .then((response)=> {
            const newComment = response.body.new_comment
            expect(newComment).toHaveProperty('comment_id', expect.any((Number)))
            expect(newComment).toHaveProperty('body', expect.any((String)))
            expect(newComment).toHaveProperty('article_id', expect.any((Number)))
            expect(newComment).toHaveProperty('author', expect.any((String)))
            expect(newComment).toHaveProperty('votes', expect.any((Number)))
            expect(newComment).toHaveProperty('created_at', expect.any((String)))
        })
    })
    test('Status 404 : article_id is valid but does not exist', ()=> {
        const postInput = {
            "username": "butter_bridge",
            "body":"Ruby adds a comment to article 999",
          }
        return request(app)
        .post('/api/articles/999/comments')
        .send(postInput)
        .expect(404)
        .then((response)=> 
         expect(response.body.msg).toBe("Not found"))
    })
    test('Status 404: username does not exist', ()=> {
        const postInput = {
            "username": "Ruby",
            "body":"Ruby adds a comment to article 1",
          }
        return request(app)
        .post('/api/articles/1/comments')
        .send(postInput)
        .expect(404)
        .then((response)=> 
         expect(response.body.msg).toBe("Not found"))
    })
    test('Status 400: user does not give all required fields in input - no body is provided', ()=> {
        const postInput = {
            "username": "butter_bridge"
          }
        return request(app)
        .post('/api/articles/1/comments')
        .send(postInput)
        .expect(400)
        .then((response)=> 
         expect(response.body.msg).toBe('Missing input'))

    })
    test('Status 400: user does not give all required fields in input - no username is provided', ()=> {
        const postInput = {
            "body": "here is a body with no username"
          }
        return request(app)
        .post('/api/articles/1/comments')
        .send(postInput)
        .expect(400)
        .then((response)=> 
         expect(response.body.msg).toBe('Missing input'))

    })
    test('Status 400: article id given is not a number', ()=> {
        const postInput = {
            "username": "butter_bridge",
            "body": "hello this is a new comment"
          }
        return request(app)
        .post('/api/articles/not_a_id_number/comments')
        .send(postInput)
        .expect(400)
        .then((response)=> 
         expect(response.body.msg).toBe('Bad request'))

    })
})
describe('Q8 PATCH /api/articles/:article_id', ()=> {
    test ('Status 200: accepted patch request and returns object with key of inc_votes and number of new votes to be added', ()=> {

        const patchInput = {
            "inc_votes": 1
        }

        return request(app)
        .patch('/api/articles/4')
        .send(patchInput)
        .expect(200)
        .then((response)=> {

            const updatedArticle = {
                article_id: 4,
                title: 'Student SUES Mitch!',
                topic: 'mitch',
                author: 'rogersop',
                body: 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
                created_at: "2020-05-06T01:14:00.000Z",
                votes: 1,
                article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
              }

            expect(response.body.updatedArticle).toEqual(updatedArticle)
        })
    })
    test('Status 200: accepted patch that decreases the number of votes', ()=> {
        return request(app)
        .patch('/api/articles/3')
        .send({"inc_votes": -100})
        .expect(200)
        .then((response)=> {

            const updatedArticle = {
                article_id: 3,
                title: 'Eight pug gifs that remind me of mitch',
                topic: 'mitch',
                author: 'icellusedkars',
                body: 'some gifs',
                created_at: "2020-11-03T09:12:00.000Z",
                votes: -100,
                article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
              }

            expect(response.body.updatedArticle).toEqual(updatedArticle)
         })
    })
    test('Status 400: Bad request - does not accept decimal votes e.g. invalid user input', ()=>{
        return request(app)
        .patch('/api/articles/3')
        .send({"inc_votes": 0.5})
        .expect(400)
        .then((response)=> {

            expect(response.body.msg).toEqual('Bad request')

        })
    })
    test('Status 400: Bad request - user input is not a number', ()=> {
        return request(app)
        .patch('/api/articles/3')
        .send({"inc_votes": "here is a string"})
        .expect(400)
        .then((response)=> {

            expect(response.body.msg).toEqual('Bad request')

        })
    })
    test('Status 400 - Bad request - user does not input key of inc_votes', ()=> {
        return request(app)
        .patch('/api/articles/1')
        .send({"a wrong key": 100})
        .expect(400)
        .then((response)=> {
            expect(response.body.msg).toEqual('Missing input')
        })
    })
    test('Status 400 - Bad request - no user input is given', ()=> {
        return request(app)
        .patch('/api/articles/1')
        .send({})
        .expect(400)
        .then((response)=> {
            expect(response.body.msg).toEqual('Missing input')
        })
    })
    test('Status 404: Article id is valid but does not exist', ()=> {
        return request(app)
        .patch('/api/articles/1111')
        .send({"inc_votes": 1})
        .expect(404)
        .then((response)=> {

            expect(response.body.msg).toEqual('Article Id not found')

        })
    })
    test('Status 400: Bad request - article id is not a number e.g. is a string', () => {
        return request(app)
        .patch('/api/articles/here_is_a_string')
        .send({"inc_votes": 1})
        .expect(400)
        .then((response)=> {

            expect(response.body.msg).toEqual('Bad request')

        })
    })
   
})

describe('Q9 DELETE comment by comment_id', ()=> {
    test('Status 204: no content when comment has been successfully deleted', ()=> { 
        return request(app)
        .delete('/api/comments/4')
        .expect(204)
    })
    test('Status 400 - bad request when comment_id is not a number', ()=> {
         return request(app)
        .delete('/api/comments/not_a_number')
        .expect(400)
        .then((response)=> {
            expect(response.body.msg).toEqual("Bad request")
        })
    })
    test('Status 404 - not found when comment_id is valid but does not exist', ()=> {
         return request(app)
        .delete('/api/comments/9999')
        .expect(404)
        .then((response)=> {
            expect(response.body.msg).toEqual("Not found")
        })
    })
    test('Status 404 - nout found if /api/notcomments/1 invalid endpoint input i.e. in default error handler in app', ()=> {
        return request(app)
        .delete('/api/notcomments/1')
        .expect(404)
        .then((response)=> {
            expect(response.body.msg).toEqual("Not found")
        })
    })
})


describe('Q11 QUERIES GET /api/articles(queries)', ()=> {
    test('Status 200 : filters by topic in the query', ()=> {
        return request(app)
        .get('/api/articles?topic=cats')
        .expect(200)
        .then((response)=> {
            expect(response.body.articles).toHaveLength(1)

            response.body.articles.forEach((article)=> {
                expect(article).toHaveProperty('topic', 'cats')
            })
        })
    })
})