import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from 'axios';


function Login(){
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const [errors,setErrors] = useState({})
    const handleSubmit=(e) => {
        e.preventDefault();
        setErrors(Validation(phoneNumber,otp));
        if(errors.phoneNumber === "" && errors.otp === ""){
            axios.post('http://localhost:6733/verify',{
                phoneNumber:phoneNumber,
                otp:otp
            })
            .then((res) =>{
                if(res.data){
                    navigate('/home');
                }
                else{
                    alert("OTP Has expired")
                }
            })
            .catch(err=>console.log(err));
        }
    }

    return(
    <div className='d-flex  justify-content-center align-items-center bg-success vh-100'>
        <div className='bg-dark p-5 text-white rounded w-25 '>
            <h1>Login</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className='form-group mb-3'>
                    <label htmlFor="phoneNumber"><strong>Phone Number:</strong></label>
                    <input type='text' name="phoneNumber" placeholder='Enter Phone Number' onChange={(e)=> setPhoneNumber(e.target.value)} className='form-control rounded'/>
                    <br></br>
                    {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber}</span>}
                </div><br></br>
                <div className='form-group mb-3'>
                    <label htmlFor="otp"><strong>OTP:</strong></label>
                    <input type='text' name="otp" placeholder='Enter Your OTP' onChange={(e)=> setOtp(e.target.value)} className='form-control rounded'/>
                    <br></br>
                    {errors.otp && <span className="text-danger">{errors.otp}</span>}
                </div><br></br>
                <button type='submit' className='btn btn-primary rounded w-100'><b>Login</b></button>
                <br></br><br></br>
                <Link to="/signup" className='btn btn-info border text-white rounded w-100 text-decoration-none'><b>Get OTP</b></Link>
             </form>
        </div>
    </div>
    )
}

export default  Login