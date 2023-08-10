import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import { useRegisterMutation } from '../slices/usersApiSlice'
import { toast } from "react-toastify"
import { useSelector, useDispatch } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import Loader from '../components/Loader'
function RegisterScreen() {


    const [fomrData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })


    const { name, email, password, password2 } = fomrData
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const { userInfo } = useSelector((state) => state.auth)
    const [register, { isLoading }] = useRegisterMutation()


    useEffect(() => {
        if (userInfo) {
            navigate("/")
        }
    }, [navigate, userInfo])


    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== password2) {
            toast.error("Passwords does not match")
        } else {
            try {
                const res = await register({
                    name, email, password
                }).unwrap()
                dispatch(setCredentials({ ...res }))
                navigate("/")
            } catch (err) {
                toast.error(err?.data?.message)
            }
        }

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
            <form onSubmit={handleSubmit} className=' mb-12 form-control mx-auto max-w-lg p-2 border border-black rounded-m rounded-md bg-slate-500'>
                <h1 className='text-white font-bold ml-4 pt-5 text-2xl'>
                    Sign Up
                </h1>
                <div className='mb-4 mt-4'>
                    <div className='form-control'>
                        <label htmlFor="name" className='label'>
                            <span className=' label-text font-extralight text-lg'>Name</span>
                        </label>
                        <input
                            type="text"
                            id='name'
                            className='input input-bordered  border-black input-sm w-full placeholder:font-extralight text-black'
                            value={name}
                            onChange={handleChange}
                            placeholder='Enter your name'
                        />
                    </div>
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
                    <div className='form-control'>
                        <label htmlFor="password2" className='label'>
                            <span className=' label-text'>Passowrd</span>
                        </label>
                        <input
                            type="password"
                            id='password2'
                            className='input input-bordered border border-black input-sm w-full placeholder:font-extralight text-black'
                            value={password2}
                            onChange={handleChange}
                            placeholder='Confirmation password'
                        />
                    </div>
                    {isLoading && <Loader />}
                    <div className='flex justify-between items-center'>
                        <button className='btn btn-sm btn-outline mt-4'>
                            Register
                        </button>
                        <Link to="/auth">
                            <button className='btn btn-sm btn-info'>
                                Already Have An Account?
                            </button>
                        </Link>
                    </div>
                </div>

            </form>
        </motion.div>

    )
}

export default RegisterScreen