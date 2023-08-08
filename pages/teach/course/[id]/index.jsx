import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import NewLesson from '../../../../components/NewLesson'
import useUser from '../../../../context'
import Link from 'next/link'
import Modal from '../../../../components/Modal'
import Enroll from '../../../../components/Enroll'
import UserAuth from '../../../../components/auth/UserAuth'
import SingleLesson from '../../../../components/SingleLesson'
import { AiOutlineEdit } from 'react-icons/ai'
import DeleteCourse from '../../../../components/DeleteCourse'

const course = () => {
  const [course, setCourse] = useState({})
  const [values, setValues] = useState({
    published: false,
    error: '',
  })
  const [stats, setStats] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const { published, error } = values
  const {
    state: { user },
  } = useUser()
  const router = useRouter()
  const id = router.query.id
  const getCourse = async () => {
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_APP_NAME}/api/courses/${id}`)
        .then(({ data }) => {
          console.log(data)
          setCourse(data)
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    } catch (error) {
      console.log(error)
    }
  }
  const deleteCourse = async () => {
    try {
      await axios
        .delete(`${process.env.NEXT_PUBLIC_APP_NAME}/api/courses/${id}`)
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
  useEffect(() => {
    getCourse()
  }, [id])
  useEffect(async () => {
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_APP_NAME}/api/enrollment/stats/${id}`)
        .then(({ data }) => {
          setStats(data)
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    } catch (error) {
      console.log(error)
    }
  }, [id])
  const addLesson = (lesson) => {
    setCourse(lesson)
  }
  const openModal = () => {
    course.lessons.length > 0 && setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }
  const handleSubmit = async (e) => {
    if (course.lessons.length > 0) {
      try {
        await axios
          .put(`${process.env.NEXT_PUBLIC_APP_NAME}/api/courses/${id}`, {
            published: true,
          })
          .then(({ data }) => {
            console.log(data)
            setCourse(data)
            closeModal()
          })
          .catch(({ response }) => {
            console.log(response.data)
          })
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <>
      <div className=" mt-[-64px] min-h-screen bg-purple-400 p-5 pt-24">
        <div className="mx-auto max-w-2xl rounded-xl bg-gray-200 p-5 text-black shadow-lg">
          <div className="">
            <h1 className=" mb-6 text-3xl font-semibold capitalize tracking-wide">
              {course?.name}
            </h1>
            <div className="relative mb-5 h-72 w-full overflow-clip rounded-xl bg-gray-400">
              <Image
                src={`${process.env.NEXT_PUBLIC_APP_NAME}/api/course/image/${course?._id}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            {user?._id === course?.instructor?._id && (
              <div className=" flex items-center justify-center space-x-4">
                <Link href={`/teach/course/${id}/update`}>
                  <a className=" text-xl font-semibold text-green-400">
                    <AiOutlineEdit />
                  </a>
                </Link>
                {!course?.published ? (
                  <>
                    <button
                      onClick={openModal}
                      className=" rounded border border-red-500 bg-transparent p-2 text-red-500 hover:bg-red-500 hover:text-gray-50"
                    >
                      {course?.lessons?.length == 0
                        ? 'Add at least 1 lesson to publish'
                        : 'Publish'}
                    </button>
                    <DeleteCourse deleteCourse={deleteCourse} />
                  </>
                ) : (
                  <div className=" flex flex-wrap items-center gap-3">
                    <button className=" rounded border border-gray-500 bg-transparent p-2 text-gray-500 ">
                      Published
                    </button>
                    <div>
                      <span className=" mr-3">
                        {stats?.totalEnrolled} enrolled
                      </span>
                      <span>{stats?.totalCompleted} Completed</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            <h4 className=" mb-4 text-lg font-normal">
              By{' '}
              <span className=" font-medium">{course?.instructor?.name}</span>
            </h4>
            <p className=" mb-3 w-fit rounded bg-purple-400 px-3 py-1 capitalize text-gray-100">
              {course?.category}
            </p>
            <p className=" mb-4">{course?.description}</p>
            {user?._id !== course?.instructor?._id && (
              <Enroll courseId={course._id} />
            )}
          </div>
          <div className="overflow-y-auto md:px-5 md:py-14">
            <div className="mb-3 flex items-center justify-between gap-5">
              <p className=" text-xl font-medium">
                {course?.lessons?.length} Lessons
              </p>
              {user?._id === course?.instructor?._id && !course.published && (
                <NewLesson id={course?._id} setCourse={addLesson} />
              )}
            </div>
            {course?.lessons?.map((lesson, i) => (
              <SingleLesson lesson={lesson} i={i} key={i} />
            ))}
          </div>
        </div>
      </div>
      <Modal onRequestClose={closeModal} open={isOpen} closeOnOutsideClick>
        <div className=" w-96 p-5 shadow-md">
          <h3 className=" mb-5 text-xl font-semibold">Publish Course</h3>
          <p>
            Publishing your course will make it live to students for enrollment.
            <br />
            Make sure all lessons are added and ready for publishing.
          </p>
          <div className=" mt-5 flex items-center justify-end gap-3">
            <button
              className=" rounded bg-gray-600 px-3 py-1 text-white hover:bg-gray-400 hover:text-black"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className=" rounded bg-red-500 px-3 py-1 text-white hover:bg-red-300 hover:text-black"
              onClick={handleSubmit}
            >
              Publish
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default course

// export const getServerSideProps = UserAuth()
