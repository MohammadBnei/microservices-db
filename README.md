# 1 DB per service

## Steps

Get node js boilerplate for a basic user api with nodeJS, express and mongoDB ([repo here](https://github.com/giuseppealbrizio/express-ecma-boilerplate-mongodb))

```
git clone git@github.com:giuseppealbrizio/express-ecma-boilerplate-mongodb.git

# change the boilerplate repo name to user-api
mv express-ecma-boilerplate-mongodb user-api
```

Create the docker-compose file with correct user service (currently using node 14) and database (mongo)

