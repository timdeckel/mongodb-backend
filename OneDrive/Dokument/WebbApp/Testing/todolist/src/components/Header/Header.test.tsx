import {render, screen} from '@testing-library/react'
import Header from '.'

describe("That the header is rendered correctly", () => {
test("Renders the Page title", () => {
    render(<Header />)
    const headerText = screen.getByText("To Do List")
    expect(headerText).toBeInTheDocument()
})

test("Renders the subtitle component", () => {
    render(<Header />)
    const subTitleText = screen.getByRole("heading", {level: 3 })
    expect (subTitleText).toHaveTextContent("Simplify Your Life");
})

})