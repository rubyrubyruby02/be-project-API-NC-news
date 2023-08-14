const db = require('../db/connection')
const format = require('pg-format')

const fetchTopics = () => {
    return db.query('SELECT * FROM topics')
    .then((result)=> {

        if(!result.rows.length === 0){
            return Promise.reject(error)
        }

        return result.rows
    })
}

module.exports = {fetchTopics}