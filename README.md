## Property Management System

### Overview
<p>
An application design and develop to help property owners and maintenance personnel manage the day-to-day operations of their properties.
</p>

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
git clone https://github.com/almertampus/Property-Management-System.git
cd Property-Management-System
npm install
```
- Create a folder named 'config' inside the src directory. Then, create a file named 'dev.env'.
```
Property-Management-System
└───src
    └───config
        │   dev.env
```
- Paste this code inside the 'dev.env' file:
```
PORT=3000
REDIS_PORT=6380
MONGODB_URL=mongodb://localhost:27017/pms
JWT_SECRET=wjSAxckLggsSPEqtxUBOzIMaxVYTSKhYeQvkWqWzKFJYtWpUmp
```
```
Note:
You can change the value of the PORT, JWT_SECRET and SESSION_SECRET.
```
- Run the application in the terminal.
```
npm run dev
```
```
Note:
Make sure you're inside the project directory.
```
### Database
- Create a folder that will be used to store your database.
```
For example, you created the folder in ~/Documents, and named it 'mongodb-data'.

~/Documents/mongodb-data
```
- Run 'mongod' in the terminal.
```
mongod --dbpath ~/Documents/mongodb-data
```
Finally, you can now view and use the application by going to:
```
localhost:3000
```
```
Note:
If everything is working correctly, you can view the following message in the terminal:

The server is up on port 3000.
A connection to the database has been established!
```
### Redis
Run 'redis-server' in the terminal:
```
redis-server --port 6380
```
