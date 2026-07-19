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
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-slate-300 py-14 text-center text-slate-400 dark:border-slate-700 dark:text-slate-500">
        <span className="text-3xl" aria-hidden>
          🌱
        </span>
        <p>Henüz görev yok. Sağ alttaki + ile ekleyin.</p>
      </div>
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
