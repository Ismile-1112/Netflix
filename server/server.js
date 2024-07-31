const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure MySQL connection
const db = mysql.createConnection({
    host: 'netflixdb.cl6yoysgsljc.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'MyDatabasePassword',
    database: 'netflix'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Endpoint to handle sign-in
app.post('/sign-in', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, result) => {
        if (err) {
            res.status(500).send('Error signing in');
            return;
        }
        res.send('User signed in successfully');
    });
});

// Endpoint to handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT password FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
        if (err || results.length === 0) {
            res.status(401).send('Invalid username or password');
            return;
        }

        const hashedPassword = results[0].password;
        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (isMatch) {
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid username or password');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
