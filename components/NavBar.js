import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context'

const NavBar = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(UserContext)

  const router = useRouter()

  const signout = async () => {
    dispatch({ type: 'LOGOUT' })
    window.localStorage.removeItem('user')
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_NAME}/api/signout`
    )
    console.log(data)
    router.push('/login')
  }
  return (
    <>
      {user ? (
        <nav className=" relative bg-gray-200 py-4 text-xl font-semibold text-orange-500">
          <div className=" container mx-auto flex items-center justify-between px-5">
            <Link href={`/`}>
              <a className=" transition-all duration-75 hover:text-orange-400">
                Home
              </a>
            </Link>
            <Link href={`/user/profile`}>
              <a className=" transition-all duration-75 hover:text-orange-400">
                Profile
              </a>
            </Link>
            {user.educator && (
              <Link href={`/teach/mycourses`}>
                <a className=" transition-all duration-75 hover:text-orange-400">
                  Teach
                </a>
              </Link>
            )}
            <a className=" cursor-pointer" onClick={signout}>
              Signout
            </a>
          </div>
        </nav>
      ) : (
        <nav className="relative bg-gray-200 py-4 text-xl font-semibold text-orange-500">
          <div className=" container mx-auto flex items-center justify-between px-5">
            <Link href={`/`}>
              <a className=" transition-all duration-75 hover:text-orange-400">
                Home
              </a>
            </Link>
            <Link href={`/login`}>
              <a className=" transition-all duration-75 hover:text-orange-400">
                Login
              </a>
            </Link>
            <Link href={`/register`}>
              <a className=" transition-all duration-75 hover:text-orange-400">
                Register
              </a>
            </Link>
          </div>
        </nav>
      )}
    </>
  )
}

export default NavBar
