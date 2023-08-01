import { Dialog } from 'primereact/dialog'
import { consts } from '../../consts'
import { Button } from 'primereact/button'
import CreateTask from '../task/Create'
import { useState } from 'react'

const Navbar = () => {
  const [createTaskVisible, setCreateTaskVisible] = useState(false)

  return (
    <nav className='flex justify-around'>
      <span>{consts.APP_NAME}</span>
      <Button
        label='Add New Task'
        icon='pi pi-plus'
        size='small'
        className='text-xs'
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
