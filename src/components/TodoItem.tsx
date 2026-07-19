import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import type { Todo } from '../interfaces/Todo.interface'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onUpdate: (id: string, title: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(todo.title)

  function commitEdit() {
    if (draft.trim()) {
      onUpdate(todo.id, draft)
    } else {
      setDraft(todo.title)
    }
    setIsEditing(false)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') commitEdit()
    if (event.key === 'Escape') {
      setDraft(todo.title)
      setIsEditing(false)
    }
  }

  return (
    <li className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-5 w-5 shrink-0 cursor-pointer accent-violet-600"
      />

      {isEditing ? (
        <input
          type="text"
          value={draft}
          autoFocus
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded border border-violet-300 bg-white px-2 py-1 text-slate-800 outline-none focus:ring-2 focus:ring-violet-200 dark:bg-slate-900 dark:text-slate-100"
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          className={`flex-1 cursor-text select-none break-words ${
            todo.completed
              ? 'text-slate-400 line-through dark:text-slate-500'
              : 'text-slate-800 dark:text-slate-100'
          }`}
        >
          {todo.title}
        </span>
      )}

      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="rounded-md px-2 py-1 text-sm font-medium text-violet-600 transition hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-950"
        >
          Düzenle
        </button>
        <button
          type="button"
          onClick={() => onDelete(todo.id)}
          className="rounded-md px-2 py-1 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
        >
          Sil
        </button>
      </div>
    </li>
  )
}
