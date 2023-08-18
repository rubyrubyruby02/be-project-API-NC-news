\c nc_news_test

SELECT * FROM articles; 

SELECT a.article_id, a.author, a.title, a.body, a.topic, 
a.article_img_url, a.created_at, a.votes, COUNT(c.comment_id)
FROM articles a
LEFT JOIN comments c
ON a.article_id = c.article_id
WHERE a.article_id = 1
GROUP BY a.article_id;