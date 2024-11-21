import {fireEvent, render, screen, within} from '@testing-library/react'
import TaskList from '.';
import userEvent from '@testing-library/user-event';
import { startTasks } from '../Utils/defaultTasks'
import { TaskType } from '../Utils/types';

describe("TaskList Component", () => {
    const handleClick = jest.fn();
    const mockTasks: TaskType[] = [
        {
            id: "1",
            description: '1'
        },
        {
            id: "2",
            description: '2'
        },
      ];
    it("renders tasks when taskItems is provided", () => {
        const singleMockTask: TaskType[] = [
            {
                id: "1",
                description: 'test'
            }
          ];  
        render(<TaskList taskItems={singleMockTask} updateFunction={() => {}} />);
        const taskList = (screen.queryByTestId("task-item"))
        expect(taskList).toHaveTextContent('test');
    });
  
    it("renders nothing if taskItems is null", () => {
      render(<TaskList taskItems={null} updateFunction={() => {}} />);
      const taskList = (screen.queryByTestId("task-list"))
      expect(taskList?.innerHTML).toBe('')
    });
  
    it("calls updateFunction when the remove button is clicked", async () => {
      const singleMockTask: TaskType[] = [
        {
            id: "1",
            description: 'test'
        }
      ];   
      render(<TaskList taskItems={singleMockTask} updateFunction={handleClick} />);
      const taskList = (screen.queryByTestId("task-item"))
      expect(taskList).toBeInTheDocument();
      
      if(taskList){
        const deleteButton = within(taskList).getByTestId("delete-task")
        console.log(deleteButton)
        fireEvent.click(deleteButton);
        expect(handleClick).toHaveBeenCalledWith("1");
      }     
    });
  });
