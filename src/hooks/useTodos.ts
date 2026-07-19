import { useEffect, useState } from 'react'
import type { Todo } from '../interfaces/Todo.interface'

const STORAGE_KEY = 'todo-app.todos'

function loadTodos(): Todo[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Todo[]
  } catch {
    return []
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function addTodo(title: string) {
    const trimmed = title.trim()
    if (!trimmed) return
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: trimmed,
      completed: false,
      createdAt: Date.now(),
    }
    setTodos((prev) => [newTodo, ...prev])
  }

  function updateTodo(id: string, title: string) {
    const trimmed = title.trim()
    if (!trimmed) return
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, title: trimmed } : todo)),
    )
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  function deleteTodo(id: string) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  return { todos, addTodo, updateTodo, toggleTodo, deleteTodo }
}
