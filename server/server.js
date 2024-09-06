const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5500', // replace with your frontend origin
    methods: 'GET,POST', // specify the methods you want to allow
    allowedHeaders: 'Content-Type',
}));

// Configure MySQL connection
const db = mysql.createConnection({
    host: 'mynetflixdb.cl6yoysgsljc.us-east-1.rds.amazonaws.com',
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
app.post('/newpage.html', async (req, res) => {
    console.log('Request received:', req.body);
    const { Username, Password } = req.body;
    const hashedPassword = await bcrypt.hash(Password, 10);

    const query = 'INSERT INTO users (Username, Password) VALUES (?, ?)';
    db.query(query, [Username, hashedPassword], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).send('Error signing in');
            return;
        }
        console.log('Data inserted successfully:', result);
        res.send('User signed in successfully');
    });
});

// Endpoint to handle login
app.post('/', (req, res) => {
    console.log('Request received:', req.body);
    const { Username, Password } = req.body;

    const query = 'SELECT Password FROM users WHERE Username = ?';
    db.query(query, [Username], async (err, results) => {
        if (err || results.length === 0) {
            res.status(401).send('Invalid username or password');
            return;
        }

        const hashedPassword = results[0].Password;
        const isMatch = await bcrypt.compare(Password, hashedPassword);

        if (isMatch) {
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid username or password');
        }
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
});
