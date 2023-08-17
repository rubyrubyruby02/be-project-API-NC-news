const db = require('../db/connection')

const fetchUsers = () => {

    return db.query(`SELECT * FROM users`)
    .then((result)=> {

        console.log(result.rows, "in model")
        return result.rows
    })
}

module.exports = {fetchUsers}