import Task from '../../components/task'
import { useAppSelector } from '../../hooks/useApp'
import { Task as TaskType } from '../../types/task'

const Tasks = () => {
  const { tasks, taskStates } = useAppSelector((state) => state.app)

  return (
    <div className='flex gap-x-3 w-full'>
      {taskStates.map((taskState) => {
        const tasksFiltered = tasks.filter((task) => task.statusId === taskState.id)

        if (!tasksFiltered || !tasksFiltered.length) return <></>

        return (
          <div key={taskState.id} className='flex flex-col gap-y-2'>
            {taskState.title}
            <ul className='flex flex-col gapy-2'>
              {tasksFiltered.map((task) => (
                <li key={task.id}>
                  <strong>{task.title}</strong>
                  <p>subtasks</p>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default Tasks
