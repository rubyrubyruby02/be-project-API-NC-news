const db = require('../db/connection')

const fetchUsers = () => {

    return db.query(`SELECT * FROM users`)
    .then((result)=> {
        return result.rows
    })
}

const fetchUserByUsername = (username)=> {
    return db.query(`SELECT * FROM users WHERE username = $1`, [username])
    .then((result)=> {

        if(result.rows.length === 0){
            return Promise.reject({
                status: 404,
                msg: "Username not found"
            })
        }
        return result.rows[0]
    })


}
module.exports = {fetchUsers, fetchUserByUsername}