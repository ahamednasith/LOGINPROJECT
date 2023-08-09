import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from 'axios';


function Login(){
    const [values,setValues] = useState({
        phoneNumber:'',
        otp:''
    })
    const navigate = useNavigate();
    const [errors,setErrors] = useState({})
    const handleInput = (e) =>{
        setValues(prev =>({...prev,[e.target.name]:[e.target.values]}))
    }
    const handleSubmit=(e) => {
        e.preventDefault();
        setErrors(Validation(values))
        if(errors.phoneNumber === "" && errors.otp === ""){
            axios.post('http://localhost:6733/verify',values)
            .then(res =>{
                if(res.data==="OTP Has Verified"){
                    navigate('/home')
                }
                else{
                    alert("OTP Has Expired")
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
                    <input type='text' name="phoneNumber" placeholder='Enter Phone Number' onChange={handleInput} className='form-control rounded'/>
                    {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber}</span>}
                </div><br></br>
                <div className='form-group mb-3'>
                    <label htmlFor="otp"><strong>OTP:</strong></label>
                    <input type='text' name="otp" placeholder='Enter Your OTP' onChange={handleInput} className='form-control rounded'/>
                    {errors.otp && <span className="text-danger">{errors.otp}</span>}
                </div><br></br>
                <button type='submit' className='btn btn-primary rounded w-100'><b>Login</b></button>
                <br></br><br>
                </br>
                <Link to="/" className='btn btn-info border text-white rounded w-100 text-decoration-none'><b>Get OTP</b></Link>
             </form>
        </div>
    </div>
    )
}

export default  Login