import { useNavigate } from 'react-router-dom'
import { Dialog } from 'primereact/dialog'
import CreateTask from '../../components/task/Create'

const CreateTaskPage = (): JSX.Element => {
  const navigate = useNavigate()

  const handleModalClosing = (): void => {
    navigate('..')
  }

  return (
    <Dialog
      header={'Add New Task'}
      visible
      onHide={handleModalClosing}
      className='w-96'
      draggable={false}
    >
      <CreateTask />
    </Dialog>
  )
}
export default CreateTaskPage
