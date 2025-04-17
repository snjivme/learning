const express=require('express');
const app=express();
const PORT =3000;
app.use(express.json()); 
app.get('/', (req, res) => {              // define a route for GET requests to the root URL
    res.send('Backend are working normally!');        // send a response
  });

  app.listen(PORT, () => {                  // start the server
    console.log(`Server running on http://localhost:${PORT}`);  // log message once server starts
  });




// MySQL Connection Setup:

const mysql=require('mysql2');

const db=mysql.createConnection({
      host:'localhost',
      user:'snjivme',
      password:'snjivme',
      database:'dashboard_db'
  
  
  });

db.connect((err)=>{
    if(err){
        console.error('DB connection failed:', err);
    }
    else{
        console.log('Connected to MySQL');
    }

});

// Fetch Data from MySQL (GET API)

app.get('/people',(req,res)=>{
    db.query('SELECT * FROM people',(err,results)=>{
        if (err) {
            res.status(500).send('Database query error');   // send error response
          }
        else{
            res.json(results);
        }

    });

});


// POST /people – Add a New Person

app.post('/people',(req,res)=>{

    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }
      const sql = 'INSERT INTO people (name) VALUES (?)';
    
      db.query(sql,[name],(err,result)=>{
        if (err) {
            return res.status(500).json({ error: 'Database insert error' });
          }
          else{
            res.status(201).json({ message: 'Person added!', id: result.insertId });
          }
      });

});