import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import UserAuth from '../../../../components/auth/UserAuth'
import NewLesson from '../../../../components/NewLesson'
import useUser from '../../../../context'

const course = () => {
  const [course, setCourse] = useState({})
  const [values, setValues] = useState({
    name: '',
    description: '',
    category: '',
    success: '',
    error: '',
    instructor: '',
    lessons: [],
    buttonText: 'Save',
  })
  const {
    name,
    description,
    category,
    success,
    error,
    buttonText,
    lessons,
    instructor,
  } = values

  const router = useRouter()
  const id = router.query.id
  const getCourse = async () => {
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_APP_NAME}/api/courses/${id}`)
        .then(({ data }) => {
          const { name, description, category, lessons, instructor } = data
          setValues({
            ...values,
            name,
            description,
            category,
            lessons,
            instructor: instructor.name,
          })
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCourse()
  }, [id])
  const addLesson = (lesson) => {
    setCourse(lesson)
  }
  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: '',
      buttonText: 'Save',
    })
  }
  const handleLessonChange = (index, name) => (e) => {
    const newLesson = lessons
    newLesson[index][name] = e.target.value
    setValues({ ...values, lessons: newLesson })
    console.log(lessons)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setValues({ ...values, buttonText: 'Saving' })
    try {
      await axios
        .put(`${process.env.NEXT_PUBLIC_APP_NAME}/api/courses/${id}`, {
          name,
          description,
          category,
          lessons,
        })
        .then(({ data }) => {
          const { name, description, category, lessons } = data
          console.log(data)
          setValues({
            ...values,
            name,
            description,
            category,
            lessons,
            buttonText: 'Saved',
          })
        })
        .catch(({ response }) => {
          console.log(response.data)
          setValues({ ...values, buttonText: 'Save' })
        })
    } catch (error) {
      console.log(error)
      setValues({ ...values, buttonText: 'Save' })
    }
  }
  const moveUp = (index) => () => {
    const newLessons = lessons
    const moveUp = newLessons[index]
    newLessons[index] = newLessons[index - 1]
    newLessons[index - 1] = moveUp
    setValues({ ...values, lessons: newLessons })
  }
  const handleDeleteLesson = async (index) => {
    const newLessons = lessons
    newLessons.splice(index, 1)
    setValues({ ...values, lessons: newLessons })
  }
  return (
    <div className=" mt-[-48px] min-h-screen  w-full bg-purple-400 pt-20">
      <div className=" container mx-auto rounded-lg border border-gray-200 bg-gray-100 p-5 shadow-xl md:p-10">
        <div className=" flex items-center justify-between gap-3">
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="name"
            >
              Title
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="name"
              type="text"
              placeholder="Title"
              value={name}
              onChange={handleChange('name')}
            />
          </div>
          <button
            onClick={handleSubmit}
            className=" rounded border border-red-500 bg-transparent p-2 text-red-500 hover:bg-red-500 hover:text-gray-50"
          >
            {buttonText}
          </button>
        </div>
        <h4 className=" mb-4">By {instructor}</h4>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="category"
          >
            Category
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="category"
            type="text"
            placeholder="Category"
            value={category}
            onChange={handleChange('category')}
          />
        </div>
        <div className="flex w-full items-start gap-5">
          <div className="relative h-32 w-1/3">
            <Image src={`/avatar.png`} layout="fill" objectFit="contain" />
          </div>
          <div className="mb-4 grow">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="name"
            >
              Description
            </label>
            <textarea
              rows={4}
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="description"
              type="text"
              placeholder="Description"
              value={description}
              onChange={handleChange('description')}
            />
          </div>
        </div>
        <p>Lessons - Edit and Rearrange</p>
        <p className=" my-2">{lessons?.length} lessons</p>
        {lessons?.map((lesson, index) => (
          <div
            key={index}
            className="mb-3 flex items-center justify-between gap-5 rounded border border-gray-300 bg-gray-50 px-2 py-5 shadow"
          >
            <div className=" flex flex-col items-center justify-center gap-3">
              <span className=" grid h-8 w-8 place-items-center rounded-full bg-gray-400 text-gray-50">
                {index + 1}
              </span>
              {index !== 0 && <button onClick={moveUp(index)}>up</button>}
            </div>

            <div className=" grow">
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
                  value={lesson.title}
                  onChange={handleLessonChange(index, 'title')}
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
                  rows={3}
                  className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  id="content"
                  type="text"
                  placeholder="Title"
                  value={lesson.content}
                  onChange={handleLessonChange(index, 'content')}
                />
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="resource"
                >
                  Resource Link
                </label>
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  id="resource"
                  type="text"
                  placeholder="Title"
                  value={lesson.resource_url}
                  onChange={handleLessonChange(index, 'resource_url')}
                />
              </div>
            </div>
            <button onClick={() => handleDeleteLesson(index)}>delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default course

export const getServerSideProps = UserAuth()
