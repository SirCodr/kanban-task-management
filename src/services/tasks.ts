import { Task } from "../types/task";
import { getLocalStorageItem } from "../utils/localStorage";

export const fetchAllTasks = async(): Promise<Task[]> => {
  return new Promise((resolve) => {  
    resolve(getLocalStorageItem('tasks', { isObject: true }) || [])
  })
}

export const fetchTaskById = async(taskId: number): Promise<Task | undefined> => {
  return new Promise((resolve) => {
    const tasks: Task[] = getLocalStorageItem('tasks', { isObject: true }) || []

    const taskFound: Task | undefined = tasks.find(task => task.id === taskId)
    
    resolve(taskFound)
  })
}