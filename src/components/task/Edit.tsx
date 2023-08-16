import { Checkbox } from 'primereact/checkbox'
import { Dropdown } from 'primereact/dropdown'
import useTask from '../../hooks/useTask'
import { type Task } from '../../types/task'
import { type TaskStatus } from '../../types/task/status'
import InputVGroup from '../InputVGroup'

interface Props {
  task: Task | null
  taskStates: TaskStatus[]
}

const EditTask = ({ task, taskStates }: Props) => {
  const { handleStatusChange, createTask } = useTask()

  return (
    <form className='flex flex-col gap-y-4' onSubmit={createTask}>
      <h4>{task.title}</h4>
      <small>{task.description}</small>
      <InputVGroup title='Subtasks'>
        {task.subtasks.map((subtask, index) => (
          <div key={subtask?.id || index} className='flex gap-x-2'>
            <Checkbox checked />
            <label>{subtask.title}</label>
          </div>
        ))}
      </InputVGroup>
      <InputVGroup title='Status'>
        <Dropdown
          options={taskStates}
          value={task.statusId}
          optionLabel='title'
          optionValue='id'
          placeholder='Select One'
          name='statusId'
          onChange={(e) => { handleStatusChange(e.value) }}
        />
      </InputVGroup>
    </form>
  )
}

export default EditTask
