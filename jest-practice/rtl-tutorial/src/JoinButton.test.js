import {render, screen} from "@testing-library/react"
import JoinButton from "./JoinButton"

test("19세 이하면 버튼을 클릭할 수 없다. 안내문구는 빨간색이다", () => {
    render(<JoinButton age={10}/>)

    const btnEl = screen.getByRole("button")
    const txtEl = screen.getByRole("heading")

    expect(btnEl).toBeInTheDocument();
    expect(txtEl).toBeInTheDocument();
    expect(btnEl).toBeDisabled();
    expect(txtEl).toHaveStyle({
        color: "red"
    });
})


test("19세 이상이면 버튼을 클릭할 수 없다. 안내문구는 회색이다", () => {
    render(<JoinButton age={23}/>)

    const btnEl = screen.getByRole("button")
    const txtEl = screen.getByRole("heading")
    expect(btnEl).toBeInTheDocument();
    expect(txtEl).toBeInTheDocument();
    expect(btnEl).toBeEnabled();
    expect(txtEl).toHaveStyle({
        color: "gray"
    })
})