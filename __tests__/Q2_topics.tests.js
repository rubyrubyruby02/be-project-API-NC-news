const app = require('../app')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const request = require('supertest')
const testData=require('../db/data/test-data/index')


beforeEach(()=> {
   return seed(testData)
})

afterAll(()=> {
   return db.end()
})


describe('Adds first endpoint /api/topics', ()=> {
    test('Status 200: responds with array of objects with properties of slug and description', ()=> {

        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((result) => {

            console.log(result.body)

            expect((result.body.topics)).toHaveLength(3)

            result.body.topics.forEach((topic)=>{
                expect(topic).toHaveProperty('slug', expect.any((String)))
                expect(topic).toHaveProperty('description', expect.any((String)))
            })
        })
    })
})
describe('Generic 404 not found error for missing endpoints', ()=> {
    test('Status 404: missing endpoint input', ()=> {
        return request(app)
        .get('/api/wronginput')
        .expect(404)
    })
})
