///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
// pull DATABASE_URL from .env
const { PORT = 3000, DATABASE_URL } = process.env;
const dumbData = require("./Data")
const bankUser = require("./Shem")
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
// mongoose.connect(DATABASE_URL, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// });
// Connection Events
mongoose.connect(`${DATABASE_URL}`)
.then(()=> {
    console.log('the connection to mongod is established')
  
})

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
  })

  ///////////////////////////////
// MODELS
////////////////////////////////
const UserSchema = new mongoose.Schema({
    Username: String,
    password: String,
    name: String,
    email: String,
    phonenumber: Number,
    loanOfficer: Boolean,
    loanPending: Boolean,
    creditScore: Number,
    checkingAccount: Number,
  });
  
  const User = mongoose.model("User", UserSchema);
  
  ///////////////////////////////
  // MiddleWare
  ////////////////////////////////
  app.use(cors()); // to prevent cors errors, open access to all origins
  app.use(morgan("dev")); // logging
  app.use(express.json()); // parse json bodies

  let cards = [];



  app.get('/',async (req, res) => {
    const found1 = await bankUser.find({})
    res.send('Hello World')
   
   
   })


   app.get('/seed', (req, res) => {
    bankUser.create(dumbData)
    res.send(dumbData)
   
   
   })


  app.post("/User", async (req, res) => {
    try {
      // send all people
      const newUser = (await bankUser.create(req.body));
      res.json(newUser);
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

  app.post('/log', async (req, res) => {
    const { username } = req.body;
    try {
        const user = await bankUser.findOne({ Username: username });
        if (user) {
            res.json({ success: true, id: user._id });
        } else {
            res.json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


  app.get("/all", async (req, res) => {
    try {
      // send all people
      res.json(await bankUser.find({}));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });


  app.get("/all/:id", async (req, res) => {
    try {
      // send all people
      res.json(await bankUser.find({}));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });




  app.put("/all/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await bankUser.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete("/all/:id", async (req, res) => {
  const { id } = req.params;
  try {
      const deletedUser = await bankUser.findByIdAndDelete(id);
      if (!deletedUser) {
          return res.status(404).json({ message: "User not found" });
      }
      res.json(deletedUser);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});