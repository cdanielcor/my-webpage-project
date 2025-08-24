const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' directory

const COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.get('/comments', (req, res) => {
    fs.readFile(COMMENTS_FILE, 'utf8', (err, data) => {
        if (err) return res.json([]);
        res.json(JSON.parse(data));
    });
});

app.post('/comments', (req, res) => {
    const { name, text } = req.body;
    if (!text) return res.status(400).json({ error: 'Missing comment' });

    fs.readFile(COMMENTS_FILE, 'utf8', (err, data) => {
        let comments = [];
        if (!err) comments = JSON.parse(data);
        comments.push({ text, date: new Date().toISOString() });
        fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 2), err => {
            if (err) return res.status(500).json({ error: 'Error when saving' });
            res.json({ success: true });
        });
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));