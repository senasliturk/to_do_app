import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Check, Pencil, Trash2 } from 'lucide-react'
import type { Todo } from '../interfaces/Todo.interface'
import { pickTaskIcon } from '../utils/taskIcon'
import { FlowerBurst } from './FlowerBurst'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onUpdate: (id: string, title: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(todo.title)
  const [showBurst, setShowBurst] = useState(false)
  const burstTimeout = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(burstTimeout.current), [])

  function handleToggle() {
    if (!todo.completed) {
      setShowBurst(true)
      window.clearTimeout(burstTimeout.current)
      burstTimeout.current = window.setTimeout(() => setShowBurst(false), 700)
    }
    onToggle(todo.id)
  }

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
    <li className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-900/5 transition hover:shadow-md dark:bg-slate-800 dark:ring-white/5">
      <label
        className={`relative grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-full border-2 transition-colors duration-200 ease-out ${
          todo.completed
            ? 'border-teal-500 bg-teal-500'
            : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-900'
        }`}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="sr-only"
        />
        <Check
          className={`h-4 w-4 text-white transition-opacity ${todo.completed ? 'opacity-100' : 'opacity-0'}`}
          strokeWidth={3}
        />
        {showBurst && <FlowerBurst />}
      </label>

      <span className="shrink-0 text-lg" aria-hidden>
        {pickTaskIcon(todo.title)}
      </span>

      {isEditing ? (
        <input
          type="text"
          value={draft}
          autoFocus
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-lg border border-amber-300 bg-white px-2 py-1 text-slate-800 outline-none focus:ring-2 focus:ring-amber-200 dark:bg-slate-900 dark:text-slate-100"
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          className={`flex-1 cursor-text select-none break-words font-medium ${
            todo.completed
              ? 'text-slate-400 line-through dark:text-slate-500'
              : 'text-slate-700 dark:text-slate-100'
          }`}
        >
          {todo.title}
        </span>
      )}

      <div className="flex shrink-0 gap-1">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          aria-label="Düzenle"
          className="grid h-8 w-8 place-items-center rounded-full text-slate-400 transition hover:bg-amber-50 hover:text-amber-600 dark:text-slate-500 dark:hover:bg-amber-950 dark:hover:text-amber-400"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(todo.id)}
          aria-label="Sil"
          className="grid h-8 w-8 place-items-center rounded-full text-slate-400 transition hover:bg-red-50 hover:text-red-500 dark:text-slate-500 dark:hover:bg-red-950 dark:hover:text-red-400"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </li>
  )
}
