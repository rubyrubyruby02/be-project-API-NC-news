const {fetchUsers} = require('../models/users.model')

const getUsers = (request, response, next) => {

    fetchUsers()
    .then((result)=> {
        response.status(200).send({users: result})
    })
    .catch(next)
}


module.exports = {getUsers}