const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/accounts', async (req, res) => {
    try {
        const accounts = await db.select('*').from('accounts');
        res.json(accounts);
    } catch(err) {
        next(err)
    }
})

server.get('/accounts/:id', async (req, res) => {
    try {
        const account = await await db.select('*').from('accounts').where('id', req.params.id);
        res.json(account);
    } catch(err) {
        next(err)
    }
})

server.post('/accounts', async (req, res) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }

        const [id] = await db('accounts').insert(payload);
        const message = await db('accounts').where('id', id)

        res.json(message);
    } catch(err) {
        next(err)
    }
})

server.put('/accounts/:id', async (req, res) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }

        await db('accounts').where('id', req.params.id).update(payload)
        const message = await db('accounts').where('id', req.params.id)
        res.json(message)

    } catch(err) {
        next(err)
    }
})

server.delete('/accounts/:id', async (req, res) => {
    try {
        await db('accounts').where('id', req.params.id).del()
        res.status(204).end()
    } catch(err) {
        next(err)
    }
})


module.exports = server;
