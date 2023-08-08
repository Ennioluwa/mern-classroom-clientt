import React, { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import Modal from './Modal'

const DeleteCourse = ({ deleteCourse }) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <div>
      <i
        className=" text-xl font-medium text-red-500"
        onClick={() => setIsOpen(true)}
      >
        <AiOutlineDelete />
      </i>

      <Modal onRequestClose={closeModal} open={isOpen} closeOnOutsideClick>
        <div className=' className=" max-w-2xl p-5 shadow-md'>
          <h4 className=" mb-4 text-2xl font-semibold">Delete Course</h4>
          <p className=" mb-2 text-lg font-medium">
            Are you sure you want to delete this course?
          </p>
          <div className=" flex items-center justify-between">
            <button
              onClick={() => setIsOpen(false)}
              className=" rounded bg-red-500 px-3 py-1 text-white hover:bg-red-400 hover:text-black"
            >
              Cancel
            </button>
            <button
              className=" rounded bg-gray-500 px-3 py-2 text-white hover:bg-gray-400 hover:text-black"
              onClick={deleteCourse}
            >
              Delete Course
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default DeleteCourse
