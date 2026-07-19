export interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: number
}

export type TodoFormValues = Pick<Todo, 'title'>
