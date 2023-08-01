import { Task as TaskType } from "../../types/task"

type Props = {
  task: TaskType
}

const Task = ({ task }: Props) => {
  return (
    <div>
      {task.title}
    </div>
  )
}

export default Task