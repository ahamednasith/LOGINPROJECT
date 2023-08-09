function Validation(values){
    let error ={}
    if(values.phoneNumber === ''){
        error.phoneNumber="Phone Number Should not emppty"
    }
    else{
        error.phoneNumber = ""
    }

    if(values.otp === ''){
        error.otp="OTP Should not emppty"
    }
    else{
        error.otp = ""
    }
    return error;
}
 
export default Validation