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

describe.only('GET /api/articles/:article_id', ()=> {
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
    test('Status 404: not found, custom message when path is invalid (e.g. article_id is input a a string)', ()=> {
        return request(app)
        .get('/api/not_a_path/not_a_number')
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe("Not found")
        })
    })
    test('Status 404: a valid article_id is input but this artcile_id is not in the database', ()=> {
        return request(app)
        .get('/api/articles/999')
        .expect(404)
        .then((response)=> {
            expect(response.body.msg).toBe("Article Id not found")
        })
    })
})
