import { Task as TaskType } from '../../types/task'

type Props = {
  task: TaskType
}

const Task = ({ task }: Props) => {
  const completedSubtasks = task.subtasks.filter(subtask => subtask.completed)
  return (
    <li className='px-2 py-3 rounded-sm bg-white dark:bg-dark-gray'>
      <strong className='text-black dark:text-white'>{task.title}</strong>
      <p className='text-strong-gray'>
        {completedSubtasks.length} of {task.subtasks.length} subtasks
      </p>
    </li>
  )
}

export default Task
