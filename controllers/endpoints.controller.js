const fs = require('fs/promises')

const getEndpoints = (request, response, next)=> {
    fetchEndpoints()
    .then((result)=> {
        response.status(200).send({result})
    })
    .catch(next)
}

const fetchEndpoints = ()=> {
    return fs.readFile('./endpoints.json', 'utf-8')
    .then((endpointsList) => {
        const parsedDataOfEndpoints = JSON.parse(endpointsList)
        return parsedDataOfEndpoints
    })

}

module.exports = {getEndpoints}