
import { Checkbox } from 'primereact/checkbox';
import InputVGroup from '../InputVGroup'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { useAppSelector } from '../../hooks/useApp'
import useTask from '../../hooks/useTask'
import { useEffect } from 'react'

type Props = {
  id: number | null
}

const EditTask =  ({ id }: Props) => {  
  const { taskStates } = useAppSelector((state) => state.app)
  const { taskData, addSubtask, removeSubtask, handleStatusChange, createTask, getTaskById } = useTask()

  useEffect(() => {
    if (id) getTaskById(id)
  }, [])

  return (
    <form className='flex flex-col gap-y-4' onSubmit={createTask} >
      <h4>{taskData.title}</h4>
      <small>{taskData.description}</small>
      <InputVGroup title='Subtasks'>
        {taskData.subtasks.map((subtask, index) => (
          <div key={subtask?.id || index} className='flex gap-x-2'>
            <Checkbox checked/>
            <label>{taskData.subtasks[index].title
            }</label>
          </div>
        ))}
      </InputVGroup>
      <InputVGroup title='Status'>
        <Dropdown
          options={taskStates}
          value={taskData.statusId}
          optionLabel='title'
          optionValue='id'
          placeholder='Select One'
          name='statusId'
          onChange={(e) => handleStatusChange(e.value)}
        />
      </InputVGroup>
    </form>
  )
}

export default EditTask
