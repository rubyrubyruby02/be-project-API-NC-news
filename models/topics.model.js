const db = require('../db/connection')
const format = require('pg-format')

const fetchTopics = () => {
    return db.query('SELECT * FROM topics')
    .then((result)=> {
        return result.rows
    })
    .catch((error)=> {
        console.log(error, "error in model")
    })
}

module.exports = {fetchTopics}