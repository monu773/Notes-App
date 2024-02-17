require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const userRouter = require('./routes/userRouter');
const noteRouter = require('./routes/noteRouter');

// 
const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/api/notes', noteRouter);

// 
const URI = process.env.MONGODB_URL || 5000;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
},err => {
    if(err) throw err;
    console.log(`Connected to mongoDB`);
});

// 

if(process.env.NODE_ENV == 'production'){
  app.use(express.static('client/build'))
  app.use('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sever running on port ${PORT}`)
})
