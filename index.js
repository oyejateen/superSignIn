const express = require('express');
const fs = require('fs');
const app = express();
const port = 0000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
 res.sendFile(__dirname + '/views/index.html');
});

app.post('/login', async (req, res) => {
 // Handle login credentials
 console.log(req.body);
 const username = req.body.username;
 const password = req.body.password;
 console.log(username, password);

 // Load user credentials from JSON file
 let userCredentials;
 try {
    userCredentials = JSON.parse(await fs.promises.readFile('credentials.json'));
 } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error');
 }

 // Authenticate user
 if (userCredentials.username === username && userCredentials.password === password) {
    res.status(200).send("OK!! User has been logged in.");
 } else {
    res.status(404).send('Invalid username or password');
 }
});

app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});