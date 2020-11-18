## [Property Management System](https://github.com/guyfrommilkyway/Property-Management-System)

<p>
An application design and develop to help property owners and maintenance personnel manage the day-to-day operations of their properties.
<br><br>
This project was a partial fulfillment for the requirements of BSCOE-ELEC2 - Database Management System.
</p>

---

### Web Technologies

- HTML5
- CSS3
- JavaScript
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Handlebars.js](https://handlebarsjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Material Design for Bootstrap](https://mdbootstrap.com/)
- Icons from [Material Design](https://material.io/resources/icons/?style=baseline)

### Installation

- Download and install [Node.js](https://nodejs.org/en/download/), [MongoDB Community Server](https://www.mongodb.com/try/download/community) and [Redis](https://redis.io/download).

### Application

- Clone this repository and install the dependencies:

```bash
$ git clone https://github.com/almertampus/Property-Management-System.git
$ cd Property-Management-System
$ npm install
```

- Create a folder named 'config' inside the src directory. Then, create a file named 'config.env'.

```
Property-Management-System
└───src
    └───config
        │   config.env
```

- Paste this code inside the 'config.env' file:

```
PORT=<your port>
REDIS_HOST=127.0.0.1
REDIS_PORT=<your redis port>
MONGODB_URL=mongodb://localhost:27017/<your database name>
JWT_SECRET=<some random strings>
```

```
Example:

PORT=3000
REDIS_HOST=127.0.0.1
REDIS_PORT=6380
MONGODB_URL=mongodb://localhost:27017/property-management-system
JWT_SECRET=WCiYjAMZBZyAjccYMgEZCeWAqR
```

- To run the application in the terminal.

```
$ npm run dev
```

```
Note:

You have to run mongodb and redis first before running the application.
Otherwise, it will show an error message.

```

- Finally, you can use the application by going to:

```
localhost:<your port>
```

```
Example:

localhost:3000
```

### Database

- Create a folder that will be used to store your database.
- To run mongoDB in the terminal.

```
mongod --dbpath <your database folder path>
```

```
Example:

mongod --dbpath ~/Documents/mongodb-data
```

### Redis

- To run redis-server in the terminal:

```
redis-server --port <your port>
```

```
Example:

redis-server --port 6380
```
