import { Routes, Route } from 'react-router-dom'

import Todo from './Todo'
import SignIn from './SignIn'
import SignUp from './SignUp'
import styles from './routes.module.scss'

const App = () => {
  return (
    <main className={styles.container}>
      <Routes>
        <Route path='/' element={<Todo />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </main>
  )
}

export default App
