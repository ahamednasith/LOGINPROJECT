import React from "react";
import { Link } from "react-router-dom";


function Home() {
    return (
        <div className="d-flex bg-secondary justify-content-center align-items-center vh-100">
            <div className="bg-warning p-5 text-white rounded w-25 ">
                <h1 className="rounded text-dark ">OTP Verified Successfully</h1>
                <Link to="/signup" className='btn btn-info border text-white rounded w-100 text-decoration-none'><b>Get OTP</b></Link>
            </div>
        </div>
    )
}

export default Home