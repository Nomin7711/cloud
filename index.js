const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'database-2.cliaswawm0sv.us-east-1.rds.amazonaws.com', // e.g., 'mydbinstance.cluster-cmp9v9yzr5xy.us-east-1.rds.amazonaws.com'
  user: 'admin',
  password: 'Test123.',
  database: 'student_db'
});
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
  } else {
    console.log('Connected to the database');
  }
});



app.get('/health', async (req, res) => {
  res.send("I am OK.");
});

app.get('/students', async (req, res) => {
  try {
    const db = client.db('student_db');
    const collection = db.collection('students');
    const students = await collection.find({}).toArray();
    res.send(students);
  } catch (err) {
    res.status(500).send('Error fetching students data');
  }
});


const port = 5000;
app.listen(port, () => console.log(`Listening on ${port}`));