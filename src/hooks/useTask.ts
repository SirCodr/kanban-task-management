import { FormEvent, useState } from "react"
import { useAppDispatch } from "./useApp"
import { Task } from "../types/task"
import { appActions } from "../store/app/slice"
import { fetchTaskById } from "../services/tasks"
import { getLocalStorageItem, setLocalStorageItem } from "../utils/localStorage"

const useTask = () => {
  const initialSubtaskState = () => ({ id: crypto.randomUUID(), title: '', completed: false })
  const initialTaskState : Task = {
    id: null,
    title: '',
    description: '',
    subtasks: [initialSubtaskState()],
    statusId: null
  }
  const [taskData, setTaskData] = useState(initialTaskState)

  const dispatch = useAppDispatch()

  const addSubtask = () => {
    const taskDraft = {...taskData}
    taskData.subtasks.push(initialSubtaskState())

    setTaskData(taskDraft)
  }

  const removeSubtask = (id: string) => {
    const taskDraft = {...taskData}

    const subtaskIdToRemove = taskDraft.subtasks.findIndex(subtask => subtask.id === id)
    
    if (subtaskIdToRemove != -1) {
      taskDraft.subtasks.splice(subtaskIdToRemove, 1)

      setTaskData(taskDraft)
    }
  }

  const handleStatusChange = (statusId: number) => {
    setTaskData(prevTask => ({...prevTask, statusId}))
  }

  const createTask = (data: any) => {
    const dataDraft = {...data}
    let subtasks = []
    for (const key in dataDraft) {
      const value = dataDraft[key]
      if (key.toString().startsWith('subtask-')) {
        if (value) {
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

    const task = {...dataDraft, id: crypto.randomUUID(), statusId: Number(dataDraft.statusId)}
    
    setTaskData(task)
    dispatch(appActions.addTask(task))

    const tasksFromStorage = getLocalStorageItem("tasks", { isObject: true })
    const tasksParsed = tasksFromStorage ? JSON.parse(tasksFromStorage) : []
    tasksParsed.push(task)
    setLocalStorageItem('tasks', tasksParsed, { isObject: true })
  }

  const getTaskById = async(id: number) => {
    const taskFound = await fetchTaskById(id)

    if (taskFound) setTaskData(taskFound)
  }

  return (
    { taskData,addSubtask, removeSubtask, handleStatusChange, createTask, getTaskById }
  )
}

export default useTask