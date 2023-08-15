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

describe('/api/articles sorted by date in descending order', ()=> {
    test('', ()=> {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((response) => {

            expect(response.body).toBeSortedBy('created_at', {ascending : true})
        })
    })
})