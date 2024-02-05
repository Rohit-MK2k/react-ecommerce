import React from 'react'
import { Link } from 'react-router-dom'

function Authbox() {
  return (
      <>
            <div className="auth-link-container flex flex-row justify-center items-center gap-5">
              <Link to='signup' className="auth-link py-1.5 px-5 flex justify-center items-center rounded-lg border-2 border-black p-2  hover:text-white transtion duration-150 disabled:hover:bg-white disabled:hover:text-black">Sign up</Link>
              <Link to='login'className="auth-link py-1.5 px-5 flex justify-center items-center rounded-lg border-2 border-black p-2  hover:text-white transtion duration-150 disabled:hover:bg-white disabled:hover:text-black">Login</Link>
            </div>
      </>
  )
}

export default Authbox