import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Enrollments = () => {
  axios.defaults.withCredentials = true
  const [courses, setCourses] = useState([])
  const getCourses = async () => {
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_APP_NAME}/api/enrollment/enrolled`)
        .then(({ data }) => {
          console.log(data)
          setCourses(data)
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCourses()
  }, [])
  return (
    <div className="container mx-auto rounded-2xl bg-gray-200 p-5 shadow-md">
      <h1 className=" mb-5 text-3xl font-semibold">Your Enrolled Courses</h1>
      <div className=" grid grid-cols-1 gap-6 md:grid-cols-12">
        {courses?.map((course, i) => {
          return (
            <div key={i} className=" col-span-1 md:col-span-6">
              <div className=" relative h-60 w-full overflow-clip rounded-lg shadow">
                <Image
                  src={`${process.env.NEXT_PUBLIC_APP_NAME}/api/course/image/${course?.course?._id}`}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute bottom-0 left-0 right-0 flex h-20 items-center justify-between bg-gray-900 p-5 text-white opacity-80">
                  <Link href={`/teach/course/${course.course._id}`}>
                    <a>{course.course.name}</a>
                  </Link>
                  <p>
                    {courses[i].completedAt ? 'Completed ' : 'Not Completed'}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Enrollments
