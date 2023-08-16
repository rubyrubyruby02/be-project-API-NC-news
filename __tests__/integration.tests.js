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


describe('Q2 Adds first endpoint /api/topics', ()=> {
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
describe('Q3 Endpoint /api returns a list with a description of all available endpoints ', ()=> {
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

describe('Q5  adds /api/articles and returns articles in data-descending order', ()=> {
    
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
describe('Q6 /api/articles/:article_id/comments', ()=> {
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

