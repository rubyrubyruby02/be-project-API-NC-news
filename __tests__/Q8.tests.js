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


describe('Q8 PATCH /api/articles/:article_id', ()=> {
    test ('Status 202: accepted patch request and returns object with key of inc_votes and number of new votes to be added', ()=> {

        const patchInput = {
            "inc_votes": 1
        }

        return request(app)
        .patch('/api/articles/4')
        .send(patchInput)
        .expect(202)
        .then((response)=> {

            const updatedArticle = {
                article_id: 4,
                title: "Student SUES Mitch!",
                votes: 1
            }

            expect(response.body).toEqual(updatedArticle)
        })
    })
    test.skip('Status 202: accepted patch that decreases the number of votes', ()=> {
        return request(app)
        .patch('/api/articles/3')
        .send({"inc_votes": -100})
        .expect(202)
        .then((response)=> {

            const updatedArticle = {
                article_id: 3,
                title: "Student SUES Mitch!",
                votes: -100
            }
            expect(response.body).toEqual(updatedArticle)
         })
    })

})