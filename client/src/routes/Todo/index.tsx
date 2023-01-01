import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Todo = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/sign-in')
    }
  }, [navigate])

  return <div>Todo</div>
}

export default Todo
