import { useNavigate } from 'react-router-dom'
import { type Task as TaskType } from '../../types/task'
import { APP_ROUTES } from '../../consts/routes'

interface Props {
  task: TaskType
}

const Task = ({ task }: Props): JSX.Element => {
  const completedSubtasks = task.subtasks.filter(subtask => subtask.completed)
  const navigate = useNavigate()

  const handleModalOpening = (): void => {
    navigate(`${APP_ROUTES.EDIT_TASK}/${task.id ?? ''}`)
  }

  return (
    <li className='px-2 py-3 rounded-sm cursor-pointer bg-white dark:bg-dark-gray' onClick={handleModalOpening}>
      <strong className='text-black dark:text-white'>{task.title}</strong>
      <p className='text-strong-gray'>
        {completedSubtasks.length} of {task.subtasks.length} subtasks
      </p>
    </li>
  )
}

export default Task
