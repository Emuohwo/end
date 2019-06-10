const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const users = [
    {
        id: 1,
        firstname: "John",
        lastname: "Doe",
        othername: "Smith",
        email: "johndoes@gmail.com",
        password: "good123S",
        phoneNumber: +2348075583461,
        passportUrl: "high.jpg",
        role: "admin"
    },
    {
        id: 2,
        firstname: "Joe",
        lastname: "Mark",
        othername: "Smart",
        email: "johnmarks@gmail.com",
        password: "good123S",
        phoneNumber: +2348066620298,
        passportUrl: "hightree.jpg",
        role: "user"
    }
]

app.use('/assets', express.static(__dirname + '/UI/assets'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', (req, res, next) => {
    next();
});

app.get('/api/v1/users', (req, res) => {
    res.send([users]);
});

app.post('/api/v1/users', (req, res) => {
    const user = {
        id: users.length + 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        othername: req.body.othername,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        passportUrl: req.body.passportUrl,
        role: req.body.role
    }
    users.push(user);
    res.send(users)
});

app.put('/api/v1/users/:id', (req, res) => {
    // Look for the user
    // If user not found, return 404
   const user = users.find(u => u.id === parseInt(req.params.id));
   if(!user) return res.status(404).send('The user with the ID:' + req.params.id + ' was not found');
    // Add return before the res.send for the code before to work if otherwise
//    const user = users.find(u => u.id === parseInt(req.params.id));
//    if(!user) res.status(404).send('The user with the ID:' + req.params.id + ' was not found');

    // Validate
    // If invalid, return 400 - Bad request

    // Update User
    // Return updted user
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.othername = req.body.othername;
    user.email = req.body.email;
    user.password = req.body.password;
    user.phoneNumber = req.body.phoneNumber;
    user.passportUrl = req.body.passportUrl;
    user.role = req.body.role;
    res.send(user);
});

app.delete('/api/v1/users/:id', (req, res) => {
    // look for user
    // if not found, return 404
   const user = users.find(u => u.id === parseInt(req.params.id));
   if(!user) return res.status(404).send('The user with the ID: was not found');


    // delete
    const index = users.indexOf(user);
    users.splice(index, 1);

    // Reurn the same course
    res.send(users);
});

// Find a user by id
app.get('/api/v1/users/:id', (req, res) => {
   const user = users.find(u => u.id === parseInt(req.params.id));
   if(!user) return res.status(404).send('The user with the ID:' + req.params.id + ' was not found');
   res.send(user);
});



app.get('/', (req, res) => {
    // return res.status(200).send({'message': 'Congratulation, Your first endpoint is working'});
    res.sendFile(__dirname + '/UI/Index.html');
});


app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/UI/signup.html');
});

app.post('/register', (req, res) => {
    res.sendFile(__dirname + '/UI/signup.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/UI/signin.html');
});







app.listen(port, () => `Listening on port ${port}`);

