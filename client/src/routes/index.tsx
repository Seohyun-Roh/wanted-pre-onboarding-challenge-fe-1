import { Routes, Route } from 'react-router-dom'

import Todo from './Todo'

const App = () => {
  return (
    <div>
      <main>
        <Routes>
          <Route path='/' element={<Todo />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
