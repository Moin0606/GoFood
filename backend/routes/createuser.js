const express=require("express")
const User=require('../models/User')
const router=express.Router()
const {body,validationResult}=require('express-validator');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const jwtSecret="IAmBatman";




router.post("/createuser",
[body('email').isEmail(),
body('name').isLength({ min: 3 }),
body('password','min length should be more than 5').isLength({ min: 5 })]
,async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt=await bcrypt.genSalt(10);
    const secPAss=await bcrypt.hash(req.body.password,salt);
    try{

        await User.create({
            name: req.body.name,
            email : req.body.email,
            password: secPAss,
            location: req.body.location,
        })
        res.json({success:true})
    }catch(err){
        console.log(err);
        res.json({success:false});

    }
})


router.post("/loginuser", 
[body('email').isEmail(),
body('password','min length should be more than 5').isLength({ min: 5 })]
,async (req,res)=>{ 
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    let email=req.body.email;
    let password=req.body.passwprd;
    try{
       let userdata= await User.findOne({email});
       if(!userdata){
        return res.status(400).json({ errors: "Try loging in with correct credentials" });
       }

       const pwdCompare=await bcrypt.compare(req.body.password,userdata.password);

       if(!pwdCompare)
       {
        return res.status(400).json({ errors: "Try loging in with correct credentials" });
       }

       const data={
        user:{
            id:userdata.id
        }
       }
       const authToken=jwt.sign(data,jwtSecret)
       return res.json({ success: "True",authToken:authToken });
       
    }catch(error)
    {
        console.log(error)
    }

})
module.exports=router;