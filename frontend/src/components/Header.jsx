import React from 'react'
import { Link } from "react-router-dom"
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa"
import { motion } from "framer-motion"
function Header() {
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
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Header