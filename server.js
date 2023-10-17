const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();
const jwt =require("jsonwebtoken");


const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
      cb(null,"uploads");
    },
    filename:(req, file, cb)=> {
    console.log(file)
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  })
  
  const upload = multer({ storage: storage });
let app = express();
app.use(cors());
app.use('/uploads',express.static("uploads"));

 let connectToMDB = async ()=>{
    try{  
        await mongoose.connect(process.env.dbpath)
   console.log("connected successfully");
}catch(error){
    console.log("something went wrong");
}}
let userSchema = new mongoose.Schema({

    firstName:String,
    lastName:String,
    email:String,
    password:String,
    profilePic:String,
   
    
});


let User =  new mongoose.model("user",userSchema);

app.post("/validateLogin",upload.none(), async(req,res)=>{

    console.log(req.body);

    let userDetails = await User.find().and
    ({email:req.body.email});

        console.log(userDetails);

        if(userDetails.length == 0){
            res.json({ status:"failure",msg:"User doesnot exist."});
        }else{

            if(userDetails[0].password == req.body.password){

        let encryptedCredentials = jwt.sign({email:userDetails[0].email,password:userDetails[0].password},
            "sandeep");

            console.log(encryptedCredentials);

                console.log(userDetails[0]);
                res.json({status:"success",msg:"Valid Credentials",
                token:encryptedCredentials,
            data:userDetails[0],
            });
            } else{
                res.json({ status:"failure",msg:"Incorrect password."});
            }
        }

     
});

app.post("/validateToken",upload.none(),async(req,res)=>{
    console.log(req.body.token);

    try{

        let decryptedCredentials  = jwt.verify(req.body.token,"sandeep");

        let userDetails = await User.find().and({email:decryptedCredentials})
       
        if(userDetails[0].password == decryptedCredentials.password){
       
       
           res.json({status:"success",msg:"Valid Credentials",
           data:userDetails[0],
       });
        } else{
              res.json({status:"failure",msg:"Invalid Token"
                      
                   });
        }
        
    }catch(err){

        res.json({
            status:"failure",
            msg:"Invalid Token",
        });
    }



});


app.post("/signup",upload.single("profilePic"),async (req,res)=>{

    console.log("we have received the requst from client");
    console.log(req.file);
    console.log(req.body);

   let userDetails = await User.find().and
   ({email:req.body.email});

   if(userDetails.length > 0){
    res.json({ status:"failure",msg:"user already exists"})
 }else{


    try{
        let newUser =  new User({
            firstName:req.body.fn,
            lastName:req.body.ln,
            email:req.body.email,
            password:req.body.password,
            profilePic:req.file.path,
           
        });
    
      await User.insertMany([newUser]);
        res.json({status:"sucess",msg:"User created Successfully"});


    }catch(error){
        res.json({status:"failure",msg:"user can't post data"})
    }

}
});

 app.patch("/updateDetails",upload.single("profilePic"),async(req,res)=>{
    console.log(req.body);
    console.log(req.file.path)
     await User.updateMany({email:req.body.email},
    {
    firstName:req.body.fn,
    lastName:req.body.ln,
    password:req.body.password,
    profilePic:req.file.path,
}
);
    
res.json(["collected updated data"]);
});

app.delete("/deleteUser",upload.none(),async(req,res)=>{

    try{
        let deleteUser = await User.deleteMany({ email:req.body.email})
       res.json({status:"success",
       msg:"Deleted user successfully"
    })
    }catch(err){
        res.json(err);
    }

   

});

app.listen(process.env.port,()=>{
    console.log("Listening to port 2345")
});



connectToMDB();