import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import cx from 'classnames'

import { Bin, Edit } from 'assets/svgs'
import TodoList from 'routes/_shared/TodoList'
import AddTodo from 'routes/_shared/AddTodo'
import styles from './todoDetail.module.scss'

const TodoDetail = () => {
  const navigate = useNavigate()
  const { state: todoDetail } = useLocation()
  const [isTodoDetailOpen, setIsTodoDetailOpen] = useState(true)

  useEffect(() => {
    if (!todoDetail) {
      navigate('/')
    }
  }, [navigate, todoDetail])

  return (
    <div className={styles.pageContainer}>
      <h1>TODO</h1>
      {todoDetail && (
        <>
          <div className={styles.contentWrapper}>
            <TodoList isTodoDetailOpen={isTodoDetailOpen} setIsTodoDetailOpen={setIsTodoDetailOpen} />
            <div className={cx({ [styles.isTodoDetailOpen]: isTodoDetailOpen }, styles.todoDetailContainer)}>
              <h2>{todoDetail.title}</h2>
              <div className={styles.todoDetailTitleContainer}>
                <p>lastModified: {new Date(todoDetail.updatedAt).toLocaleString()}</p>
                <div className={styles.buttonWrapper}>
                  <button type='button'>
                    <Edit />
                  </button>
                  <button type='button'>
                    <Bin />
                  </button>
                </div>
              </div>
              <div>{todoDetail.content}</div>
            </div>
          </div>
          <AddTodo />
        </>
      )}
    </div>
  )
}

export default TodoDetail
