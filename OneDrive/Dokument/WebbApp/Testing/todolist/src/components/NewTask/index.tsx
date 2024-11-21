'use client'
import { HTMLInputTypeAttribute, SetStateAction, useState } from "react"
import { TaskType } from "../Utils/types"
import { v4 as uuid } from 'uuid';

type NewTaskProps= {
    updateFunction: (newTask: TaskType) => void
}

const NewTask = ({updateFunction}:NewTaskProps) => {
    const[inputValue, setInputValue]=useState<HTMLInputTypeAttribute>('')

    const handleChange = (e: { target: { value: SetStateAction<HTMLInputTypeAttribute> } }) => {
        setInputValue(e.target.value)
    }

    const handleClick = () => {
        if (inputValue !== '') {
            const userTask = {id: uuid(), description: inputValue}
        updateFunction(userTask);
        }        
    }

    return(
        <div className="flex flex-col gap-4 bg-green-200 my-4 p-4">
            <h4 className="text-2xl text-center">Create a new task</h4>
            <label htmlFor="user-input">Enter a new task below</label>
            <input onChange={handleChange} id="user-input" className="p-4" placeholder="create a task ..." value={inputValue}/>
            {inputValue && <p>{inputValue}</p>}
            <button data-testid="add-button" onClick={handleClick} className="w-50 bg-white text-green-700 p-4">Add Task</button>
        </div>
    )
}

export default NewTask