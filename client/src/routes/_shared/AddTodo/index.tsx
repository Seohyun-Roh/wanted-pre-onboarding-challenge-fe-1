import { useState } from 'react'

import AddTodoModal from '../AddTodoModal'
import styles from './addTodo.module.scss'

const AddTodo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button type='button' className={styles.addTodoButton} onClick={() => setIsModalOpen(true)}>
        + ADD TODO
      </button>
      {isModalOpen && <AddTodoModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
    </>
  )
}

export default AddTodo
