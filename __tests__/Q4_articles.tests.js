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

describe('GET /api/articles/:article_id', ()=> {
    test.skip('Status 200: returns article object with properties of author, title, article_id, body, topic, created_at, votes, article_img_url', ()=> {
        return request(app)
        .get('/api/articles/2')
        .expect(200)
        .then((result) => {

            result.body.article.forEach((article)=>{
                expect(article).toHaveProperty('author', expect.any((String)))
                expect(article).toHaveProperty('title', expect.any((String)))
                expect(article).toHaveProperty('article_id', expect.any((Number)))
                expect(article).toHaveProperty('body', expect.any((String)))
                expect(article).toHaveProperty('topic', expect.any((String)))
                expect(article).toHaveProperty('created_at', expect.any((Date)))
                expect(article).toHaveProperty('votes', expect.any((Number)))
                expect(article).toHaveProperty('article_img_url', expect.any((String)))
            })
        })
    })
    test.skip('Status 200, /api/article/1 - checks expected output for first article', ()=> {

        return request(app)
        .get('/api/article/1')
        .expect(200)
        .then((result)=> {

            const returnedData = {
                article_id: 1,
                title: "Running a Node App",
                topic: "coding",
                author: "jessjelly",
                body: "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.", 
                created_at: 2020-11-07 06:03:00,
                votes: 0, 
                article_img_url: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700"
            }


            
        })
    })
})
