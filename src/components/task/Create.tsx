import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import InputVGroup from '../InputVGroup'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { useAppSelector } from '../../hooks/useApp'
import useTask from '../../hooks/useTask'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Task } from '../../types/task'

interface FormInputs extends Task {
  'subtask-1': string
}

const CreateTask =  () => {  
  const { taskStates } = useAppSelector((state) => state.app)
  const { control, register, handleSubmit, formState: { errors,  } } = useForm<FormInputs>()
  const { taskData, addSubtask, removeSubtask, createTask } = useTask()

  const onSubmit: SubmitHandler<FormInputs> = data => createTask(data)

  return (
    <form className='flex flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>
      <InputVGroup title='Title'>
        <InputText
          placeholder='e.g Take Coffe break'
          {...register('title', { required: true })}
        />
        {errors.title && <span>This field is required</span>}
      </InputVGroup>
      <InputVGroup title='Description'>
        <InputTextarea
          placeholder="It's always good to take break."
          {...register('description')}
        />
      </InputVGroup>
      <InputVGroup title='Subtasks'>
        {taskData.subtasks.map((subtask, index) => (
          <Controller
            name={`subtask-${index + 1}`}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <section
                className='flex flex-col gap-y-2'
                key={subtask.id}
              >
                <div className='flex gap-x-2'>
                  <InputText className='flex-1' />
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
                {errors[`subtask-${index + 1}`] && (
                  <span>This field is required</span>
                )}
              </section>
            )}
          />
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
        <Controller
          name='statusId'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Dropdown
              id={field.name}
              options={taskStates}
              value={field.value}
              optionLabel='title'
              optionValue='id'
              placeholder='Select One'
              onChange={(e) => field.onChange(e.value)}
            />
          )}
        />
        {errors['statusId'] && <span>This field is required</span>}
      </InputVGroup>
      <Button label='Create Task' type='submit' />
    </form>
  )
}

export default CreateTask
