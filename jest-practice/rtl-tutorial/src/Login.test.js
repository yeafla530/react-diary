import {render, screen, act} from "@testing-library/react"
import Login from "./Login"
import userEvent from '@testing-library/user-event'


describe("Login test", () => {
    test("처음에는 Login버튼이 있다", () => {
        render(<Login/>)

        const btnEl = screen.getByRole("button")
        expect(btnEl).toHaveTextContent("Login")
    })

    const user = userEvent.setup()
    test("click button", async () => {
        render(<Login/>)
        const btnElement = screen.getByRole("button")
        await user.click(btnElement)
        expect(btnElement).toHaveTextContent("Logout")
    
    })

    test("tab, space, enter 동작", async () => {
        render(<Login />)
        const btnEl = screen.getByRole("button")
        expect(btnEl).toBeInTheDocument()
        await user.tab()
        await user.keyboard(" ")
        await user.keyboard(" ")
        await user.keyboard("{Enter}")
        expect(btnEl).toHaveTextContent("Logout")
    
    
    })
    
})





