import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa"
import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import { FaArrowDown } from "react-icons/fa"
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { toast } from 'react-toastify'

function Header() {
    const { userInfo } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [logoutApiCall] = useLogoutMutation()
    const dispatch = useDispatch()

    const logoutHandler = async () => {
        try {
            //it will make the request to destory the cookie
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate("/")

        } catch (err) {
            toast.error(err.data.message)
        }
    }
    return (
        <motion.div>
            <div className='container  mx-auto bg-gray-200 '>
                <div className='navbar border-b border-black  bg-gray-200 '>
                    <div className='flex-none'>
                        <Link className='btn btn-success btn-sm' to={"/"}>
                            MERN Auth
                        </Link>
                    </div>


                    <div className='flex flex-1 justify-end items-center space-x-3'>

                        {userInfo ? (<>
                            <>
                                <div className='dropdown dropdown-end rounded-md'>
                                    <label tabIndex={0} className='btn btn-sm btn-outline mb-1 rounded-e-sm' >
                                        <span>{userInfo.name}</span>
                                        <FaArrowDown />
                                    </label>
                                    <ul className='dropdown-content z-[1] menu p-2 shadow bg-base-200 w-52 space-y-3 rounded-md'>
                                        <li>
                                            <Link to={"/profile"}>
                                                Profile
                                            </Link>
                                        </li>
                                        <li onClick={logoutHandler}>
                                            <Link to={"/logout"} >
                                                Logout
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        </>) : (<>
                            <Link to="/auth">
                                <button className='btn shadow-lg btn-sm btn-outline'>
                                    <FaSignInAlt />Signin
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className='btn shadow-lg  btn-sm btn-outline'>
                                    <FaSignOutAlt />SignUp
                                </button>
                            </Link>
                        </>)}

                    </div>
                </div >
            </div >
        </motion.div >
    )
}

export default Header