import { Dialog } from 'primereact/dialog'
import { consts } from '../../consts'
import { Button } from 'primereact/button'
import CreateTask from '../task/Create'
import { useState } from 'react'

const Navbar = () => {
  const [createTaskVisible, setCreateTaskVisible] = useState(false)

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
        header='Add New Task'
        visible={createTaskVisible}
        onHide={() => setCreateTaskVisible(false)}
        className='w-96'
        draggable={false}
      >
        <CreateTask />
      </Dialog>
    </nav>
  )
}

export default Navbar
