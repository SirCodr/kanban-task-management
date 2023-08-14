import { consts } from '../../consts'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '../../consts/routes'

const Navbar = (): JSX.Element => {
  const navigate = useNavigate()

  return (
    <nav className='flex items-center justify-between px-3 bg-white dark:bg-dark-gray'>
      <h3 className='text-black dark:text-white'>{consts.APP_NAME}</h3>
      <Button
        label='Add New Task'
        icon='pi pi-plus'
        size='small'
        className='text-xs h-8'
        onClick={() => {
          navigate(APP_ROUTES.CREATE_TASK)
        }}
      />
    </nav>
  )
}

export default Navbar
