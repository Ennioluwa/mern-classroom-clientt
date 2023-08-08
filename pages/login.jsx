import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context'

const Login = () => {
  const [values, setValues] = useState({
    name: '',
    email: 'ryan@gmail.com',
    success: '',
    error: '',
    password: 'rrrrrr',
    buttonText: 'Login',
  })
  const { email, password, name, success, error, buttonText } = values
  const {
    state: { user },
    dispatch,
  } = useContext(UserContext)

  const router = useRouter()
  useEffect(() => {
    if (user) router.push('/')
  }, [user])
  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: '',
      buttonText: 'Login',
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setValues({ ...values, buttonText: 'Logging In' })
      await axios
        .post(`${process.env.NEXT_PUBLIC_APP_NAME}/api/signin`, {
          email,
          password,
        })
        .then(({ data }) => {
          dispatch({ type: 'LOGIN', payload: data.user })
          router.push('/')
          setValues({ ...values, success: data.success })
        })
        .catch(({ response }) => {
          setValues({
            ...values,
            error: response.data.error,
            buttonText: 'Login',
          })
          console.log(response)
        })
    } catch (err) {
      console.log(err)
      setValues({ ...values, buttonText: 'Login' })
    }
  }

  return (
    <div className=" mt-[-64px] h-screen min-h-screen bg-purple-400 pt-16">
      <div className="mx-auto grid h-full w-full max-w-sm place-items-center p-5">
        <form
          className="mb-4 flex w-full grow flex-col gap-3 rounded bg-white px-8 pt-6 pb-8 shadow-md"
          onSubmit={handleSubmit}
        >
          <h3 className="mb-3 text-4xl font-semibold">Login</h3>
          {success && (
            <p className=" rounded bg-green-400 p-3 text-white">{success}</p>
          )}

          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleChange('email')}
            />
          </div>
          <div className="mb-2">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleChange('password')}
            />
            {error && (
              <p className="mt-3 text-xs italic text-red-500">{error}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className=" rounded bg-orange-500 px-3 py-2 font-semibold text-gray-50 hover:bg-orange-400"
              type="submit"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
