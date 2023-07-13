import {render, screen} from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import Profile from "./Profile"

test("유저가 없으면 로그인 문구와 버튼을 보여준다", () => {
    render(<Profile />)
    const txtEl = screen.getByText(/로그인을 해주세요/);
    const btnEl = screen.getByRole("button");
    expect(txtEl).toBeInTheDocument();
    expect(btnEl).toBeInTheDocument();
    // button에 로그인 text를 가지고 있어야함
    expect(btnEl).toHaveTextContent("로그인")
})

test("유저가 있으면 환영문구를 보여준다", () => {
    render(<Profile user={{name: "lee"}}/>)
    const txtEl = screen.getByText(/lee님 환영합니다/);
    expect(txtEl).toBeInTheDocument();
})

test("유저가 name이 없으면 로그인 문구와 버튼을 보여준다", () => {
    render(<Profile user="Park"/>)
    const txtEl = screen.getByText(/로그인을 해주세요/);
    const btnEl = screen.getByRole("button");
    expect(txtEl).toBeInTheDocument();
    expect(btnEl).toBeInTheDocument();
    // button에 로그인 text를 가지고 있어야함
    expect(btnEl).toHaveTextContent("로그인")
})