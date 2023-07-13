import {render, screen} from "@testing-library/react"
import MyPage from "./MyPage"

test("제목이 있다", () => {
    render(<MyPage />)
    // getByRole : heading이 여러개면 못가져옴
    // level: heading요소중 첫번째것
    const titleEl = screen.getByRole("heading", {
        level: 1,
    })
    expect(titleEl).toBeInTheDocument()
})

test("input요소가 있다", () => {
    render(<MyPage/>)
    // const inputEl = screen.getByRole("textbox", {
    //     name: "자기소개",
    // })
    const inputEl = screen.getByLabelText("자기소개", {
        selector: "textarea"
    })
    expect(inputEl).toBeInTheDocument();
})

test("getByLabelText로 요소찾기", () => {
    render(<MyPage/>)
    const inputEl = screen.getByLabelText("자기소개", {
        selector: "textarea"
    })
    expect(inputEl).toBeInTheDocument();
})

test("getByDisplayValue로 요소찾기", () => {
    render(<MyPage/>)
    const inputEl = screen.getByDisplayValue("Tom")
    expect(inputEl).toBeInTheDocument();
})

// 최후의 수단
test("my div가 있다", () => {
    render(<MyPage/>)
    const inputEl = screen.getByTestId("my-div")
    expect(inputEl).toBeInTheDocument()
})