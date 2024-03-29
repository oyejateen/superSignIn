const express = require('express');
const fs = require('fs');
const app = express();
const port = 0000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
 res.sendFile(__dirname + '/views/index.html');
});

app.get('/signup', (req, res) => {
 res.sendFile(__dirname + '/views/signup.html');
});

app.post('/signup', async (req, res) => {
 const username = req.body.username; 
 const password = req.body.password; 
 console.log(username, password);

 // Add new user to JSON file
 const userCredentials = { username, password };
 console.log(userCredentials);


      // Write the updated array back to the JSON file
      await fs.promises.writeFile('credentials.json', JSON.stringify(userCredentails));

      // Return a success message
      res.status(200).send("OK!! User has been created.");
    
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