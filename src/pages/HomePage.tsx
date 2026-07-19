import { useEffect, useMemo, useState } from 'react'
import { Plus, X } from 'lucide-react'
import { TodoForm } from '../components/TodoForm'
import { TodoList } from '../components/TodoList'
import { useTodos } from '../hooks/useTodos'

type Filter = 'all' | 'active' | 'completed'

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Tümü' },
  { value: 'active', label: 'Aktif' },
  { value: 'completed', label: 'Tamamlanan' },
]

export function HomePage() {
  const { todos, addTodo, updateTodo, toggleTodo, deleteTodo } = useTodos()
  const [filter, setFilter] = useState<Filter>('all')
  const [isAddOpen, setIsAddOpen] = useState(false)

  useEffect(() => {
    if (!isAddOpen) return
    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') setIsAddOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isAddOpen])

  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((todo) => !todo.completed)
    if (filter === 'completed') return todos.filter((todo) => todo.completed)
    return todos
  }, [todos, filter])

  const remaining = todos.filter((todo) => !todo.completed).length

  return (
    <main className="relative min-h-screen overflow-hidden bg-amber-50 dark:bg-slate-950">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-amber-200/60 blur-3xl dark:bg-amber-500/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-52 -right-24 h-72 w-72 rounded-full bg-teal-200/50 blur-3xl dark:bg-teal-500/10"
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-28 pt-10 sm:pt-14">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Merhaba </p>
            <h1 className="font-display text-2xl font-bold leading-snug text-slate-800 dark:text-white">
              {remaining > 0 ? (
                <>
                  Bugün <span className="text-teal-600 dark:text-teal-400">{remaining}</span>{' '}
                  görevin var
                </>
              ) : (
                'Tüm görevler tamam!'
              )}
            </h1>
          </div>
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-amber-400 text-xl shadow-inner">
            🌻
          </div>
        </header>

        <div className="mt-6 flex gap-2">
          {FILTERS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                filter === option.value
                  ? 'bg-teal-500 text-white shadow-sm shadow-teal-500/30'
                  : 'bg-white text-slate-500 shadow-sm hover:text-slate-700 dark:bg-slate-800 dark:text-slate-400'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <section className="relative mt-5 flex-1 rounded-3xl bg-white/90 p-4 shadow-[0_20px_60px_-25px_rgba(30,41,59,0.35)] backdrop-blur dark:bg-slate-900/80">
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
          />
        </section>

        <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-600">
          Çift tıklayarak veya kalem ikonuyla görevi güncelleyebilirsiniz.
        </p>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-20 flex justify-center px-5">
        <div className="flex w-full max-w-md justify-end">
          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            aria-label="Yeni görev ekle"
            className="pointer-events-auto grid h-14 w-14 place-items-center rounded-full bg-teal-500 text-white shadow-lg shadow-teal-500/40 transition hover:scale-105 hover:bg-teal-600 active:scale-95"
          >
            <Plus className="h-7 w-7" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-slate-900/40 px-5 pb-5 sm:items-center">
          <button
            type="button"
            aria-label="Kapat"
            onClick={() => setIsAddOpen(false)}
            className="absolute inset-0"
          />
          <div className="animate-sheet-up relative w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-slate-800 dark:text-white">
                Yeni görev
              </h2>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                aria-label="Kapat"
                className="grid h-8 w-8 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <TodoForm onAdd={addTodo} onDone={() => setIsAddOpen(false)} autoFocus />
          </div>
        </div>
      )}
    </main>
  )
}
