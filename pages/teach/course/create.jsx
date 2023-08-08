import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import UserAuth from '../../../components/auth/UserAuth'

const create = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    image: '',
    category: '',
    error: '',
    success: '',
    buttonText: 'Create',
    imageName: '',
    formData: process.browser && new FormData(),
  })
  const {
    name,
    description,
    image,
    category,
    error,
    success,
    buttonText,
    imageName,
    formData,
  } = values
  const router = useRouter()
  const handleChange = (name) => (e) => {
    const value = name === 'image' ? e.target.files[0] : e.target.value
    const imageName = name === 'image' ? e.target.files[0].name : 'Upload image'
    formData.set(name, value)
    setValues({ ...values, [name]: e.target.value, imageName: imageName || '' })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setValues({ ...values, buttonText: 'Creating' })
    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_APP_NAME}/api/courses`, formData)
        .then(({ data }) => {
          console.log(data)
          router.push('/teach/mycourses')
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className=" mt-[-64px] h-screen min-h-screen bg-purple-400 pt-16">
      <div className="mx-auto grid h-full w-full max-w-sm place-items-center p-5">
        <form
          className="mb-4 flex w-full grow flex-col gap-3 rounded-xl bg-white px-8 pt-6 pb-8 shadow-md"
          onSubmit={handleSubmit}
        >
          <h3 className="mb-3 text-4xl font-semibold">New Course</h3>
          {success && (
            <p className=" rounded bg-green-400 p-3 text-white">{success}</p>
          )}
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleChange('name')}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              rows={3}
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="description"
              type="text"
              placeholder="Description"
              value={description}
              onChange={handleChange('description')}
            />
          </div>
          <div className="mb-2">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="category"
            >
              Category
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="category"
              type="text"
              placeholder="Category"
              value={category}
              onChange={handleChange('category')}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="image"
            >
              Image
            </label>
            <input
              className="block w-full cursor-pointer rounded border border-solid border-gray-300 bg-white bg-clip-padding text-base font-normal text-gray-700 transition  ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
              type="file"
              id="image"
              accept="image/*"
              required
              onChange={handleChange('image')}
            />
          </div>
          {error && <p className="mb-4 text-xs italic text-red-500">{error}</p>}
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

export default create

export const getServerSideProps = UserAuth()
