import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { SERVER_URL } from 'constants/todo'
import useTodoStore from 'states/store'

import TodoList from 'routes/_shared/TodoList'
import styles from './todo.module.scss'
import AddTodo from 'routes/_shared/AddTodo'

const Todo = () => {
  const navigate = useNavigate()

  const { setTodos } = useTodoStore()
  const [isTodoDetailOpen, setIsTodoDetailOpen] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/sign-in')
    }

    axios
      .get(`${SERVER_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(({ data: { data } }) => setTodos(data))
  }, [navigate, setTodos])

  return (
    <main className={styles.pageContainer}>
      <h1>TODO</h1>
      <TodoList isTodoDetailOpen={isTodoDetailOpen} setIsTodoDetailOpen={setIsTodoDetailOpen} />
      <AddTodo />
    </main>
  )
}

export default Todo
