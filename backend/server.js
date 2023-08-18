import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/userDB',{
    useNewUrlParser: true, 
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));



const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    secret: String,
});


const Register = new mongoose.model("Register" , userSchema);

app.get("/",function(req,res){
    res.render("home");
})

app.get("/register", function(req,res){
    res.render("register");
})

app.post("/register", async(req, res , next)=>{
    const {email , password} = req.body;
    if(!email && !password){
        return res.status(422).json({message: "Invalid Input"})
    }
    
    let emailExist , user;
    const hashedPassword = bcrypt.hashSync(password);
    try{
    emailExist = await Register.findOne({email});
    if (!emailExist) {
        user = new Register({email, password: hashedPassword});
        user = await user.save();
    }    
    }catch(err){
      return console.log(err);
    }
    if(!user){
      return res.status(500).json({message: "Email Already exists!"});
    }else{
      return res.status(200).json({message: "successfully registered" });
    }
});

app.get("/login", function(req,res){
    res.render("/login");
})


let existingUser , userID;
app.post("/login", async(req,res,next)=>{
    const {email , password} = req.body;
    if(!email && !password){
       return res.status(422).json({message: "Invalid Input"})
    }
    
    // let existingUser;
    try{
       existingUser = await Register.findOne({email});
    }catch(err){
       return console.log(err)
    }
    if(!existingUser){
       return res.status(404).json({message: "User Not Found"})
    }
    userID = existingUser._id;
    console.log(userID);
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect){
      return res.status(400).json({message: "Incorrect Password"})
    }
   return res.status(200).json({message: "login successful"});
})


app.get("/secret", async(req, res)=>{
   const foundUsers = await Register.find({}, "secret");
      if (foundUsers) {
        res.status(200).send({foundUsers});
      }else{
        res.status(301).send({message: "no user in the database"});
      }
    }
);

app.get("/submit", async(req, res)=>{
    res.render("/submit");
});

app.post("/submit", async(req, res)=>{
    const submittedSecret = req.body.secret;
    try {
      const foundUser = await Register.findOne({ _id: userID });
      if (foundUser) {
          foundUser.secret = submittedSecret;
          await foundUser.save();
          res.status(200).send({message: "secret value add Successfully"});
      } else {
          console.log("User not found.");
          res.status(404).send("User not found.");
      }
      console.log(foundUser);
  } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
  }
});

  
app.listen(port, function(){
    console.log(`server is up and running on port ${port}`);
})
