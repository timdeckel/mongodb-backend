import { TaskType } from "./types"
import {v4 as uuid} from 'uuid';


export const startTasks:TaskType[] = [
    {
        id: uuid(),
        description: "Go to gym"
    },
    {
        id: uuid(),
        description: "Hand in assignments"
    },
    {
        id: uuid(),
        description: "Water the plants"
    }
]