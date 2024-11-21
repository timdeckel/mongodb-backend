import { TaskType } from "../Utils/types"



const Task = ({id, description, removeItem}: TaskType) => {

    const handleRemove = () => {
        if (removeItem) {
            removeItem(id); // Only call removeItem if it is defined
        } else {
            console.warn("removeItem is undefined");
        }
    };
    
    return(
        <div className="flex gap-4 my-2" key={id} data-testid="task-item">
            <div className="basis-4/5 p-4 bg-white">{description}</div>
            <button onClick={handleRemove} className="basis-1/5 p-4 bg-white text-red-800 font-2xl font-bold" data-testid="delete-task">X</button>
        </div>
    )
}

export default Task