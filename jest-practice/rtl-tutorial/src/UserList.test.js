import {render, screen} from "@testing-library/react"
import UserList from "./UserList"

describe("UserList Test", () => {
    const users = ["Tom", "Jane", "Mike"]

    test("잠시 후 제목이 나타난다", async () => {
        render(<UserList users={users}/>)
        const titleEl = await screen.findByRole("heading", {
            name: "사용자 목록"
        }, {
            timeout: 2000
        })
        expect(titleEl).toBeInTheDocument();
    })


    test("ul이 있다", () => {
        render(<UserList users={users}/>)
        const ulElement = screen.getByRole("list")
        expect(ulElement).toBeInTheDocument();
    })

    test("li는 3개 있다", () => {
        render(<UserList users={users}/>)
        const liElements = screen.getAllByRole("listitem")
        expect(liElements).toHaveLength(users.length); // 개수 체크
        // expect(liElements).not.toBeInTheDocument() // 개수가 0개라면? => 실패
    })

    test("queryByRole 빈 배열을 넘겨준 경우 요소에 없다", () => {
        render(<UserList users={[]}/>)
        const liElements = screen.queryByRole("listitem")
        expect(liElements).not.toBeInTheDocument() // 개수가 0개라면? => 실패
    })

    test("queryAllByRole 빈 배열 넘겨준 경우0개", () => {
        render(<UserList users={[]}/>)
        const liElements = screen.queryAllByRole("listitem")
        expect(liElements).toHaveLength(0); // 개수 체크
    })
})