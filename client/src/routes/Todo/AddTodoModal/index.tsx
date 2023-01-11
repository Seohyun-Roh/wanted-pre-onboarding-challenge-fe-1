import { Dispatch, SetStateAction, useState, FormEventHandler } from 'react'
import axios from 'axios'

import { SERVER_URL } from 'constants/todo'

import { Modal } from 'components'
import styles from './addTodoModal.module.scss'

interface Props {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  setTodos: Dispatch<SetStateAction<any[]>>
}

const AddTodoModal = ({ isModalOpen, setIsModalOpen, setTodos }: Props) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleCreateTodo: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    axios
      .post(
        `${SERVER_URL}/todos`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      )
      .then(({ data: { data } }) => {
        setTodos((prev) => [...prev, data])
      })
      .then(() => setIsModalOpen(false))
  }

  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <form onSubmit={handleCreateTodo} className={styles.addTodoForm}>
        <h2>Add Todo</h2>
        <div className={styles.inputContainer}>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='content'>Content</label>
          <input type='text' id='content' value={content} onChange={(e) => setContent(e.currentTarget.value)} />
        </div>
        <button type='submit' className={styles.submitButton}>
          Create Todo
        </button>
      </form>
    </Modal>
  )
}

export default AddTodoModal
