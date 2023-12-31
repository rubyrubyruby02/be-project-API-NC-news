# Northcoders News API

Please find a link to the hosted version:
https://rubys-northcoders-news.onrender.com/api

### Project Summary ###
This is a back-end project using the Model-View-Controller architecture written using TDD. I have created endpoints to get data from a SQL server. It includes get, post, patch and delete requests.
To see a list of all available endpoint: 
* https://rubys-northcoders-news.onrender.com/api. 

It also includes queries so the user can find specific topics, sort and order the data: 
* https://rubys-northcoders-news.onrender.com/api/articles?topics=cooking
* https://rubys-northcoders-news.onrender.com/api/articles?topics=football&sort_by=article_id&order=asc

### Set-up ###
To run this project yourself, please git clone by using the green Code button.You will also need to install dependancies (npm install).

The minimum version of Node.js is v20.3.1 and Postgres is v.14.9 needed to run the project.

Other dependancies are: 
* dotenv@16.0.3
* express@4.18.2
* husky@8.0.2
* jest-extended@4.0.1
* jest-sorted@1.0.14
* jest@27.5.1
* pg-format@1.0.4
* pg@8.8.0
* supertest@6.3.3

Once installed, start by running "npm run seed" to seed the database. These scripts can be found in the packack.json file. 
All tests can be found in the tests folder. To run the tests please run npm test. Supertest and Jest-sorted are required. 

### .env files ###
How to create the environement variables: add two .env files (env.test & env.development). Inside these files you will need to put your environement variable=database_name. 
