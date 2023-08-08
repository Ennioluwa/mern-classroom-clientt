import axios from 'axios'
import { useState } from 'react'
import Modal from '../components/Modal'
const NewLesson = ({ id, setCourse }) => {
  const [values, setValues] = useState({
    title: '',
    content: '',
    resource_url: '',
    isOpen: false,
    error: '',
    success: '',
    buttonText: 'Create',
  })
  const { title, content, resource_url, isOpen, error, success, buttonText } =
    values
  const openModal = () => {
    setValues({ ...values, isOpen: true })
  }
  const closeModal = () => {
    setValues({ ...values, isOpen: false })
  }
  const handleChange = (text) => (e) => {
    setValues({
      ...values,
      [text]: e.target.value,
      error: '',
      buttonText: 'Create',
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setValues({ ...values, buttonText: 'Creating' })
    try {
      await axios
        .put(
          `${process.env.NEXT_PUBLIC_APP_NAME}/api/courses/${id}/lesson/new`,
          {
            title,
            content,
            resource_url,
          }
        )
        .then(({ data }) => {
          console.log(data)
          setCourse(data)
          setValues({
            title: '',
            content: '',
            resource_url: '',
            isOpen: true,
            buttonText: 'Created',
          })
        })
        .catch(({ response }) => {
          console.log(response.data)
          setValues({ ...values, buttonText: 'Create' })
        })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <button className=" font-semibold" onClick={openModal}>
        New
      </button>
      <Modal onRequestClose={closeModal} open={isOpen} closeOnOutsideClick>
        <form
          className="flex w-full grow flex-col gap-3 rounded-lg bg-white px-8 pt-6 pb-8 shadow-xl"
          onSubmit={handleSubmit}
        >
          <h3 className="mb-3 text-4xl font-semibold">New Lesson</h3>
          {success && (
            <p className=" rounded bg-green-400 p-3 text-white">{success}</p>
          )}
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={handleChange('title')}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="content"
              type="text"
              placeholder="Content"
              value={content}
              onChange={handleChange('content')}
            />
          </div>
          <div className="mb-2">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="resource"
            >
              Resource Url
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="resource"
              type="text"
              placeholder="Resource Url"
              value={resource_url}
              onChange={handleChange('resource_url')}
            />
            {error && (
              <p className="mt-3 text-xs italic text-red-500">{error}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="submit"
            >
              {buttonText}
            </button>
            <p
              className="focus:shadow-outline cursor-pointer rounded bg-gray-300 py-2 px-4 font-bold text-black hover:bg-gray-700 hover:text-white focus:outline-none"
              onClick={closeModal}
            >
              Close
            </p>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default NewLesson
