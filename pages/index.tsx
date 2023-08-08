import axios from 'axios'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import UserRoute from '../components/routes/UserRoute'
import { UserContext } from '../context'
import Enroll from '../components/Enroll'
import Enrollments from '../components/Enrollments'
import Link from 'next/link'
import UserAuth from '../components/auth/UserAuth'
interface Course {
  name: String
  category: String
  description: String
  lessons: []
  published: boolean
  createdAt: Date
  updatedAt: Date
  _id: any
}
const Home: NextPage = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(UserContext)
  const [courses, setCourses] = useState([])
  axios.defaults.withCredentials = true
  const getCourses = async () => {
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_APP_NAME}/api/courses/published`)
        .then(({ data }) => {
          console.log(data)
          setCourses(data)
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    } catch (error) {
      console.log(error)
      console.log('error herre')
    }
  }
  useEffect(() => {
    getCourses()
  }, [])
  const photoUrl = `${process.env.NEXT_PUBLIC_APP_NAME}/api/posts/photo/`

  return (
    <div className="mt-[-48px] min-h-screen bg-purple-400 p-5 pt-16 md:p-10 md:pt-20 ">
      {user && <Enrollments />}
      <main className=" container mx-auto mt-10 rounded-2xl bg-gray-200 p-5">
        <h1 className=" mb-5 text-3xl font-semibold">All Courses</h1>
        <div className=" grid grid-cols-1 gap-6 md:grid-cols-12">
          {courses?.map((course: Course, i) => {
            return (
              <div key={i} className=" col-span-1 md:col-span-6">
                <div className=" relative h-60 w-full overflow-clip rounded-lg shadow">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_APP_NAME}/api/course/image/${course._id}`}
                    layout="fill"
                    objectFit="cover"
                    className=" bg-gray-400"
                  />
                  <div className="absolute bottom-0 left-0 right-0 flex h-20 items-center justify-between bg-gray-900 p-5 text-white opacity-80">
                    <div>
                      <Link href={`/teach/course/${course._id}`}>
                        <a>{course.name}</a>
                      </Link>
                      <p>{course.category}</p>
                    </div>
                    <Enroll courseId={course?._id} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default Home

// export const getServerSideProps = UserAuth()
