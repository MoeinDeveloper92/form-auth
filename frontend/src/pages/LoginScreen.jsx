import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
function LoginScreen() {
    const [fomrData, setFormData] = useState({

        email: "",
        password: "",

    })
    const { email, password } = fomrData


    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <motion.div
            initial={{
                x: "-100%"
            }}
            animate={{
                x: "0"
            }}
        >
            <form onSubmit={handleSubmit} className=' form-control mx-auto max-w-lg p-2 border border-black rounded-m rounded-md bg-slate-500'>
                <h1 className='text-white font-bold ml-4 pt-5 text-2xl'>
                    Register
                </h1>
                <div className='mb-4 mt-4'>

                    <div className='form-control'>
                        <label htmlFor="email" className='label'>
                            <span className=' label-text'>Email</span>
                        </label>
                        <input
                            type="email"
                            id='email'
                            className='border-black input-sm w-full placeholder:font-extralight text-black input input-bordered border '
                            value={email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="password" className='label'>
                            <span className=' label-text'>Password</span>
                        </label>
                        <input
                            type="password"
                            id='password'
                            className=' input input-bordered border border-black input-sm w-full placeholder:font-extralight text-black'
                            value={password}
                            onChange={handleChange}
                            placeholder='Enter your password'
                        />
                    </div>

                    <div className='flex justify-between items-center'>
                        <button className='btn btn-sm btn-outline mt-4'>
                            Login
                        </button>
                        <Link to="/register">
                            <button className='btn btn-sm btn-info'>
                                Do not have ann account?
                            </button>
                        </Link>
                    </div>
                </div>

            </form>
        </motion.div>

    )
}

export default LoginScreen