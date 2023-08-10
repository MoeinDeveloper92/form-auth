import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import Loader from '../components/Loader'
import { useUpdateMutation } from '../slices/usersApiSlice'

function ProfileScreen() {
    const [fomrData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [update, { isLoading }] = useUpdateMutation()

    const { name, email, password } = fomrData
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const { userInfo } = useSelector((state) => state.auth)
    //when we come to this page we want to set info in theinpur
    useEffect(() => {
        setFormData((preState) => ({
            ...preState,
            name: userInfo.name,
            email: userInfo.email,
        }))
    }, [])


    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await update({ name, email, password }).unwrap()
            dispatch(setCredentials({ ...res }))
            toast.success("Profile updated")
        } catch (err) {
            toast.error(err?.data?.message || err.error)
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
                    {userInfo.name} Profile
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
                    {isLoading && <Loader />}
                    <div className='flex justify-between items-center'>
                        <button className='btn btn-sm btn-outline mt-4'>
                            Update information
                        </button>

                    </div>
                </div>

            </form>
        </motion.div>

    )
}

export default ProfileScreen