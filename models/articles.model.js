const db = require('../db/connection')

const fetchArticle = (article_id)=> {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then((result)=> {

        if(result.rows.length === 0){
            return Promise.reject({
                status: 404,
                msg: 'Article Id not found'
            })
        }

        return result.rows[0]
    })
    .catch((error)=> {
        if(error.code === '22P02'){
            return Promise.reject({
                status: 400,
                msg: "Bad request"
            })
        }
        else {
            return Promise.reject(error)
        }
    })
}

module.exports = {fetchArticle}