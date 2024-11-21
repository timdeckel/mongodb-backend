import { render, screen} from '@testing-library/react'
import Task from '.'
import { fireEvent } from "@testing-library/react";


describe("Task component", () => {
    const taskProps = {
        id: "1",
        description: "Test Task",
        removeItem: jest.fn(), 
    };    

    test("renders the task with the correct description", () => {
        render(<Task {...taskProps} />);
        expect(screen.getByText("Test Task")).toBeInTheDocument();
    });

    test("calls removeItem when the delete button is clicked", () => {
        render(<Task {...taskProps} />);
        const deleteButton = screen.getByTestId("delete-task");
        fireEvent.click(deleteButton);
        expect(taskProps.removeItem).toHaveBeenCalledTimes(1);
        expect(taskProps.removeItem).toHaveBeenCalledWith("1");
    });

    test("does not call removeItem when there is no removeItem function", () => {
        const noRemoveItemProps = { ...taskProps, removeItem: undefined };
        render(<Task {...noRemoveItemProps} />);
        const deleteButton = screen.getByTestId("delete-task");
        const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
        fireEvent.click(deleteButton);
        expect(consoleSpy).not.toHaveBeenCalled();      
    });
});
