const {fetchUsers, fetchUserByUsername} = require('../models/users.model')

const getUsers = (request, response, next) => {

    fetchUsers()
    .then((result)=> {
        response.status(200).send({users: result})
    })
    .catch(next)
}


const getUsersByUsername = (request, response, next) => {
    const {username} = request.params

    fetchUserByUsername(username)
    .then((result)=> {
        response.status(200).send({user: result})
    })
    .catch(next)
}

module.exports = {getUsers, getUsersByUsername}