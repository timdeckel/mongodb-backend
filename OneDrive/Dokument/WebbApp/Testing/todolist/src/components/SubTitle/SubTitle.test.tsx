import {render, screen} from "@testing-library/react"
import Subtitle from "."

test("The Subtitle is rendered correctly", () => {
    const mockData:string = "Mock Subtitle Value"
    render(<Subtitle text="Mock Subtitle Value" />)

    const subtitleText = screen.getByRole("heading", {level: 3, name:"Mock Subtitle Value"})

    expect(subtitleText).toBeInTheDocument();
})