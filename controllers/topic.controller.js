const {fetchTopics} = require('../models/topics.model')

const getTopics = (request, response, next) => {
    fetchTopics().then((result)=>{
        response.status(200).send({topics: result})
    })
    .catch(next)
}


module.exports = {getTopics}
