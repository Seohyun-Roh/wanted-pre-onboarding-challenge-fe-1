import { Routes, Route } from 'react-router-dom'

import Todo from './Todo'
import SignIn from './SignIn'
import SignUp from './SignUp'

const App = () => {
  return (
    <main>
      <Routes>
        <Route path='/' element={<Todo />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </main>
  )
}

export default App
