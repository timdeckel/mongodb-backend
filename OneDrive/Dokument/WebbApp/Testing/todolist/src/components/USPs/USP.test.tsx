import {fireEvent, render, screen} from "@testing-library/react"
import USP from "."

describe("The USP function as indeed", () => {
    test("There are 3 items under USP", () => {
        render(<USP />)

        const uspItems = screen.queryAllByRole("listitem")

        expect(uspItems.length).toEqual(3)

        expect(uspItems[1]).toHaveTextContent("Dont forget things")
    })

    test("the button hides the USP", () => {
        render(<USP />)
        let uspItems = screen.queryAllByRole("listitem")

        expect(uspItems.length).toEqual(3);

        const button = screen.getByRole("button");

        fireEvent.click(button)

        expect(uspItems).not.toBe(3)
    })
})