import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../../types/task'
import { TaskStatus } from '../../types/task/status'

export interface AppState {
  tasks: Task[]
  taskStates: TaskStatus[]
}

const initialState: AppState = {
  tasks: [
    {
      id: 1,
      title: 'Build UI',
      description: 'New UI building',
      subtasks: [{
        id: crypto.randomUUID(),
        title: 'First task',
        completed: false
      }],
      statusId: 1
    }
  ],
  taskStates: [
    {
      id: 1,
      title: 'Todo',
      hexColor: '#3498DB'
    },
    {
      id: 2,
      title: 'Doing',
      hexColor: '#A569BD'
    },
    {
      id: 3,
      title: 'Done',
      hexColor: '#82E0AA'
    }
  ]
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload)
    }
  }
})

export const appActions = appSlice.actions

export default appSlice.reducer
