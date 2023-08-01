import { Subtask } from "./subtask";

export type Task = {
  id: number | null,
  title: string,
  description: string,
  subtasks: Subtask[],
  statusId: number | null
}