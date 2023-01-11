import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SERVER_URL } from 'constants/todo'
import { ITodo } from 'types/todo'

import AddTodoModal from './AddTodoModal'
import styles from './todo.module.scss'

const Todo = () => {
  const navigate = useNavigate()

  const [todos, setTodos] = useState<ITodo[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/sign-in')
    }

    axios
      .get(`${SERVER_URL}/todos`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data: { data } }) => setTodos(data))
  }, [navigate])

  return (
    <main className={styles.pageContainer}>
      <h1>TODO</h1>
      <ul className={styles.todoContainer}>
        {todos.length > 0 &&
          todos.map((todo: ITodo) => (
            <li key={todo.id}>
              <p>{todo.title}</p>
              <p>{todo.content}</p>
            </li>
          ))}
      </ul>
      <button type='button' onClick={() => setIsModalOpen(true)}>
        + ADD TODO
      </button>
      {isModalOpen && <AddTodoModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setTodos={setTodos} />}
    </main>
  )
}

export default Todo
