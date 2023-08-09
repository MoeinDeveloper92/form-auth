import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
function HomeScreen() {
    return (
        <motion.div
            initial={{
                x: '-100%'
            }}
            animate={{
                x: 0
            }}
        >
            <div className="hero bg-gray-200 mx-auto rounded-md border border-black sm:max-w-sm md:max-w-md xl:max-w-lg">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className='sm:text-3xl font-bold md:text-4xl'>MERN Authentication</h1>
                        <p className="py-6 sm:text-sm md:text-md">
                            This is a boilerplate for MERN Auhtentication which stores a JWT in an httpOnly cookie. It also usese REdux tool kit for managing states.
                        </p>
                        <div className='space-x-3'>
                            <button className='btn btn-primary btn-sm'>
                                <Link to={"/auth"}>
                                    Signin
                                </Link>
                            </button>
                            <button className='btn btn-sm btn-secondary'>
                                <Link to={"/register"}>
                                    SignUp
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default HomeScreen