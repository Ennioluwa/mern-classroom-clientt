import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import UserAuth from '../../../components/auth/UserAuth'

const index = ({ data, error }) => {
  const [courses, setCourses] = useState(data)
  const [index, setIndex] = useState(-1)
  const [lessonStatus, setLessonStatus] = useState(data.lessonStatus)
  const [totalComplete, setTotalComplete] = useState(0)
  const router = useRouter()
  const id = router.query.id
  console.log(data, error)

  const totalCompleted = (lessons) => {
    let count = lessons?.reduce((total, lessonState) => {
      return total + (lessonState.completed ? 1 : 0)
    }, 0)
    setTotalComplete(count)
    return count
  }
  const getCourses = async () => {
    totalCompleted(lessonStatus)
  }
  const handleComplete = async (_id) => {
    if (!courses.lessonStatus[index].complete) {
      const status = courses.lessonStatus
      status[index].completed = true
      console.log(status)
      const count = totalCompleted(status)
      console.log(count, status.length)
      console.log(status)
      if (count == status.length) {
        var completedAt = Date.now()
      }
      try {
        await axios
          .put(
            `${process.env.NEXT_PUBLIC_APP_NAME}/api/enrollment/complete/${id}`,
            {
              complete: true,
              lessonStatusId: _id,
              courseCompleted: completedAt,
            }
          )
          .then(({ data }) => {
            console.log(data)
            setLessonStatus(status)
            // setCourses(data)
          })
          .catch(({ response }) => {
            console.log(response.data)
          })
      } catch (error) {
        console.log(error)
      }
    }
  }
  useEffect(() => {
    getCourses()
  }, [id])
  return (
    <div className="mt-[-48px] min-h-screen bg-purple-400 p-5 pt-20 md:p-10 md:pt-20 ">
      <div className="min-h-full rounded-xl bg-gray-200 p-5 text-black shadow-lg">
        <h1 className=" mb-6 text-3xl font-semibold capitalize tracking-wide">
          {courses?.course?.name}
        </h1>
        <div className=" grid grid-cols-1 gap-5  md:grid-cols-12 md:gap-10">
          <div className=" order-2 col-span-1 md:order-1 md:col-span-8">
            <div className="relative mb-5 h-72 w-full overflow-clip rounded-xl bg-purple-400">
              <Image
                src={`${process.env.NEXT_PUBLIC_APP_NAME}/api/course/image/${courses?.course?._id}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h4 className=" mb-4 text-lg font-normal">
              By{' '}
              <span className=" font-medium">
                {courses?.course?.instructor?.name}
              </span>
            </h4>
            <p className=" mb-3 w-fit rounded bg-purple-400 px-3 py-1 capitalize text-gray-100">
              {courses?.course?.category}
            </p>
            {index !== -1 ? (
              <div className=" rounded border p-5 shadow">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className=" text-lg font-semibold capitalize">
                    Lesson {index + 1}: {courses?.course?.lessons[index].title}
                  </h3>
                  <button
                    onClick={() =>
                      handleComplete(courses?.lessonStatus[index]._id)
                    }
                    className=" rounded bg-orange-500 px-3 py-2 font-semibold text-gray-50 hover:bg-orange-400"
                    disabled={lessonStatus[index]?.completed == true}
                  >
                    {lessonStatus[index]?.completed
                      ? 'Completed'
                      : 'Mark as Complete'}
                  </button>
                </div>
                <p className=" mb-4">
                  {courses?.course?.lessons[index].content}
                </p>
                <a
                  href={courses?.course?.lessons[index].resource_url}
                  className=" rounded bg-orange-500 px-3 py-2 font-semibold text-gray-50 hover:bg-orange-400"
                >
                  Resource Link
                </a>
              </div>
            ) : (
              <p className="rounded border border-gray-100 p-5 shadow">
                {courses?.course?.description}
              </p>
            )}
          </div>
          <div className=" order-1 col-span-1 overflow-y-auto md:order-2 md:col-span-4 md:px-5 md:py-14">
            <div className="mb-4 flex w-full max-w-fit items-center gap-2 rounded p-2 py-3 text-black shadow">
              <span className=" grid h-7 w-7 place-items-center rounded-full bg-orange-400">
                i
              </span>
              <span
                className=" cursor-pointer text-xl font-semibold"
                onClick={() => setIndex(-1)}
              >
                Course Overview
              </span>
            </div>
            <p className=" text-xl font-medium">Lessons</p>
            <div className=" max-h-[200px] overflow-auto">
              {courses?.course?.lessons?.map((lesson, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 rounded border-b border-gray-300 py-4 px-2 hover:bg-gray-100"
                >
                  <span className=" grid h-8 w-8 place-items-center rounded-full bg-orange-500 text-gray-50">
                    {i + 1}
                  </span>
                  <p
                    className=" first-letter grow cursor-pointer font-semibold capitalize"
                    onClick={() => setIndex(i)}
                  >
                    {lesson.title}
                  </p>
                  <p className="grid h-8 w-8 place-items-center rounded-full border border-orange-500 text-gray-50">
                    {lessonStatus[i]?.completed && (
                      <span className=" grid h-full  w-full place-items-center rounded-full bg-orange-400 text-center align-middle text-white">
                        Y
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index

export const getServerSideProps = UserAuth(async (context) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_NAME}/api/enrollment/${context.params.id}`,
      {
        headers: {
          cookie: context.req.headers.cookie,
        },
      }
    )
    return {
      props: {
        data: data,
      },
    }
  } catch (error) {
    return {
      props: {
        error: 'An error occurred',
      },
    }
  }
})
