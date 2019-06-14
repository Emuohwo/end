// server.js
import express from 'express';
import Party from './src/controllers/Party.js'
import User from './src/controllers/User';
import Office from './src/controllers/Office';
import Candidate from './src/controllers/Candidate';
import Vote from './src/controllers/Vote';


const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    return res.status(200).send({'message': 'Congratulation! Endpoint is working!'})
})

app.post('/api/v1/parties', Party.create);
app.get('/api/v1/parties', Party.getAll);
app.get('/api/v1/parties/:id', Party.getOne);
app.put('/api/v1/parties/:id', Party.update);
app.delete('/api/v1/parties/:id', Party.delete);



app.post('/api/v1/users', User.create);
app.get('/api/v1/users', User.getAll);
app.get('/api/v1/users/:id', User.getOne);
app.put('/api/v1/users/:id', User.update);
app.delete('/api/v1/users/:id', User.delete);


app.post('/api/v1/offices', Office.create);
app.get('/api/v1/offices', Office.getAll);
app.get('/api/v1/offices/:id', Office.getOne);
app.put('/api/v1/offices/:id', Office.update);
app.delete('/api/v1/offices/:id', Office.delete);


app.post('/api/v1/candidates', Candidate.create);
app.get('/api/v1/candidates', Candidate.getAll);
app.get('/api/v1/candidates/:id', Candidate.getOne);
app.put('/api/v1/candidates/:id', Candidate.update);
app.delete('/api/v1/candidates/:id', Candidate.delete);

app.post('/api/v1/votes', Vote.create);
app.get('/api/v1/votes', Vote.getAll);
app.get('/api/v1/votes/:id', Vote.getOne);
app.put('/api/v1/votes/:id', Vote.update);
app.delete('/api/v1/votes/:id', Vote.delete);

app.listen(3000)
console.log('app listening on port ', 3000);