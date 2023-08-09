function Validation(values){
    let error ={}
    if(values.phoneNumber === ''){
        error.phoneNumber="Phone Number Should not emppty"
    }
    else{
        error.phoneNumber = ""
    }
    return error;
}
 
export default Validation