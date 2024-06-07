const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.post('/login', (req, res) => {
    const username = req.body.uname;
    const password = req.body.psw;
    const email = req.body.email;

    const data = `username: ${username}; password: ${password}; email: ${email}`;

    fs.readFile('dati.txt', 'utf8', (err, fileData) => {
        if (err) throw err;
        const fileDataArray = fileData.split('\n');
        let accessGranted = false;
        for (let i = 0; i < fileDataArray.length; i++) {
            if (fileDataArray[i].trim() === data) {
                accessGranted = true;
                break; 
            }
        }
        if (accessGranted) {
            res.send("<html> <body> <script>alert('Accesso consentito!');window.location.href = '/game.html';</script></body></html>");
        } else {
            res.send("<html> <body> <script>alert('Accesso negato!');window.location.href = '/login.html';</script></body></html>");
        }
    });
});


app.post('/register', (req, res) => {
    const username = req.body.uname;
    const password = req.body.psw;
    const email = req.body.email;

    const data = `username: ${username}; password: ${password}; email: ${email}`;

    fs.readFile('dati.txt', 'utf8', (err, fileData) => {
        if (err) throw err;
        const fileDataArray = fileData.split('\n');
        let accountExists = false;
        for (let i = 0; i < fileDataArray.length; i++) {
            if (fileDataArray[i].trim() === data) {
                accountExists = true;
                break;
            }
        }
        if (accountExists) {
            res.send(`
                <html>
                <head>
                <style>
                    body{
                        background-image: url('sfondo.png');
                        background-size: cover;
                    }
                </style>
                </head>
                <body>
                    <script>
                        alert('Questo account esiste già!');
                        window.location.href = '/register.html';
                    </script>
                </body>
                </html>
            `);
        } else {
            fs.appendFile('dati.txt', data + '\n', (err) => {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            });
            res.send(`
                <html>
                <head>
                <style>
                    body{
                        background-image: url('sfondo.png');
                        background-size: cover;
                    }
                </style>
                </head>
                <body>
                    <script>
                        alert('Registrazione completata con successo!');
                        window.location.href = '/login.html';
                    </script>
                </body>
                </html>
            `);
        }
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
