import type { Todo } from '../interfaces/Todo.interface'
import { TodoItem } from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onUpdate: (id: string, title: string) => void
  onDelete: (id: string) => void
}

export function TodoList({ todos, onToggle, onUpdate, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-300 py-10 text-center text-slate-400 dark:border-slate-700 dark:text-slate-500">
        Henüz görev yok. Yukarıdan yeni bir görev ekleyin.
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
