\c nc_news_test

SELECT 
          a.article_id,
          COUNT(c.comment_id) comment_count,
          a.author, 
          a.title,  
          a.topic, 
          a.created_at, 
          a.votes, 
          a.article_img_url
          FROM articles a 
          LEFT JOIN comments c 
          ON a.article_id = c.article_id 
          WHERE a.topic = 'mitch'
          GROUP BY a.article_id 
          ORDER BY a.article_id ASC