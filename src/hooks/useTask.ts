import { FormEvent, useState } from "react"
import { useAppDispatch } from "./useApp"
import { Task } from "../types/task"
import { appActions } from "../store/app/slice"

const useTask = () => {
  const initialTaskState : Task = {
    id: null,
    title: '',
    description: '',
    subtasks: [{ id: '', title: ''}],
    statusId: null
  }
  const [taskData, setTaskData] = useState(initialTaskState)

  const dispatch = useAppDispatch()

  const addSubtask = () => {
    const taskDraft = {...taskData}
    taskData.subtasks.push({
      id: crypto.randomUUID(),
      title: ''
    })

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

  const createTask = (e: FormEvent) => {
    e.preventDefault()
    const dataForm = Object.fromEntries(new FormData(e.target))
    let subtasks = []
    for (const [key, value] of Object.entries(dataForm)) {
      if (key.toString().startsWith('subtask-')) {
        if (value) {
          subtasks.push({
          id: crypto.randomUUID(),
          title: value,
          completed: false
        })
        }
        delete dataForm[key]
      }
    }
    dataForm.subtasks = subtasks

    const task = {...dataForm, id: crypto.randomUUID(), statusId: Number(dataForm.statusId)}
    
    setTaskData(task)
    dispatch(appActions.addTask(task))
  }

  return (
    { taskData,addSubtask, removeSubtask, handleStatusChange, createTask }
  )
}

export default useTask