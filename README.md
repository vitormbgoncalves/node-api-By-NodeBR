<p align="center">
    <a href="https://treinamento.nodebr.org/">
        <img src="https://raw.githubusercontent.com/lucasfrancaid/curso-nodebr/master/public/nodebr-1.png" alt="NodeBR"/>
    </a>
</p>

<h1 align="center">
    <a href="https://erickwendel.teachable.com/p/node-js-para-iniciantes-nodebr"><strong>Imersão em desenvolvimento de APIs com Node.js By #NodeBR!</strong></a>
</h1>

<h5 align="center">
  Node.js RESTful API<br>
</h5>

<h4 align="center">
    <a href="#-about-this-project">🚀 About this project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; 
    <a href="#-tools">🧰 Tools</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-prerequisites">💻 Prerequisites</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-running">📦 Running</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-quick-note">🗒 Quick note</a>
</h4>

<h1></h1>

<h3 align="center">
    Live demo
</h3>

<p align="center">
    API documentation in Swagger UI:
    <br/>
    <a href="https://node-api-by-nodebr.herokuapp.com/documentation"><strong>https://node-api-by-nodebr.herokuapp.com/documentation</strong></a>
</p>

<p align="center">
    Istanbul.js test coverage report:
    <br/>
    <a href="https://node-api-by-nodebr.herokuapp.com/coverage/"><strong>https://node-api-by-nodebr.herokuapp.com/coverage/</strong></a>
</p>

<h1></h1>

## 🚀 About this project

This project was developed based on NodeBR course [*__Imersão em desenvolvimento de APIs com Node.js__*](https://erickwendel.teachable.com/p/node-js-para-iniciantes-nodebr), guided by [Erick Wendel](https://erickwendel.com/).  
The objective of this project was to study the concepts of Node.js for the development of REST APIs, together with the Hapi framwork. During the course, the concepts of Docker, TDD, Strategy Design Pattern, authentication/authorization with JWT token and Swagger API documentation were presented.

## 🧰 Tools

This project was developed with the following technologies:

* [Node.js](https://nodejs.org/)
* [Mocha](https://mochajs.org/)
* [Docker](https://www.docker.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [MongoDB](https://www.mongodb.com/)
* [Sequelize](https://sequelize.org/)
* [Mongoose](https://mongoosejs.com/)
* [Hapi](https://hapi.dev/)
* [Joi](https://hapi.dev/module/joi/)
* [Boom](https://hapi.dev/module/boom/)
* [Vision](https://hapi.dev/module/vision/)
* [Inert](https://hapi.dev/module/inert/)
* [Swagger](https://www.npmjs.com/package/hapi-swagger)
* [Hapi-Auth-Jwt2](https://www.npmjs.com/package/hapi-auth-jwt2)
* [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [Cross-env](https://www.npmjs.com/package/cross-env)
* [Heroku](https://www.heroku.com/)
* [PM2](https://pm2.keymetrics.io/)
* [Istanbul](https://istanbul.js.org/)

## 💻 Prerequisites

- **[Required]** [Node v14.2.0](https://nodejs.org/pt-br/download/releases/)
- **[Required]** [npm 6.14.4](https://www.npmjs.com/)
- **[Required]** [Docker v19+](https://www.docker.com/)

## 📦 Running

1. Clone the git project through the terminal:

```shell
git clone https://github.com/vitormbgoncalves/node-api-by-nodebr.git
cd node-api-by-nodebr
```

2. To install PostgreSQL in the docker run the command below:

```shell
sudo docker run \
    --name cursonodebr_postgres \
    -e POSTGRES_USER=vitor \
    -e POSTGRES_PASSWORD=minhasenhasecreta \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres
```

3. To install MongoDB in the docker run the command below:

```shell
sudo docker run \
    --name cursonodebr_mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=vitor \
    -e MONGO_INITDB_ROOT_PASSWORD=minhasenhasecreta \
    -d \
    mongo:4
```

4. To install all project dependencies run the command below:

```shell
npm install
```

5. Run the application with the command below:

```shell
npm run prod
```

6. Access the following URL through the browser:

`http://localhost:5000/documentation`

## 🗒 Quick note

This project was developed and runs on Linux.
