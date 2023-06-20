import { useParams } from "react-router-dom"

const Diary = () => {
    // 상세페이지 :id값 전달됨
    const {id} = useParams() // path variable
    console.log(id)

    return (
        <div>
            <h1>Diary</h1>
            <p>이곳은 일기 상세 페이지입니다</p>
        </div>
    )
}

export default Diary