const jwt = require("jsonwebtoken");
const authorModel = require("../models/authorModel")



//.....................................................................create Author...............................................

const createAuthor = async function (req, res) {

  try {

    let data = req.body
    if (Object.keys(data).length === 0) return res.status(400).send({ msg: "Request body is requird" })
    if (!data.fname) return res.status(400).send({ msg: "fname is required" })
    if (!data.lname) return res.status(400).send({ msg: "lname is required" })
    if (!data.title) return res.status(400).send({ msg: "title enum ['Mr','Mrs','Miss'] is required" })
   if(data.title!="Mr"||"Mrs"||Miss) return res.status(400).send({status:false,msg:" enter only  ['Mr','Mrs','Miss'] as a title"})
  
   
    if (!data.email) return res.status(400).send({ msg: "email is required" })
    if (!data.password) return res.status(400).send({ msg: "password is required" })
     const isEmailAlreadyUsed =await authorModel.findOne({email:data.email})

    if(isEmailAlreadyUsed){
      res.status(400).send({status:false,message:`${data.email} email is already in use`})
    }
   
    let authorCreated = await authorModel.create(data)
    res.status(201).send({status:true,msg:"Author data created succesfully" ,data: authorCreated })
  
  } catch (err) {
    console.log("This is the error:", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }

}


// ...........................................................Login user............................................................

const loginAuthor = async function (req, res) {
  try {
    let userName = req.body.email;
    let password = req.body.password;
    if (!userName && !password) return res.status(400).send({ msg: "please enter username and password" })
    let author = await authorModel.findOne({ email: userName, password: password });

    if (!author)
      return res.status(400).send({
        status: false,
        msg: "username or the password is not corerct",
      })
    let token = jwt.sign(
      {
        authorId: author._id.toString(),
        batch: "radon",
        organisation: "FunctionUp",
      },
      "project-1"
    );
    res.setHeader("x-api-key", token);
    res.status(200).send({ status: true, token: token });
    console.log(token)
  } catch (err) {
    console.log("This is the error:", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }

}

module.exports = {createAuthor,loginAuthor}

