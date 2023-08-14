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


describe('Endpoint /api returns a list with a description of all available endpoints ', ()=> {
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


