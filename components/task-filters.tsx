'use client'

import { Button } from '@/components/ui/button'
import { ListTodo, CheckCircle2, Circle } from 'lucide-react'

export type FilterType = 'all' | 'active' | 'completed'

interface TaskFiltersProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

export default function TaskFilters({ currentFilter, onFilterChange }: TaskFiltersProps) {
  const filters: { type: FilterType; label: string; icon: React.ReactNode }[] = [
    { type: 'all', label: 'Todas', icon: <ListTodo className="h-4 w-4" /> },
    { type: 'active', label: 'Pendientes', icon: <Circle className="h-4 w-4" /> },
    { type: 'completed', label: 'Completadas', icon: <CheckCircle2 className="h-4 w-4" /> },
  ]

  return (
    <div className="flex gap-2 mb-4">
      {filters.map((filter) => (
        <Button
          key={filter.type}
          variant={currentFilter === filter.type ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange(filter.type)}
          className="flex items-center gap-2"
        >
          {filter.icon}
          {filter.label}
        </Button>
      ))}
    </div>
  )
}

