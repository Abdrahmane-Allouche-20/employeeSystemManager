import React from 'react'
import { NavLink } from 'react-router-dom'
function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-cyan-400 px-4">
      <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
          Welcome!
        </h1>
        <p className="text-xl mb-6 text-white/90">
          Employee System Manager
        </p>
        <p className="text-base text-cyan-50">
          Manage your employees efficiently and effortlessly.<br />
          Get started by navigating through the menu.
        </p>
        <button className='bg-white px-3 py-2 font-black mx-auto my-3 text-black rounded-lg flex justify-center items-center'>
<NavLink to={'/admin'}>Dashboard</NavLink>
        </button>
      </div>
      <footer className="mt-8 text-sm text-cyan-100 opacity-80">
        &copy; {new Date().getFullYear()} Employee System Manager
      </footer>
    </div>
  )
}

export default Home