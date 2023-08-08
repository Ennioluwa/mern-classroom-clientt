import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const Enroll = ({ courseId }) => {
  axios.defaults.withCredentials = true
  const router = useRouter()
  const handleEnroll = async (id) => {
    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_APP_NAME}/api/enrollment/new/${id}`)
        .then(({ data }) => {
          //   console.log(data)
          router.push(`/learn/${data._id}`)
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    } catch (error) {
      console.log(error)
    }
  }
  console.log(courseId)
  return (
    <button
      onClick={() => handleEnroll(courseId)}
      className=" rounded bg-orange-500 px-3 py-2 font-semibold text-gray-50 hover:bg-orange-400"
    >
      Go to Course
    </button>
  )
}

export default Enroll
