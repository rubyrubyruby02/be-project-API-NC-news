const fs = require('fs/promises')
const db = require('../db/connection')

const fetchEndpoints = ()=> {
    
    return fs.readFile('./endpoints.json', 'utf-8')
    .then((endpointsList) => {
        const parsedDataOfEndpoints = JSON.parse(endpointsList)

        return parsedDataOfEndpoints
    })

}

module.exports = {fetchEndpoints}