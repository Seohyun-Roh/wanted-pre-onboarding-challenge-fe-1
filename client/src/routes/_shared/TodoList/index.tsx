import { Dispatch, SetStateAction } from 'react'
import cx from 'classnames'

import useTodoStore from 'states/store'
import { ITodo } from 'types/todo'

import { Bin } from 'assets/svgs'
import styles from './todoList.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'

interface Props {
  isTodoDetailOpen: boolean
  setIsTodoDetailOpen: Dispatch<SetStateAction<boolean>>
}

const TodoList = ({ isTodoDetailOpen, setIsTodoDetailOpen }: Props) => {
  const navigate = useNavigate()
  const location = useLocation()

  const { todos } = useTodoStore()

  const handleTodoClick = (todo: ITodo) => {
    if (location.pathname === `/todo/${todo.id}`) {
      setIsTodoDetailOpen((prev) => !prev)
    } else {
      navigate(`/todo/${todo.id}`, { state: todo })
      setIsTodoDetailOpen(true)
    }
  }

  return (
    <div className={styles.todoContainer}>
      <ul className={cx({ [styles.isTodoDetailOpen]: isTodoDetailOpen }, styles.todoList)}>
        {todos.length > 0 &&
          todos.map((todo: ITodo) => (
            <li key={todo.id} className={styles.todoItem}>
              <button type='button' className={styles.todoInfo} onClick={() => handleTodoClick(todo)}>
                <p className={styles.title}>{todo.title}</p>
                <p className={styles.content}>{todo.content}</p>
              </button>
              <div className={styles.buttonWrapper}>
                <button type='button'>
                  <Bin />
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default TodoList
