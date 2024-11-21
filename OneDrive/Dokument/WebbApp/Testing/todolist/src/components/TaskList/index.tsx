'use client'
import { TaskType } from "../Utils/types"
import Task from "../Task";


type TaskListsProps = {
    taskItems: TaskType[] | null
    updateFunction: (id: string) => void
}


const TaskList = ({taskItems, updateFunction}:TaskListsProps) => {
   
 

    return(
        <div className="bg-green-700 p.6" data-testid="task-list">
            {taskItems && taskItems.map(item => <Task key={item.id} {...item} removeItem={updateFunction}/> )}
        </div>
    )
}

export default TaskList