import { FormEvent, useState } from 'react'
import { useAppDispatch } from './useApp'
import { type Task } from '../types/task'
import { appActions } from '../store/app/slice'
import { fetchTaskById } from '../services/tasks'
import { getLocalStorageItem, setLocalStorageItem } from '../utils/localStorage'
import { type Subtask } from '../types/task/subtask'

type Props = {
  formElement?: HTMLFormElement | null
}

const useTask = (props: Props) => {
  const { formElement } = props ?? {}

  const initialSubtaskState = (): Subtask => ({
    id: crypto.randomUUID(),
    title: '',
    completed: false
  })
  const initialTaskState: Task = {
    id: null,
    title: '',
    description: '',
    subtasks: [initialSubtaskState()],
    statusId: null
  }
  const [taskData, setTaskData] = useState(initialTaskState)

  const dispatch = useAppDispatch()

  const addSubtask = (): void => {
    const taskDraft = { ...taskData }
    taskData.subtasks.push(initialSubtaskState())

    setTaskData(taskDraft)
  }

  const removeSubtask = (id: string): void => {
    const taskDraft = { ...taskData }

    const subtaskIdToRemove = taskDraft.subtasks.findIndex(
      (subtask) => subtask.id === id
    )

    if (subtaskIdToRemove !== -1) {
      taskDraft.subtasks.splice(subtaskIdToRemove, 1)

      setTaskData(taskDraft)
    }
  }

  const handleStatusChange = (statusId: number): void => {
    setTaskData((prevTask) => ({ ...prevTask, statusId }))
  }

  const createTask = (task: Task): void => {
    setTaskData(task)
    dispatch(appActions.addTask(task))

    const tasksFromStorage = getLocalStorageItem('tasks', { isObject: true })
    const tasksParsed = tasksFromStorage ?? []
    tasksParsed.push(task)
    setLocalStorageItem('tasks', tasksParsed, { isObject: true })

    if (formElement) formElement.reset()
  }

  const handleTaskCreation = (e: FormEvent) => {
    e.preventDefault()

    if (formElement) {
      const entriesFromForm = Object.fromEntries(new FormData(formElement))
      const dataDraft = { ...entriesFromForm }
      const subtasks = []
      for (const key in dataDraft) {
        const value: string = dataDraft[key]
        if (key.toString().startsWith('subtask-')) {
          if (value !== '') {
            subtasks.push({
              id: crypto.randomUUID(),
              title: value,
              completed: false
            })
          }
          delete dataDraft[key]
        }
      }
      dataDraft.subtasks = subtasks

      const task = {
        ...dataDraft,
        id: crypto.randomUUID(),
        statusId: Number(dataDraft.statusId)
      }
      createTask(task)
    }
  }

  const getTaskById = async (id: number): Promise<void> => {
    const taskFound = await fetchTaskById(id)

    if (taskFound != null) setTaskData(taskFound)
  }

  return {
    taskData,
    addSubtask,
    removeSubtask,
    handleStatusChange,
    createTask,
    handleTaskCreation,
    getTaskById
  }
}

export default useTask
