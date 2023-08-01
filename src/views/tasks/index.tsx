import Task from '../../components/task'
import { useAppSelector } from '../../hooks/useApp'

const Tasks = () => {
  const { tasks, taskStates } = useAppSelector((state) => state.app)

  return (
    <div className='flex gap-x-3 w-full'>
      {taskStates.map((taskState) => {
        const tasksFiltered = tasks.filter((task) => task.statusId === taskState.id)

        return (
          <div key={taskState.id} className='flex flex-col gap-y-2 flex-1'>
            <div className='flex items-center gap-x-2 text-strong-gray'>
              <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: taskState.hexColor}} ></div>
              <span>{taskState.title}</span>
              <span>({tasksFiltered.length})</span>
            </div>
            <ul className='flex flex-col gap-y-2 text-left'>
              {tasksFiltered.map((task) => <Task key={task.id} task={task} />)}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default Tasks
