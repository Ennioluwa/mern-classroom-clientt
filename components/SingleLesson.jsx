import React, { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const SingleLesson = ({ lesson, i }) => {
  const [showInfo, setShowInfo] = useState(false)
  return (
    <article key={i}>
      <div className="  flex items-center gap-4 py-3">
        <span className=" grid h-8 w-8 place-items-center self-end rounded-full bg-orange-500 text-gray-50">
          {i + 1}
        </span>
        <span>{lesson.title}</span>
        <button
          className=" ml-auto flex h-8 w-8 min-w-min cursor-pointer items-center justify-center rounded-full border-transparent bg-transparent bg-gray-300 text-red-600 shadow-sm"
          onClick={() => setShowInfo(!showInfo)}
        >
          {showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </div>
      {showInfo && <p className=" mb-4">{lesson.content}</p>}
    </article>
  )
}

export default SingleLesson
