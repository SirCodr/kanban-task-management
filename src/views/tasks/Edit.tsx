import { Dialog } from 'primereact/dialog'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EditTask from '../../components/task/Edit'
import { useAppSelector } from '../../hooks/useApp'
import useTask from '../../hooks/useTask'

const EditTaskPage = (): JSX.Element => {
  const [isLoading, setLoading] = useState(true)
  const { taskStates } = useAppSelector((state) => state.app)
  const { taskData, getTaskById } = useTask()
  const { taskId } = useParams()
  const navigate = useNavigate()

  const handleModalClosing = (): void => {
    navigate('..')
  }

  useEffect(() => {
    ;(async () => {
      try {
        if (taskId) {
          await getTaskById(taskId)
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (taskId === '') {
    return <h1>No task Id</h1>
  }

  if (isLoading) return <span>Loading</span>

  return (
    <Dialog
      header={'Edit Task'}
      visible
      onHide={handleModalClosing}
      className='w-96'
      draggable={false}
    >
      <EditTask task={taskData} taskStates={taskStates} />
    </Dialog>
  )
}
export default EditTaskPage
