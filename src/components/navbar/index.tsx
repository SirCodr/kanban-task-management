import { Dialog } from 'primereact/dialog'
import { consts } from '../../consts'
import { Button } from 'primereact/button'
import CreateTask from '../task/Create'
import { useState } from 'react'
import { useAppSelector } from '../../hooks/useApp'
import { useDispatch } from 'react-redux'
import { appActions } from '../../store/app/slice'
import EditTask from '../task/Edit'

const Navbar = () => {
  const [createTaskVisible, setCreateTaskVisible] = useState(false)
  const { taskIdSelected } = useAppSelector(state => state.app)
  const dispatch = useDispatch()

  const handleModalClosing = () => {
    if (taskIdSelected) {
      dispatch(appActions.setTaskIdSelected(null))
    } else {
      setCreateTaskVisible(false)
    }
  }

  return (
    <nav className='flex items-center justify-between px-3 bg-white dark:bg-dark-gray'>
      <h3 className='text-black dark:text-white'>{consts.APP_NAME}</h3>
      <Button
        label='Add New Task'
        icon='pi pi-plus'
        size='small'
        className='text-xs h-8'
        onClick={() => setCreateTaskVisible(true)}
      />
      <Dialog
        header={!taskIdSelected && 'Add New Task'}
        visible={createTaskVisible || Boolean(taskIdSelected)}
        onHide={handleModalClosing}
        className='w-96'
        draggable={false}
      >
        {taskIdSelected ? <EditTask id={taskIdSelected} /> : <CreateTask />}
      </Dialog>
    </nav>
  )
}

export default Navbar
