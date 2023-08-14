import { useAppDispatch } from '../../hooks/useApp'
import { appActions } from '../../store/app/slice'
import { Task as TaskType } from '../../types/task'

type Props = {
  task: TaskType
}

const Task = ({ task }: Props) => {
  const completedSubtasks = task.subtasks.filter(subtask => subtask.completed)
  const dispatch = useAppDispatch()

  const handleModalOpening = () => {
    dispatch(appActions.setTaskIdSelected(task.id))
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
