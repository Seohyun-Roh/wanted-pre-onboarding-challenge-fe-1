import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { ITodo } from 'types/todo'

interface ITodoStore {
  todos: ITodo[]
  setTodos: (todos: ITodo[]) => void
}

const useTodoStore = create<ITodoStore>()(
  devtools(
    persist(
      (set) => ({
        todos: [],
        setTodos: (todos) => set(() => ({ todos })),
      }),
      { name: 'todo-store' }
    )
  )
)

export default useTodoStore
