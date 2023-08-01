import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import InputVGroup from '../InputVGroup'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { useAppSelector } from '../../hooks/useApp'
import useTask from '../../hooks/useTask'

const CreateTask = () => {
  const { taskStates } = useAppSelector((state) => state.app)
  const { taskData, addSubtask, removeSubtask, handleStatusChange, createTask } = useTask()

  return (
    <form className='flex flex-col gap-y-4' onSubmit={createTask} >
      <InputVGroup title='Title'>
        <InputText placeholder='e.g Take Coffe break' name='title' />
      </InputVGroup>
      <InputVGroup title='Description'>
        <InputTextarea placeholder="It's always good to take break." name='description' />
      </InputVGroup>
      <InputVGroup title='Subtasks'>
        {taskData.subtasks.map((subtask, index) => (
          <div key={subtask?.id || index} className='flex gap-x-2'>
            <InputText className='flex-1' name={`subtask-${index + 1}`} />
            <Button
              icon='pi pi-times'
              text
              aria-label='cancel'
              size='small'
              onClick={() => removeSubtask(subtask.id)}
            />
          </div>
        ))}
        <Button
          label='Add New Subtask'
          severity='secondary'
          icon='pi pi-plus'
          size='small'
          type='button'
          onClick={addSubtask}
        />
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
      <Button label='Create Task' type='submit' />
    </form>
  )
}

export default CreateTask
