import axios from 'axios'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import UserAuth from '../../components/auth/UserAuth'

const courses = () => {
  const [courses, setCourses] = useState([])
  const getCourses = async () => {
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_APP_NAME}/api/mycourse`)
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
  //   console.log(courses)
  return (
    <div className="mt-[-48px] min-h-screen bg-purple-400 p-5 pt-20 md:p-10 md:pt-20 ">
      <div className="mx-auto min-h-full max-w-3xl rounded-xl bg-gray-200 p-5 text-black shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className=" mb-2 text-xl font-semibold text-red-400">
            Your Courses
          </h2>
          <Link href={`/teach/course/create`}>
            <button className=" rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-400">
              New course
            </button>
          </Link>
        </div>
        <div className="">
          {courses?.map((data) => (
            <div
              key={data._id}
              className="flex flex-col items-center gap-4 border-b border-gray-400 py-5 sm:flex-row"
            >
              <div className="relative h-32 w-full overflow-clip rounded-lg sm:w-1/4">
                <Image
                  src={`${process.env.NEXT_PUBLIC_APP_NAME}/api/course/image/${data._id}`}
                  layout="fill"
                  objectFit="cover"
                  className=" bg-gray-400"
                />
              </div>

              <div className=" w-full sm:w-3/4">
                <Link href={`/teach/course/${data._id}`}>
                  <a className=" mb-2 text-xl font-semibold text-purple-500">
                    {data.name}
                  </a>
                </Link>
                <p>{data.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default courses

export const getServerSideProps = UserAuth()
