import express from "express";
import * as db from './database.js';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONT_END_URL
}));


// --- routes ---
app.get("/emails", async (req, res) => {
    const emails = await db.listEmails();
    res.json(emails);
});
app.post('/emails/new', async (req, res) => {
    // console.log('/emails/new', req.body);
    const { email, firstName, lastName } = req.body;
    res.json(await db.createEmail(email, firstName, lastName));
});
app.post('/emails/edit', async (req, res) => {
    // console.log('/emails/edit', req.body);
    const { id, email, firstName, lastName } = req.body;
    res.json(await db.updateEmail(id, email, firstName, lastName));
});
app.post('/emails/delete', async (req, res) => {
    // console.log('/emails/delete', req.body);
    res.json(await db.deleteEmail(req.body.id));
});


// error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error!');
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});