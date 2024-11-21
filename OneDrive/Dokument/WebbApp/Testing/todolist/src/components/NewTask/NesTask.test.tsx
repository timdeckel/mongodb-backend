import {fireEvent, render, screen} from '@testing-library/react'
import NewTask from '.'
import { TaskType } from '../Utils/types'

describe("New Task functionality works as expected", () => {
    test("Checks the input field and button are rendered", () => {
        render(<NewTask updateFunction={function (newTask: TaskType): void {
            throw new Error('Function not implemented.')
        } } />)

        const userInput = screen.getByLabelText("Enter a new task below")

        const button = screen.getByRole('button');

        expect(userInput).toBeInTheDocument()
        expect(button).toBeInTheDocument()
    })

    test("user input is saved in state", () => {
        render(<NewTask updateFunction={function (newTask: TaskType): void {
            throw new Error('Function not implemented.')
        } } />)
        const mockTask = "Feed the fish"

        let userInput = screen.getByLabelText("Enter a new task below")
        expect((userInput as HTMLInputElement).value).toBe('')

        fireEvent.change(userInput, {target: {value: mockTask}})

        userInput = screen.getByLabelText("Enter a new task below")
        expect((userInput as HTMLInputElement).value).toBe(mockTask)
    })
})