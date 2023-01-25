import { create } from 'zustand'

import { ITodo } from 'types/todo'

interface ITodoStore {
  todos: ITodo[]
  setTodos: (todos: ITodo[]) => void
}

const useTodoStore = create<ITodoStore>((set) => ({
  todos: [],
  setTodos: (todos) => set(() => ({ todos })),
}))

export default useTodoStore
