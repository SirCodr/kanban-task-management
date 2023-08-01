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
      subtasks: [],
      statusId: 1
    }
  ],
  taskStates: [
    {
      id: 1,
      title: 'Todo'
    },
    {
      id: 2,
      title: 'Doing'
    },
    {
      id: 3,
      title: 'Done'
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
