const keys = require('./keys');

//Express app setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());

//Postgres client setup

const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});

pgClient.on("connect", (client) => {
    client
        .query("CREATE TABLE IF NOT EXISTS values (number INT)")
        .catch((err) => console.error(err));
});

//Redis client setup

const redis = require('redis');
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

//Express route handel
app.get('/', (req, res) => {
    res.send('HI');
});
// ------> send all the indices store in postgress database
app.get('/values/all', async (req, res) => {
    const values = await pgClient.query('SELECT * from values');
    res.send(values.rows);
});

// ------> To get values from Redis
app.get('/volumes/current', async (req, res) => {
    redisClient.hgetall('values', (err, values) => {
        res.send(values);
    });
});

//For getting new values from route handler

app.post('/values', async (req, res) => {
    const index = req.body.index;
    if (parseInt(index) > 40) {
        return res.status(422).send('Index To High');
    }

    redisClient.hset('values', index, 'Nothing Yet!');
    redisPublisher.publish('insert', index);
    pgClient.query('INSERT INTO VALUES (number) VALUES($1)', [index]);
    res.send({ working: true });
});

//port connection check
app.listen(5000, err => {
    console.log('Listening');
});



