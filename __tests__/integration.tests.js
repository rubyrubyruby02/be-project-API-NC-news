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
describe.skip('Q5  adds /api/articles and returns articles in data-descending order', ()=> {
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
                expect(article).toHaveProperty('comment_count', expect.any((Number)))
            })
        })
    })
    test('Status 200: returns articles in decending date order by default', ()=> {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((response)=> {
            expect(response.body.articles).toBeSortedBy('created_at', {descending: true})
        })
    })
})

