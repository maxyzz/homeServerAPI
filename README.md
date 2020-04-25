# homeServerAPI
my home api server. mongoDB and api routes

###### Installation
1. run in folder project: npm install
2. create files 
- config/db.js :
module.exports = {
    url : "MongoConnectionString"
  };
- config/jwt.js:
module.exports = {
    secret : "secretCodeForJWT"
  };

###### Running
npm run dev
