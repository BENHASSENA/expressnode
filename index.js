require ('dotenv/config');
const express =require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.POST || 3001;

const mongoose = require('mongoose');

const postsRoute = require('./routes/posts');

app.use("/api/v1/posts/",postsRoute);

app.use(cors());




app.get('/',(req,res)=>{
    res.send('<h1>Hello</h1>');
})



// Pour se connecter à Mongoose
mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log('Connected to MongoDB')

)


app.listen(PORT,()=>{
    console.log(`Listening at http://localhost:${PORT}`);
})

