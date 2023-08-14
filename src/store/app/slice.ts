import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type Task } from '../../types/task'
import { type TaskStatus } from '../../types/task/status'
import { getLocalStorageItem } from '../../utils/localStorage'

type TaskSelected = number | null
export interface AppState {
  tasks: Task[]
  taskStates: TaskStatus[]
  taskIdSelected: TaskSelected
}

const initialState: AppState = {
  tasks: getLocalStorageItem('tasks', { isObject: true }) || [],
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
  ],
  taskIdSelected: null
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload)
    },
    setTaskIdSelected: (state, action: PayloadAction<TaskSelected>) => {
      state.taskIdSelected = action.payload
    }
  }
})

export const appActions = appSlice.actions

export default appSlice.reducer
