import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import InputVGroup from '../InputVGroup'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { useAppSelector } from '../../hooks/useApp'
import useTask from '../../hooks/useTask'
import { useRef, useState } from 'react'

const CreateTask = (): JSX.Element => {
  const [statusSelected, selectStatus] = useState(null)
  const formRef = useRef()
  const { taskStates } = useAppSelector((state) => state.app)
  const { taskData, addSubtask, removeSubtask, handleTaskCreation } = useTask({
    formElement: formRef.current
  })

  return (
    <form className='flex flex-col gap-y-4' ref={formRef} onSubmit={handleTaskCreation}>
      <InputVGroup title='Title'>
        <InputText name='title' placeholder='e.g Take Coffe break' />
      </InputVGroup>
      <InputVGroup title='Description'>
        <InputTextarea name='description' placeholder="It's always good to take break." />
      </InputVGroup>
      <InputVGroup title='Subtasks'>
        {taskData.subtasks.map((subtask, index) => (
          <section className='flex flex-col gap-y-2' key={index}>
            <div className='flex gap-x-2'>
              <InputText name={`subtask-${index + 1}`} className='flex-1' />
              <Button
                icon='pi pi-times'
                text
                aria-label='cancel'
                size='small'
                onClick={(e) => {
                  e.preventDefault()
                  removeSubtask(subtask.id)
                }}
              />
            </div>
          </section>
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
          value={statusSelected}
          options={taskStates}
          optionLabel='title'
          optionValue='id'
          name='statusId'
          placeholder='Select One'
          onChange={(e) => selectStatus(e.value)}
        />
      </InputVGroup>
      <Button label='Create Task' type='submit' />
    </form>
  )
}

export default CreateTask
