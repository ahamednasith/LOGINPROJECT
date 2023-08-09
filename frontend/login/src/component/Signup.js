import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation'
import axios from 'axios';



function Signup() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate();
    const [errors,setErrors] = useState({})

    const handleSubmit=(e) => {
        e.preventDefault();
        setErrors(Validation(phoneNumber));
        if(errors.phoneNumber === ""){
            axios.post('http://localhost:6733/signup',{phoneNumber:phoneNumber})
            .then(res =>{
                navigate('/login');
            })
        }
    }
    return(
        <div className='d-flex  justify-content-center align-items-center bg-success vh-100'>
            <div className='bg-dark p-5 text-white rounded w-25 '>
                <h1>Sign Up</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className='form-group mb-3'>
                        <label htmlFor="phoneNumber"><strong>Phone Number:</strong></label>
                        <input type='text'  name="phoneNumber" placeholder='Enter Phone Number' 
                        onChange={(e)=>{setPhoneNumber(e.target.value)}} className='form-control rounded'/>
                        <br></br>
                        {errors.phoneNumber && <span className='text-danger'>{errors.phoneNumber}</span>}
                    </div><br></br>
                    <button type='submit' className='btn btn-primary rounded w-100'><b>Send OTP</b></button>
                    <br></br><br>
                    </br>
                    <Link to="/login" className='btn btn-info border text-white rounded w-100 text-decoration-none'><b>Login</b></Link>
                 </form>
            </div>
        </div>
    )
}

export default Signup