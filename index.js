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