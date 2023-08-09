const db = require('../models/index');
const { Sequelize,Op } = require('sequelize');
const dateTime = require('date-and-time');
const {encrypt,decrypt,generateToken} = require('../utils/cryptAndJwt');
const Contact = db.contact;
const User = db.user;

const signUp = async  (req,res) => {
    const phoneNumber = encrypt(String(req.body.phoneNumber));
    const otp = Math.floor(100000 + Math.random() * 900000);
    const currentTime = new Date();
    const count = await Contact.count({
        where:{
            phoneNumber,
            createdAt:{
                [Op.gte]:new Date(currentTime.getTime() - 5 * 60000)
            }
        }
    });
    if(count >= 5){
        return res.status(422).json({statuscode:422,message:"OTP Limit Has Reached.Try Again After 5 Minutes"});
    } else {
        const createdAt = new Date(currentTime.getTime());
        const expiredAt = new Date(currentTime.getTime() + 5 * 60000);
        const contact = await Contact.create({
            phoneNumber,otp,createdAt,expiredAt
        });
        return res.status(200).json({statuscode:200,message:"OTP Generated"});
    }
};

const verify = async (req,res) => {
    const phoneNumber = encrypt(String(req.body.phoneNumber));
    const otp = req.body.otp;
    const currentTime = new Date();
    const contact = await Contact.findOne({
        where:{
            phoneNumber,
            otp,
            expiredAt:{
                [Op.gt]:currentTime
            }
        }
    });
    console.log(contact)
    if(!contact || currentTime > contact.expiredAt){
        return res.status(422).json({statuscode:422,message:"OTP Has Expired"});
    }
    return res.status(200).json({statuscode:200,message:"OTP Has Verified"})
}

module.exports = {signUp,verify};