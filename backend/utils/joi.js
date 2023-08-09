const Joi = require('joi');

const schema = Joi.object({
    userId:Joi.number().min(10000000).max(99999999),
    phoneNumber:Joi.number().min(1000000000).max(9999999999),
    otp:Joi.number().min(100000).max(999999),
    name:Joi.string().min(2).max(40),
    age:Joi.number().min(15).max(70),
    email:Joi.string().email({minDomainSegments:1,tlds:['com']}).regex(/pepul\.com/),
})

const contactValidate = (req,res,next) => {
    const phoneNumber = req.body.phoneNumber;
    const otp = Math.floor(100000 + Math.random() * 900000);
    const {error} = schema.validate({phoneNumber,otp});
    if(error){
        return res.status(401).json({statuscode:401,error:error.message});
    }
    next();
}

const userValidate = (req,res,next) => {
    const userId =  Math.floor(10000000 + Math.random() * 90000000);
    const phoneNumber = req.body.number;
    const name = req.nody.name;
    const age = req.body.age;
    const email = req.body.email;
    const {error} = schema.validate({userId,phoneNumber,name,age,email});
    if(error){
        return res.status(401).json({statuscode:401,error:error.message});
    }
    next();
}

module.exports = {contactValidate,userValidate};