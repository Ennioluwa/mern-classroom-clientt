import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import useUser from '../../context'
import UserAuth from '../../components/auth/UserAuth'

const profile = () => {
  const {
    state: { user },
    dispatch,
  } = useUser()
  const [values, setValues] = useState({
    name: '',
    password: '',
    error: '',
    email: '',
    buttonText: 'Update',
    text: '',
    educator: false,
  })
  // const [buttonText, setButtonText] = useState('update')
  const { name, email, password, error, buttonText, text, educator } = values
  const router = useRouter()
  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      buttonText: 'Update',
      error: '',
      text: '',
    })
  }
  useEffect(() => {
    user &&
      setValues({
        ...values,
        name: user?.name,
        email: user?.email,
        educator: user?.educator,
      })
  }, [user])
  const handleSubmit = async (e) => {
    e.preventDefault()
    setValues({ ...values, buttonText: 'Updating' })
    await axios
      .put(`${process.env.NEXT_PUBLIC_APP_NAME}/api/user`, {
        name,
        email,
        password,
        educator,
      })
      .then(({ data }) => {
        setValues({ ...values, buttonText: 'Updated', text: data.message })
        dispatch({ type: 'UPDATE', payload: data.data })
      })
      .catch(({ response }) => {
        setValues({
          ...values,
          buttonText: 'Update',
          error: response.data.error,
        })
      })
  }
  return (
    <div className=" mt-[-64px] h-screen bg-purple-400 pt-16">
      <div className="mx-auto grid h-full w-full max-w-sm place-items-center p-5">
        <form
          className="mb-4 flex w-full grow flex-col gap-3 rounded-lg bg-white px-8 pt-6 pb-8 shadow-md"
          onSubmit={handleSubmit}
        >
          <h3 className="mb-3 text-4xl font-semibold">Update</h3>
          {text && (
            <p className=" rounded bg-green-400 p-3 text-white">{text}</p>
          )}
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="username"
            >
              Name
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="username"
              type="text"
              placeholder="Username"
              required
              value={name}
              onChange={handleChange('name')}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="username"
            >
              Email
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="email"
              type="text"
              required
              value={email}
              disabled
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
          </div>
          <div>
            <h2>Are you an educator</h2>
            <div>
              <input
                type="radio"
                name="yes"
                value={false}
                checked={educator === true}
                onChange={() => setValues({ ...values, educator: true })}
                id="yes"
                className=" mr-2"
              />
              <label htmlFor="yes">Yes</label>
            </div>
            <div>
              <input
                type="radio"
                name="no"
                id="no"
                value={true}
                className=" mr-2"
                checked={educator === false}
                onChange={() => setValues({ ...values, educator: false })}
              />
              <label htmlFor="no">No</label>
            </div>
          </div>
          {error && <p className="mb-3 text-xs italic text-red-500">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              className="focus:shadow-outline rounded bg-orange-500 py-2 px-4 font-bold text-white hover:bg-orange-400 focus:outline-none"
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

export default profile

export const getServerSideProps = UserAuth()
