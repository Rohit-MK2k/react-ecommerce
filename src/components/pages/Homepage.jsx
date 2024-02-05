import React from 'react'
import {Link, Outlet} from 'react-router-dom'

function Homepage() {
  return (
    <>
      <div className="h-screen flex flex-row">

        <div className="home-image bg-black w-8/12 text-white"></div>

        <div className="bg-white w-4/12 flex flex-row justify-center items-center">
          <div className="auth-box flex flex-col w-full justify-center items-center gap-10 transtion duration-150">
            <h1 className="text-5xl">ShopKart.</h1>
            <Outlet/>
          </div>
        </div>

      </div>
    </>
  )
}

export default Homepage