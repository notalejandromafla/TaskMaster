'use client'

import TaskItem from './task-item'

interface Task {
  id: string
  title: string
  completed: boolean
}

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, newTitle: string) => void
}

export default function TaskList({ tasks, onToggle, onDelete, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="mt-12 text-center">
        <p className="text-muted-foreground">No se encontraron tareas</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}
