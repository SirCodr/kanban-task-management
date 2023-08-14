import Tasks from './views/tasks'
import AppLayout from './layout'
import { Route, Routes } from 'react-router-dom'
import CreateTaskPage from './views/tasks/Create'
import EditTaskPage from './views/tasks/Edit'

function App(): JSX.Element {
  return (
    <AppLayout>
      <Routes>
        <Route path='/' element={<Tasks />} />
        <Route path='create' element={<CreateTaskPage />} />
        <Route path='create' element={<CreateTaskPage />} />
        <Route path='edit/:taskId' element={<EditTaskPage />} />
      </Routes>
    </AppLayout>
  )
}

export default App
