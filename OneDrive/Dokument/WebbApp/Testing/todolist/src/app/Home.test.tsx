import {fireEvent, render, screen} from '@testing-library/react'
import Home from './page'

describe("test all functionality work", () => {
    test("Add new Tasks works correctly", () => {
        render(<Home />)

        const mockTask = "Study Typescript"
        let userInput = screen.getByLabelText("Enter a new task below")
        const addTaskButton = screen.getByTestId("add-button")
        let taskItems = screen.queryAllByTestId("task-item")

        expect(taskItems.length).toBe(3)

        fireEvent.change(userInput, {target: {value: mockTask}})

        fireEvent.click(addTaskButton);         

        taskItems = screen.queryAllByTestId("task-item")
        expect(taskItems.length).toBe(4)

       
        expect(taskItems[3]).toHaveTextContent("Study Typescript")
    })
    test("Task Items are removed", () => {
        render(<Home />)
        let taskItems = screen.queryAllByTestId("task-item")
        let gymTask = screen.findByText(/go to the gym/i)
        expect(taskItems.length).toBe(3)

        let deleteButtons = screen.queryAllByTestId("delete-task")

        
    })
})